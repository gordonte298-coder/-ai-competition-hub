import fs from "node:fs/promises";

const WEVITY_BASE = "https://www.wevity.com/";
const OUTPUT_JSON = "data/contests.json";
const ROOT_JSON = "contests.json";
const OUTPUT_CSV = "data/notion-import.csv";

const WEVITY_LIST_URLS = [
  "https://www.wevity.com/?c=find&s=1&gub=1&cidx=10",
  "https://www.wevity.com/?c=find&s=1&gub=1&cidx=11",
  "https://www.wevity.com/?c=find&s=1&gub=1&cidx=15",
  "https://www.wevity.com/?c=find&s=1&gub=1&cidx=8",
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

const MANUAL_CONTESTS = [
  {
    name: "2026년 대한민국 AI 콘텐츠 어워즈",
    host: "경기도 / 경기콘텐츠진흥원",
    type: "영상/숏폼",
    category: "생성형 AI 영상·콘텐츠",
    status: "모집중",
    startDate: "2026-06-02",
    deadline: "2026-07-12",
    region: "국내",
    language: "한국어",
    reward: "1등 800만원 / 2등 300만원 등",
    format: "AI 기술을 활용한 영상 작품",
    target: "AI 콘텐츠 크리에이터",
    tags: ["#생성형AI", "#AI영상", "#콘텐츠어워즈"],
    note: "경기콘텐츠진흥원 공고와 FilmFreeway 접수 페이지를 함께 확인하세요. FilmFreeway: https://filmfreeway.com/KAICA",
    link: "https://www.gcon.or.kr/gcon/business/gconNotice/view.do?pbancSrnm=11173&menuNo=200061",
    source: "수동보강",
    sourceUrl: "https://filmfreeway.com/KAICA",
  },
  {
    name: "2026 동화나라 창작동화 공모전",
    host: "동화나라",
    type: "스토리/동화",
    category: "생성형 AI 창작동화",
    status: "모집중",
    startDate: "2026-05-25",
    deadline: "2026-06-08",
    region: "국내",
    language: "한국어",
    reward: "대상 15만원 및 수상작 앱 내 정식 오디오북/콘텐츠 발행",
    format: "AI 활용 단편 창작동화 2,000자 내외 및 기획 의도",
    target: "AI와 콘텐츠 기획에 관심 있는 대학생/직장인 창작자",
    tags: ["#생성형AI", "#창작동화", "#스토리"],
    note: "공모 주제는 '모양이 달라도 우리는 가족이야'. 다양한 가족의 형태를 다룬 따뜻한 창작 동화 기획 공모전입니다.",
    link: "https://www.allforyoung.com/posts/82469",
    source: "수동보강",
  },
  {
    name: "사조 AI 숏폼 공모전",
    host: "사조그룹",
    type: "영상/숏폼",
    category: "AI 숏폼 영상",
    status: "모집중",
    startDate: "2026-05-04",
    deadline: "2026-06-14",
    region: "국내",
    language: "한국어",
    reward: "총 상금 1,000만원 / 대상 300만원",
    format: "30초~1분 이내 세로형 영상",
    target: "제한없음",
    tags: ["#AI영상", "#숏폼", "#사조"],
    note: "위비티 기준 수동 보강 항목입니다. 반드시 주최사 공고와 제출 링크를 함께 확인하세요.",
    link: "https://www.wevity.com/index.php?c=find&s=_university&gbn=viewok&gp=1&ix=107046",
    source: "수동보강",
  },
  {
    name: "대한의사협회 제43차 종합학술대회 생성형 AI 영상 공모전",
    host: "대한의사협회",
    type: "영상/숏폼",
    category: "생성형 AI 영상",
    status: "모집중",
    startDate: "2026-05-11",
    deadline: "2026-06-19",
    region: "국내",
    language: "한국어",
    reward: "대상 300만원 / 최우수상 각 200만원 / 우수상 각 100만원",
    format: "30~45초 세로형 AI 영상, MP4",
    target: "의료진, 의대생 및 일반인 누구나",
    tags: ["#생성형AI", "#AI영상", "#의료"],
    note: "주제는 'AI, 의사의 진심을 그리다'. 인상 깊었던 의사와의 진료 경험 등을 AI 영상으로 구현하는 공모전입니다.",
    link: "https://www.wevity.com/index_university.php?c=find&s=_university&gbn=view&gp=4&ix=107252",
    source: "수동보강",
    sourceUrl: "https://www.kmacongress2026.org/html/?pmode=video",
  },
  {
    name: "2026년 서울 사랑의열매 AI 영상 공모전",
    host: "서울사회복지공동모금회",
    type: "영상/숏폼",
    category: "AI 나눔 메시지 영상",
    status: "모집중",
    startDate: "2026-06-01",
    deadline: "2026-07-31",
    region: "국내",
    language: "한국어",
    reward: "열매대상 100만원 등",
    format: "3분 영상 또는 30~60초 쇼츠 영상",
    target: "전 국민, 개인 또는 3인 이하 단체",
    tags: ["#AI영상", "#숏폼", "#나눔"],
    note: "AI 나눔 메시지 영상 제작 공모전 'CHEST x AI'. 생성형 AI 기반 제작 문구 삽입이 필요합니다.",
    link: "https://www.wevity.com/index_university.php?c=find&s=_university&mode=future&gbn=viewok&gp=1&ix=107375",
    source: "수동보강",
    sourceUrl: "https://seoul.chest.or.kr/lnk.do?u=851c7ab4",
  },
  {
    name: "빠나나AI x 무통베개 AI 광고 챌린지",
    host: "빠나나AI",
    type: "영상/숏폼",
    category: "AI 광고 영상",
    status: "모집중",
    startDate: "2026-06-17",
    deadline: "2026-07-08",
    region: "국내",
    language: "한국어",
    reward: "대상 500만원 / 금상 200만원 / 은상 100만원 / 인기상 1500크레딧",
    format: "10~30초 분량 9:16 또는 3:4 비율 쇼츠",
    target: "누구나, 1인 2개 이상 중복 지원 가능",
    tags: ["#AI광고", "#AI영상", "#숏폼"],
    note: "무통베개 제품을 활용해 재미있고 참신한 AI 영상 콘텐츠를 만드는 광고 챌린지입니다.",
    link: "https://www.allforyoung.com/posts/83237",
    source: "수동보강",
  },
  {
    name: "2026 성평등 영상 콘텐츠 공모전",
    host: "제주특별자치도",
    type: "영상/숏폼",
    category: "영상/UCC/사진",
    status: "모집중",
    startDate: "2026-07-21",
    deadline: "2026-07-30",
    region: "국내",
    language: "한국어",
    reward: "1천만원 이하 / 1등 300만원",
    format: "영상 콘텐츠",
    target: "제한없음",
    tags: ["#영상", "#콘텐츠", "#성평등"],
    note: "위비티에서 확인한 제주특별자치도 주최 성평등 영상 콘텐츠 공모전입니다.",
    link: "https://www.wevity.com/?c=find&s=1&sp=contents&sw=AI&gbn=viewok&gp=1&ix=108289",
    source: "수동보강",
    sourceUrl: "https://www.jeju.go.kr/news/news/law/jeju2.htm#A_66686",
  },
  {
    name: "2026 대한민국 미래 철도 AI 영상 공모전",
    host: "국가철도공단",
    type: "영상/숏폼",
    category: "AI 영상",
    status: "모집중",
    startDate: "2026-06-15",
    deadline: "2026-07-10",
    region: "국내",
    language: "한국어",
    reward: "1천만원 이하 / 1등 300만원",
    format: "AI 영상 콘텐츠",
    target: "제한없음",
    tags: ["#AI영상", "#철도", "#콘텐츠"],
    note: "국가철도공단의 미래 철도 주제 AI 영상 공모전입니다.",
    link: "https://www.wevity.com/?c=find&s=1&gub=1&cidx=10&gbn=viewok&gp=2&ix=108158",
    source: "수동보강",
    sourceUrl: "https://sotong.go.kr/front/epilogue/epilogueNewViewPage.do?bbs_id=59c1e7091d4b4cc7b50aecfb7fdac73e",
  },
  {
    name: "2026 유쓰 AI 쇼츠 페스티벌",
    host: "LG유플러스",
    type: "영상/숏폼",
    category: "AI 쇼츠",
    status: "모집중",
    startDate: "2026-06-08",
    deadline: "2026-07-31",
    region: "국내",
    language: "한국어",
    reward: "다양한 혜택, 공식 페이지 확인",
    format: "AI 쇼츠 영상",
    target: "제한없음",
    tags: ["#AI영상", "#쇼츠", "#LG유플러스"],
    note: "LG유플러스가 주최하는 유쓰 AI 쇼츠 페스티벌입니다. 세부 혜택과 출품 규격은 공식 페이지를 확인하세요.",
    link: "https://www.wevity.com/?c=find&s=1&gub=1&cidx=10&gbn=viewok&gp=2&ix=108501",
    source: "수동보강",
    sourceUrl: "https://www.lguplus.com/uth",
  },
  {
    name: "제2회 CHAI 대학생 AI 광고 공모전 AI to Z CHALLENGE",
    host: "차이커뮤니케이션",
    type: "AI 광고",
    category: "대학생 AI 광고 캠페인",
    status: "모집중",
    startDate: "2026-07-08",
    deadline: "2026-07-30",
    region: "국내",
    language: "한국어",
    reward: "대상 500만원 / 금상 각 300만원 / 은상 각 200만원 / 동상 각 100만원 등",
    format: "AI 활용 광고 캠페인 제안서와 크리에이티브 제작물",
    target: "국내외 대학·대학원 재학생 및 휴학생, 개인 또는 최대 3인 팀",
    tags: ["#AI광고", "#대학생", "#차이커뮤니케이션"],
    note: "실제 클라이언트 브랜드 과제를 AI로 해결하는 실전형 대학생 광고 공모전입니다. 수상자는 채용 지원 시 우대 및 실무 프로젝트 연계 기회를 받을 수 있습니다.",
    link: "https://aichallenge.artistchai.co.kr/",
    source: "수동보강",
  },
  {
    name: "핵융합에너지 X-이벤트 AI 영상 공모전",
    host: "한국핵융합에너지연구원",
    type: "영상/숏폼",
    category: "생성형 AI 과학 영상",
    status: "모집중",
    startDate: "2026-06-16",
    deadline: "2026-07-15",
    region: "국내",
    language: "한국어",
    reward: "총 시상금 700만원 / 대상 300만원",
    format: "생성형 AI를 활용한 100초 이내 영상 콘텐츠",
    target: "대한민국 국민 누구나, 개인 또는 최대 3인 팀",
    tags: ["#생성형AI", "#AI영상", "#핵융합에너지"],
    note: "핵융합에너지를 둘러싼 X-이벤트와 연쇄적인 미래 상황을 생성형 AI 영상으로 표현하는 공모전입니다.",
    link: "https://www.allforyoung.com/posts/83274",
    source: "수동보강",
    sourceUrl: "https://kfe2026ai.my.canva.site/",
  },
  {
    name: "코웨이 비렉스 AI 영상 광고 · 숏폼 공모전",
    host: "코웨이 / (주)스튜디오프리윌루전, AI-Kive",
    type: "AI 광고",
    category: "AI 영상 광고·숏폼",
    status: "모집중",
    startDate: "2026-07-01",
    deadline: "2026-07-30",
    region: "국내",
    language: "한국어",
    reward: "3천만원~1천만원",
    format: "AI 기반 영상 광고 또는 숏폼",
    target: "공식 페이지 확인",
    tags: ["#AI광고", "#AI영상", "#숏폼"],
    note: "코웨이 비렉스 브랜드 주제 AI 영상 광고·숏폼 공모전입니다. 세부 제출 규격과 참가 자격은 AI-Kive 공식 페이지에서 확인하세요.",
    link: "https://aikive.com/event/083997de1ae04659ade4e709b8802735",
    source: "수동보강",
    sourceUrl: "https://www.wevity.com/?c=find&s=1&gub=1&cidx=10&gbn=view&gp=1&ix=108662",
  },
  {
    name: "제2회 매일유업 대학생 AI 영상 공모전",
    host: "매일유업",
    type: "영상/숏폼",
    category: "대학생 AI 영상",
    status: "모집중",
    startDate: "2026-07-13",
    deadline: "2026-08-17",
    region: "국내",
    language: "한국어",
    reward: "3천만원~1천만원 / 특별상 300만원",
    format: "AI 활용 영상 작품",
    target: "대학생, 공식 페이지 확인",
    tags: ["#AI영상", "#대학생", "#매일유업"],
    note: "매일유업이 주최하는 대학생 대상 AI 영상 공모전입니다. 접수 방식과 작품 규격은 공식 페이지를 확인하세요.",
    link: "https://ai-challenge-maeil.com",
    source: "수동보강",
    sourceUrl: "https://www.wevity.com/?c=find&s=1&gub=1&cidx=10&gbn=view&gp=1&ix=109144",
  },
  {
    name: "2026 대전 AI 영상 공모전",
    host: "대전광역시 / (주)스튜디오프리윌루전, AI-Kive",
    type: "영상/숏폼",
    category: "AI 영상",
    status: "모집중",
    startDate: "2026-07-20",
    deadline: "2026-08-18",
    region: "국내",
    language: "한국어",
    reward: "5천만원~3천만원 / 대상 1,000만원",
    format: "AI 활용 영상 작품",
    target: "공식 페이지 확인",
    tags: ["#AI영상", "#대전", "#AIKive"],
    note: "대전광역시 주최 AI 영상 공모전입니다. 제출 규격과 참가 자격은 AI-Kive 공식 페이지에서 확인하세요.",
    link: "https://aikive.com/event/5105995dd52643bf9dd53285a2f8137d?tab=DETAILS",
    source: "수동보강",
    sourceUrl: "https://www.wevity.com/?c=find&s=1&gub=1&cidx=10&gbn=view&gp=1&ix=109142",
  },
  {
    name: "타임라이더 1주년 기념 경주월드 AI 숏폼 공모전",
    host: "경주월드",
    type: "영상/숏폼",
    category: "생성형 AI 숏폼",
    status: "모집중",
    startDate: "2026-06-15",
    deadline: "2026-07-10",
    region: "국내",
    language: "한국어",
    reward: "대상 200만원 / 부문별 최우수상 각 100만원 / 우수상 각 50만원 등",
    format: "30초~1분 30초, 9:16 세로형 FHD 영상",
    target: "만 13세 이상 대한민국 국민, 개인 또는 최대 4인 팀",
    tags: ["#생성형AI", "#숏폼", "#경주월드"],
    note: "타임라이더 또는 경주월드를 주제로 생성형 AI를 활용해 제작하는 세로형 숏폼 공모전입니다.",
    link: "https://www.allforyoung.com/posts/83320",
    source: "수동보강",
  },
  {
    name: "관세청 AI 관세행정 캐릭터 공모전",
    host: "관세청",
    type: "AI 이미지",
    category: "AI 캐릭터 디자인",
    status: "모집중",
    startDate: "2026-06-08",
    deadline: "2026-07-06",
    region: "국내",
    language: "한국어",
    reward: "총 800만원 / 최우수상 200만원 및 관세청장상",
    format: "AI 기술과 관세행정의 이미지를 담은 캐릭터 디자인",
    target: "대한민국 국민 누구나, 개인 또는 3인 이내 팀",
    tags: ["#AI이미지", "#캐릭터", "#관세청"],
    note: "AI 기술과 관세행정의 혁신적인 만남을 미래지향적이고 스마트한 캐릭터로 표현하는 공모전입니다.",
    link: "https://www.allforyoung.com/posts/83458",
    source: "수동보강",
  },
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
  return [...map.values()].slice(0, 160);
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
const contests = mergeContests(existing, MANUAL_CONTESTS, discovered);

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
