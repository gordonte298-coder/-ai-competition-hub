import fs from 'node:fs/promises';
import https from 'node:https';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const CONTEST_QUERIES = [
  'AI 공모전',
  'AI 영상 공모전',
  '생성형 AI 대회',
  'AI 이미지 공모전'
];

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function fetchGoogleNewsContests(query) {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR:ko`;
    const xml = await httpsGet(url);
    const items = xml.match(/<item>(.*?)<\/item>/gs) || [];
    return items.slice(0, 5).map(item => {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || '';
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      
      const deadlineMatch = title.match(/(\d{1,2})월\s*(\d{1,2})일|~\s*(\d{1,2})\/(\d{1,2})/);
      let deadline = '2025-12-31';
      if (deadlineMatch) {
        const month = deadlineMatch[1] || deadlineMatch[3];
        const day = deadlineMatch[2] || deadlineMatch[4];
        deadline = `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      const prizeMatch = title.match(/(\d+(?:,\d+)*)\s*만원|(\d+)\s*억/);
      let prize = '상금 미정';
      if (prizeMatch) {
        prize = prizeMatch[0].includes('억') ? `총 ${prizeMatch[2]}억원` : `총 ${prizeMatch[1]}만원`;
      }

      return {
        title: title.replace(/\s*-\s*.*$/, '').trim(),
        host: '주최기관',
        deadline,
        prize,
        type: inferType(title),
        url: link,
        status: '모집중',
        category: inferCategory(title),
        region: title.includes('해외') || title.includes('글로벌') ? '해외' : '국내'
      };
    });
  } catch (err) {
    console.error('Google News fetch error:', err);
    return [];
  }
}

async function fetchKaggleRss() {
  try {
    const xml = await httpsGet('https://www.kaggle.com/competitions.atom');
    const entries = xml.match(/<entry>(.*?)<\/entry>/gs) || [];
    return entries.slice(0, 3).map(entry => {
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const link = entry.match(/<link href="(.*?)"\/>/)?.[1] || '';
      const updated = entry.match(/<updated>(.*?)<\/updated>/)?.[1] || '';
      
      const deadlineDate = new Date(updated);
      deadlineDate.setMonth(deadlineDate.getMonth() + 2);
      const deadline = deadlineDate.toISOString().split('T')[0];

      return {
        title,
        host: 'Kaggle',
        deadline,
        prize: '상금 정보 확인 필요',
        type: 'AI 모델·데이터',
        url: link,
        status: '모집중',
        category: '데이터분석',
        region: '해외'
      };
    });
  } catch (err) {
    console.error('Kaggle RSS fetch error:', err);
    return [];
  }
}

function inferType(title) {
  if (title.includes('영상') || title.includes('동영상')) return 'AI 영상';
  if (title.includes('이미지') || title.includes('그림')) return 'AI 이미지';
  if (title.includes('음악') || title.includes('오디오')) return 'AI 음악';
  if (title.includes('모델') || title.includes('데이터')) return 'AI 모델·데이터';
  return 'AI 콘텐츠';
}

function inferCategory(title) {
  if (title.includes('예술') || title.includes('미술')) return '예술';
  if (title.includes('음악')) return '음악';
  if (title.includes('영상') || title.includes('콘텐츠')) return '콘텐츠';
  if (title.includes('데이터') || title.includes('분석')) return '데이터분석';
  return '기타';
}

function dedupeContests(contests) {
  const seen = new Set();
  return contests.filter(c => {
    const key = c.title.toLowerCase().replace(/\s+/g, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function syncFromWeb() {
  const sets = await Promise.all([
    ...CONTEST_QUERIES.map(q => fetchGoogleNewsContests(q)),
    fetchKaggleRss()
  ]);
  return dedupeContests(sets.flat());
}

async function syncFromNotion() {
  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    console.log('No Notion credentials, using web scraping only');
    return null;
  }
  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data.results.map(page => ({
      title: page.properties.Name?.title?.[0]?.plain_text || '',
      host: page.properties.Host?.rich_text?.[0]?.plain_text || '',
      deadline: page.properties.Deadline?.date?.start || '',
      prize: page.properties.Prize?.rich_text?.[0]?.plain_text || '',
      type: page.properties.Type?.select?.name || '',
      url: page.properties.URL?.url || '',
      status: page.properties.Status?.select?.name || '모집중',
      category: page.properties.Category?.select?.name || '',
      region: page.properties.Region?.select?.name || '국내'
    }));
  } catch (err) {
    console.error('Notion sync error:', err);
    return null;
  }
}

const SEED_DATA = [
  {
    title: "AI 영상 페스티벌 2025",
    host: "한국콘텐츠진흥원",
    deadline: "2025-03-15",
    prize: "총 5,000만원",
    type: "AI 영상",
    url: "https://example.com",
    status: "모집중",
    category: "콘텐츠",
    region: "국내"
  }
];

(async () => {
  try {
    let contests = await syncFromNotion();
    if (!contests || contests.length === 0) {
      console.log('Falling back to web scraping...');
      contests = await syncFromWeb();
    }
    if (!contests || contests.length === 0) {
      console.log('Using seed data as fallback');
      contests = SEED_DATA;
    }
    await fs.writeFile('./data/contests.json', JSON.stringify(contests, null, 2));
    console.log(`✅ Synced ${contests.length} contests`);
  } catch (err) {
    console.error('Fatal sync error:', err);
    process.exit(1);
  }
})();
