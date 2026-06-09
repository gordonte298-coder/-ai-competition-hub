import fs from "node:fs/promises";

const WEVITY_BASE = "https://www.wevity.com/";
const OUTPUT_JSON = "data/contests.json";
const ROOT_JSON = "contests.json";
const OUTPUT_CSV = "data/notion-import.csv";

const WEVITY_LIST_URLS = [
  "https://www.wevity.com/",
  "https://www.wevity.com/?c=find&s=1&gub=1&cidx=2",
];

const TOPIC_KEYWORDS = [
  "AI",
  "인공지능",
  "생성형",
  "영상",
  "숏폼",
  "이미지",
  "스토리",
  "동화",
  "콘텐츠",
  "시나리오",
  "공공데이터",
  "데이터",
];

const NEGATIVE_KEYWORDS = [
  "서포터즈",
  "기자단",
  "봉사단",
  "체험단",
  "대외활동",
  "강연",
  "교육",
  "아카데미",
  "채용",
  "인턴",
];

function cleanText(value = "") {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(url = "") {
  return new URL(url.replaceAll("&amp;", "&"), WEVITY_BASE).toString();
}

async function readJson(path) {
  try {
    const text = await fs.readFile(path, "utf8");
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.7,en;q=0.6",
        Referer: WEVITY_BASE,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function inputValue(html, name) {
  const pattern = new RegExp(`<input[^>]+name=["']${name}["'][^>]+value=["']([^"']*)["']`, "i");
  return cleanText(pattern.exec(html)?.[1] || "");
}

function inferType(text = "") {
  if (/영상|숏폼|UCC|콘텐츠|필름|영화/i.test(text)) return "영상/숏폼";
  if (/데이터|공공데이터|인공지능/i.test(text)) return "생성형 AI";
  if (/이미지|사진|디자인|아트|미디어 아트|그림/i.test(text)) return "AI 이미지";
  if (/스토리|동화|독후감|시나리오|글쓰기|문학/i.test(text)) return "스토리/동화";
  if (/광고|마케팅|브랜드/i.test(text)) return "AI 광고";
  return "AI 콘텐츠";
}

function inferTags(text = "") {
  const tags = new Set(["#위비티", "#자동수집"]);
  if (/광고|마케팅|브랜드/i.test(text)) tags.add("#AI광고");
  if (/이미지|사진|디자인|아트/i.test(text)) tags.add("#AI이미지");
  if (/영상|숏폼|UCC|필름|영화/i.test(text)) tags.add("#영상");
  if (/스토리|동화|독후감|문학|시나리오/i.test(text)) tags.add("#스토리");
  if (/생성형|인공지능|AI/i.test(text)) tags.add("#생성형AI");
  return [...tags];
}

function isRelevant(title = "", category = "") {
  const text = `${title} ${category}`;
  const hasTopic = TOPIC_KEYWORDS.some((keyword) => text.toLowerCase().includes(keyword.toLowerCase()));
  const hasNegative = NEGATIVE_KEYWORDS.some((keyword) => text.includes(keyword));
  return hasTopic && !hasNegative;
}

function parseDeadline(period = "", fallbackDday = "") {
  const dateMatches = [...period.matchAll(/(20\d{2})[.\-/년\s]+(\d{1,2})[.\-/월\s]+(\d{1,2})/g)];
  if (dateMatches.length) {
    const last = dateMatches.at(-1);
    return `${last[1]}-${last[2].padStart(2, "0")}-${last[3].padStart(2, "0")}`;
  }

  const dday = /D-(\d+)/i.exec(`${period} ${fallbackDday}`)?.[1];
  if (dday) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + Number(dday));
    return date.toISOString().slice(0, 10);
  }

  return "";
}

function statusFromDeadline(deadline = "", rawStatus = "") {
  if (rawStatus === "상시") return rawStatus;
  if (!deadline) return rawStatus || "확인 필요";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${deadline}T00:00:00`);
  const diff = Math.ceil((date - today) / 86400000);

  if (diff < 0) return "마감";
  if (diff <= 7) return "마감 임박";
  return "모집중";
}

function parseListCards(html) {
  const cards = [];
  const pattern =
    /<li>\s*<a href="(?<href>[^"]+)"><img[^>]+alt="(?<alt>[^"]*)"[^>]*><\/a>\s*<div class="hide-info">(?<body>[\s\S]*?)<\/div>\s*<\/li>/g;

  for (const match of html.matchAll(pattern)) {
    const body = match.groups.body;
    const titleHref = /<div class="hide-tit">\s*<a href="([^"]+)">([\s\S]*?)<\/a>/i.exec(body);
    const category = /<div class="hide-cat">\s*([\s\S]*?)<\/div>/i.exec(body)?.[1] || "";
    const dday = /<div class="hide-dday">\s*([^<]+)<\/div>/i.exec(body)?.[1] || "";
    const title = cleanText(titleHref?.[2] || match.groups.alt);
    const url = normalizeUrl(titleHref?.[1] || match.groups.href);

    if (title && isRelevant(title, cleanText(category))) {
      cards.push({
        title,
        url,
        category: cleanText(category),
        dday: cleanText(dday),
      });
    }
  }

  return cards;
}

async function enrichFromDetail(item) {
  try {
    const html = await fetchText(item.url);
    const name = inputValue(html, "name") || item.title;
    const category = inputValue(html, "category") || item.category;
    const host = inputValue(html, "agent") || "위비티 확인 필요";
    const period = inputValue(html, "during");
    const prizeRange = inputValue(html, "money1");
    const firstPrize = inputValue(html, "money2");
    const homepage = inputValue(html, "homepage");
    const deadline = parseDeadline(period, item.dday);
    const text = `${name} ${category}`;

    return {
      name,
      host,
      type: inferType(text),
      category,
      status: statusFromDeadline(deadline, "모집중"),
      startDate: period.split("~")[0]?.trim() || "",
      deadline,
      region: "국내",
      language: "한국어",
      reward: [prizeRange, firstPrize].filter(Boolean).join(" / ") || "공식 페이지 확인",
      format: "공식 요강 확인",
      target: "공식 요강 확인",
      tags: inferTags(text),
      note: "위비티에서 자동 수집한 공모전입니다. 접수기간, 제출 형식, 참가 조건은 공식 페이지에서 다시 확인하세요.",
      link: homepage || item.url,
      source: "위비티",
      sourceUrl: item.url,
      archived: statusFromDeadline(deadline) === "마감",
    };
  } catch (error) {
    console.warn(`skip detail: ${item.title} (${error.message})`);
    return null;
  }
}

function normalizeItem(item) {
  const name = item.name || item.title || item.contestTitle || "";
  const host = item.host || item.organizer || item.organization || "";
  const reward = item.reward || item.prize || item.benefit || "";
  const link = item.link || item.url || "";
  const status = statusFromDeadline(item.deadline, item.status || item.recruitStatus || "");

  return {
    ...item,
    name,
    host,
    type: item.type || inferType(`${name} ${item.category || ""}`),
    category: item.category || "기타",
    status,
    deadline: item.deadline || "",
    reward,
    link,
    tags: Array.isArray(item.tags) ? item.tags : Array.isArray(item.keywords) ? item.keywords : [],
    archived: status === "마감",
  };
}

function itemKey(item) {
  const link = String(item.link || item.url || item.sourceUrl || "").trim().toLowerCase();
  if (link) return `link:${link}`;
  return `name:${String(item.name || item.title || "").replace(/\s+/g, "").toLowerCase()}`;
}

function mergeContests(...groups) {
  const map = new Map();
  for (const group of groups) {
    for (const raw of group) {
      const item = normalizeItem(raw);
      const key = itemKey(item);
      if (!item.name || map.has(key)) continue;
      map.set(key, { ...map.get(key), ...item });
    }
  }

  return [...map.values()].sort((a, b) => {
    const activeA = a.status === "마감" ? 1 : 0;
    const activeB = b.status === "마감" ? 1 : 0;
    return activeA - activeB || (a.deadline || "9999-12-31").localeCompare(b.deadline || "9999-12-31") || a.name.localeCompare(b.name, "ko");
  });
}

function dedupeCandidates(items) {
  const map = new Map();
  for (const item of items) {
    const key = `${item.title}`.replace(/\s+/g, "").toLowerCase();
    if (!key || map.has(key)) continue;
    map.set(key, item);
  }
  return [...map.values()].slice(0, 18);
}

function toCsvValue(value) {
  const raw = Array.isArray(value) ? value.join(", ") : String(value ?? "");
  return `"${raw.replaceAll('"', '""')}"`;
}

function buildNotionCsv(items) {
  const headers = ["이름", "주최", "분야", "카테고리", "모집 상태", "접수 시작일", "마감일", "상금/혜택", "링크", "출처", "태그", "비고"];
  const rows = items.map((item) => [
    item.name,
    item.host,
    item.type,
    item.category,
    item.status,
    item.startDate,
    item.deadline,
    item.reward,
    item.link,
    item.source || "",
    item.tags,
    item.note,
  ]);

  return [headers, ...rows].map((row) => row.map(toCsvValue).join(",")).join("\n") + "\n";
}

async function collectWevity() {
  const candidates = [];

  for (const url of WEVITY_LIST_URLS) {
    try {
      const html = await fetchText(url);
      candidates.push(...parseListCards(html));
    } catch (error) {
      console.warn(`skip list: ${url} (${error.message})`);
    }
  }

  const enriched = [];
  for (const candidate of dedupeCandidates(candidates)) {
    console.log(`detail: ${candidate.title}`);
    const item = await enrichFromDetail(candidate);
    if (item && isRelevant(item.name, item.category)) {
      enriched.push(item);
    }
  }

  return enriched;
}

const existing = mergeContests(await readJson(ROOT_JSON), await readJson(OUTPUT_JSON));
const discovered = await collectWevity();
const contests = mergeContests(existing, discovered);

if (!contests.length) {
  throw new Error("No contests found. Refusing to overwrite the archive with an empty file.");
}

await fs.mkdir("data", { recursive: true });
const json = JSON.stringify(contests, null, 2) + "\n";
await fs.writeFile(OUTPUT_JSON, json, "utf8");
await fs.writeFile(ROOT_JSON, json, "utf8");
await fs.writeFile(OUTPUT_CSV, buildNotionCsv(contests), "utf8");

console.log(`Kept ${existing.length} archived/current contests`);
console.log(`Discovered ${discovered.length} Wevity contests`);
console.log(`Wrote ${contests.length} total contests`);
