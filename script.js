let contests = [];

const fallbackContests = [
  {
    "name": "메디힐 AI 영상 광고·숏폼 공모전 2026",
    "host": "메디힐, 스튜디오프리윌루전",
    "type": "영상",
    "category": "AI 영상·광고",
    "status": "모집중",
    "startDate": "2026-01-30",
    "deadline": "2026-02-26",
    "region": "한국",
    "language": "한국어",
    "reward": "총 상금 2,500만원 (대상 700만원)",
    "format": "AI 광고 영상 (16:9, 30초) 또는 숏폼 (9:16, 10초~1분)",
    "target": "만 14세 이상",
    "tags": [
      "#생성형AI",
      "#메디힐",
      "#광고"
    ],
    "note": "메디힐 '더마 패드 2.0' 제품을 AI 영상 언어로 재해석. 우수 수상자에게 인턴십 및 채용 기회 제공.",
    "link": "https://aikive.com/event/ongoing"
  },
  {
    "name": "2026 대한민국 AI 콘텐츠 페스티벌 (KAiCF)",
    "host": "초록뱀미디어",
    "type": "영상",
    "category": "드라마·광고·뮤직비디오",
    "status": "모집중",
    "startDate": "2026-02-12",
    "deadline": "2026-05-31",
    "region": "한국",
    "language": "한국어",
    "reward": "총 상금 1억 6천만원",
    "format": "드라마 숏폼/미드폼, 뮤직비디오, 광고",
    "target": "전문가 및 일반인",
    "tags": [
      "#생성형AI",
      "#KAiCF",
      "#영상"
    ],
    "note": "AI 기술을 활용한 영상 콘텐츠 공모. 부문별 마감일 상이 (광고: 3/29, MV·숏폼: 4/12, 미드폼: 5/31)",
    "link": "https://www.greensnaketv.com"
  },
  {
    "name": "2026 EBS 생성형 AI 애니메이션 시리즈 공동제작",
    "host": "EBS (한국교육방송공사)",
    "type": "영상",
    "category": "애니메이션·교육",
    "status": "모집중",
    "startDate": "2026-02-11",
    "deadline": "2026-03-31",
    "region": "한국",
    "language": "한국어",
    "reward": "프로젝트당 8천만원 (최대 5개 선정)",
    "format": "애니메이션 시리즈 기획안",
    "target": "제작사 및 크리에이터",
    "tags": [
      "#생성형AI",
      "#애니메이션",
      "#EBS"
    ],
    "note": "유아·어린이·가족 대상 TV 애니메이션. 선정작은 2026년 12월 EBS 방영 예정.",
    "link": "https://www.ebs.co.kr"
  },
  {
    "name": "2026 청강국제AI장르영상제 (CKAIFF)",
    "host": "청강문화산업대학교",
    "type": "영상",
    "category": "장르영화",
    "status": "마감",
    "startDate": "2026-02-01",
    "deadline": "2026-02-28",
    "region": "한국",
    "language": "한국어",
    "reward": "공식 요강 참고",
    "format": "장르 영화 (SF, 호러, 스릴러 등)",
    "target": "일반인",
    "tags": [
      "#AI영화",
      "#장르영화",
      "#CKAIFF"
    ],
    "note": "2025.3~2026.2 제작된 AI 활용 장르 영화 대상. 개인/팀 참여 가능.",
    "link": "https://www.ck.ac.kr"
  },
  {
    "name": "Korea Global K Contents AI Cinema Festival",
    "host": "Korea Global",
    "type": "영상",
    "category": "K-콘텐츠·영화",
    "status": "모집중",
    "startDate": "2026-02-10",
    "deadline": "2026-04-20",
    "region": "글로벌",
    "language": "한국어/영어",
    "reward": "공식 요강 참고",
    "format": "단편 영화",
    "target": "전 세계",
    "tags": [
      "#AI영화",
      "#K-콘텐츠",
      "#글로벌"
    ],
    "note": "인간-AI 협업을 통한 K-푸드 및 K-콘텐츠 영화제. 생성형 AI 창의적 활용 필수.",
    "link": "https://filmfreeway.com"
  },
  {
    "name": "AI Art Championship 2026",
    "host": "AI Art Championship",
    "type": "이미지",
    "category": "AI 아트·이미지",
    "status": "모집중",
    "startDate": "2026-01-01",
    "deadline": "2026-06-30",
    "region": "글로벌",
    "language": "영어",
    "reward": "Prize Pool",
    "format": "AI 생성 이미지",
    "target": "전 세계 아티스트 및 크리에이터",
    "tags": [
      "#AI아트",
      "#이미지생성",
      "#글로벌"
    ],
    "note": "'Visions in Motion' 주제의 국제 AI 아트 공모전. 움직임, 변형, 상상력 탐구.",
    "link": "https://www.aiartchampionship.com"
  },
  {
    "name": "2026년 청년 AI 솔루션 챌린지",
    "host": "청년재단·한국바른채용인증원",
    "type": "해외",
    "category": "AI 솔루션·문제해결",
    "status": "모집중",
    "startDate": "2026-02-05",
    "deadline": "2026-04-30",
    "region": "한국",
    "language": "한국어",
    "reward": "공식 요강 참고",
    "format": "아이디어 제안서",
    "target": "만 19~34세 청년 (3인 1팀)",
    "tags": [
      "#AI솔루션",
      "#청년",
      "#사회문제"
    ],
    "note": "AI와 데이터를 활용한 일상 속 사각지대 발견 및 환경 개선 아이디어 제안.",
    "link": "https://www.allforyoung.com"
  },
  {
    "name": "Stanford RNA 3D Folding Part 2",
    "host": "Kaggle / Stanford",
    "type": "해외",
    "category": "AI 생물정보학",
    "status": "모집중",
    "startDate": "2026-01-07",
    "deadline": "2026-03-25",
    "region": "글로벌",
    "language": "영어",
    "reward": "Kaggle Prizes",
    "format": "ML 모델 (RNA 3D 구조 예측)",
    "target": "데이터 과학자",
    "tags": [
      "#Kaggle",
      "#생물정보학",
      "#RNA"
    ],
    "note": "RNA 분자 서열로 3D 구조 예측하는 머신러닝 모델 개발.",
    "link": "https://www.kaggle.com/competitions"
  },
  {
    "name": "Beyond Visible Spectrum: AI for Agriculture 2026",
    "host": "Kaggle",
    "type": "해외",
    "category": "AI 농업·컴퓨터비전",
    "status": "모집중",
    "startDate": "2025-12-15",
    "deadline": "2026-03-01",
    "region": "글로벌",
    "language": "영어",
    "reward": "Kaggle Prizes",
    "format": "딥러닝 알고리즘 (작물 질병 모니터링)",
    "target": "데이터 과학자",
    "tags": [
      "#Kaggle",
      "#농업",
      "#컴퓨터비전"
    ],
    "note": "다중/초분광 및 위성 원격 감지 데이터셋을 활용한 농업 질병 모니터링.",
    "link": "https://www.kaggle.com/competitions"
  },
  {
    "name": "AI Cup 2026 | Performance Track",
    "host": "Kaggle",
    "type": "해외",
    "category": "AI 분류·레이더",
    "status": "모집중",
    "startDate": "2026-02-13",
    "deadline": "2026-03-19",
    "region": "글로벌",
    "language": "영어",
    "reward": "Kaggle Prizes",
    "format": "조류 종 분류 AI 모델",
    "target": "데이터 과학자",
    "tags": [
      "#Kaggle",
      "#분류",
      "#레이더데이터"
    ],
    "note": "레이더 트랙 데이터 기반 조류 종 분류 AI 모델 성능 평가.",
    "link": "https://www.kaggle.com/competitions"
  },
  {
    "name": "Predicting Heart Disease (Kaggle Playground 2026)",
    "host": "Kaggle",
    "type": "해외",
    "category": "AI 의료·예측",
    "status": "마감",
    "startDate": "2026-02-01",
    "deadline": "2026-02-28",
    "region": "글로벌",
    "language": "영어",
    "reward": "Kaggle Playground",
    "format": "심장 질환 예측 모델",
    "target": "데이터 과학자",
    "tags": [
      "#Kaggle",
      "#의료",
      "#예측"
    ],
    "note": "2026 Kaggle Playground 시리즈. 심장 질환 가능성 예측.",
    "link": "https://www.kaggle.com/competitions"
  },
  {
    "name": "AI Mathematical Olympiad - Progress Prize 3",
    "host": "Kaggle",
    "type": "해외",
    "category": "AI 수학",
    "status": "모집중",
    "startDate": "2025-11-01",
    "deadline": "2026-04-15",
    "region": "글로벌",
    "language": "영어",
    "reward": "Progress Prize",
    "format": "수학 문제 해결 AI 모델",
    "target": "AI 연구자",
    "tags": [
      "#Kaggle",
      "#수학",
      "#올림피아드"
    ],
    "note": "AI 모델로 국제 수준의 수학 문제 해결.",
    "link": "https://www.kaggle.com/competitions"
  },
  {
    "name": "NFL Big Data Bowl 2026 - Analytics",
    "host": "Kaggle / NFL",
    "type": "해외",
    "category": "AI 스포츠 분석",
    "status": "모집중",
    "startDate": "2025-10-01",
    "deadline": "2026-05-01",
    "region": "글로벌",
    "language": "영어",
    "reward": "$50,000",
    "format": "NFL 데이터 분석",
    "target": "데이터 과학자",
    "tags": [
      "#Kaggle",
      "#NFL",
      "#스포츠분석"
    ],
    "note": "NFL 빅데이터 분석 대회. 총 상금 $50,000. 278팀 참여 중.",
    "link": "https://www.kaggle.com/competitions"
  },
  {
    "name": "AI EXPO KOREA 2026 - NEXT 해커톤",
    "host": "AI EXPO KOREA",
    "type": "해외",
    "category": "AI 해커톤",
    "status": "모집중",
    "startDate": "2026-04-01",
    "deadline": "2026-06-10",
    "region": "한국",
    "language": "한국어/영어",
    "reward": "$50,000",
    "format": "해커톤",
    "target": "개발자",
    "tags": [
      "#해커톤",
      "#AI엑스포",
      "#코엑스"
    ],
    "note": "2026.6.10-12 서울 코엑스. 인공지능 & 빅데이터쇼 NEXT 해커톤.",
    "link": "https://www.smarttechkorea.com"
  },
  {
    "name": "2026년 인공지능 기술사업화 지원사업",
    "host": "서울특별시, 서울경제진흥원",
    "type": "해외",
    "category": "AI 기술사업화",
    "status": "모집중",
    "startDate": "2026-02-12",
    "deadline": "2026-03-10",
    "region": "한국",
    "language": "한국어",
    "reward": "과제당 최대 2억원",
    "format": "사업 계획서",
    "target": "서울 소재 중소기업",
    "tags": [
      "#사업화",
      "#중소기업",
      "#서울"
    ],
    "note": "AI 기술사업화 지원. 피지컬 AI는 최대 5억원. 서울 소재 중소기업 대상.",
    "link": "https://www.koraia.org"
  },
  {
    "name": "Suno AI 음악 공모전 (Community)",
    "host": "Suno AI Community",
    "type": "음악",
    "category": "AI 음악 생성",
    "status": "상시",
    "startDate": "2026-01-01",
    "deadline": "2026-12-31",
    "region": "글로벌",
    "language": "영어",
    "reward": "Community Prizes",
    "format": "AI 생성 음악",
    "target": "음악 제작자",
    "tags": [
      "#Suno",
      "#AI음악",
      "#커뮤니티"
    ],
    "note": "Suno AI를 활용한 음악 제작 커뮤니티 공모전. 매월 우수작 선정.",
    "link": "https://suno.com"
  },
  {
    "name": "Udio AI Music Challenge 2026",
    "host": "Udio",
    "type": "음악",
    "category": "AI 음악 생성",
    "status": "모집중",
    "startDate": "2026-02-01",
    "deadline": "2026-04-30",
    "region": "글로벌",
    "language": "영어",
    "reward": "공식 요강 참고",
    "format": "AI 생성 음악",
    "target": "음악 제작자",
    "tags": [
      "#Udio",
      "#AI음악",
      "#음악생성"
    ],
    "note": "Udio AI를 활용한 음악 생성 공모전. 다양한 장르 환영.",
    "link": "https://udio.com"
  },
  {
    "name": "Midjourney Community Contest",
    "host": "Midjourney",
    "type": "이미지",
    "category": "AI 이미지 생성",
    "status": "상시",
    "startDate": "2026-01-01",
    "deadline": "2026-12-31",
    "region": "글로벌",
    "language": "영어",
    "reward": "커뮤니티 상금",
    "format": "AI 생성 이미지",
    "target": "아티스트",
    "tags": [
      "#Midjourney",
      "#AI이미지",
      "#커뮤니티"
    ],
    "note": "Midjourney 커뮤니티 공모전. 매주 테마별 챌린지 진행.",
    "link": "https://www.midjourney.com"
  },
  {
    "name": "Runway Gen-3 Film Contest",
    "host": "Runway",
    "type": "영상",
    "category": "AI 영상 생성",
    "status": "모집중",
    "startDate": "2026-02-01",
    "deadline": "2026-05-15",
    "region": "글로벌",
    "language": "영어",
    "reward": "$25,000",
    "format": "AI 생성 단편 영화",
    "target": "영상 제작자",
    "tags": [
      "#Runway",
      "#AI영상",
      "#Gen-3"
    ],
    "note": "Runway Gen-3를 활용한 단편 영화 공모전. 창의적 스토리텔링 중심.",
    "link": "https://runwayml.com"
  },
  {
    "name": "Pika AI Video Challenge 2026",
    "host": "Pika",
    "type": "영상",
    "category": "AI 영상 생성",
    "status": "모집중",
    "startDate": "2026-01-15",
    "deadline": "2026-04-30",
    "region": "글로벌",
    "language": "영어",
    "reward": "$10,000",
    "format": "AI 생성 비디오",
    "target": "영상 제작자",
    "tags": [
      "#Pika",
      "#AI영상",
      "#비디오생성"
    ],
    "note": "Pika AI를 활용한 창의적 비디오 제작 공모전.",
    "link": "https://pika.art"
  },
  {
    "name": "후라이드참잘하는집 AI 광고영상 공모전",
    "host": "후라이드참잘하는집, 초록뱀미디어",
    "type": "영상",
    "category": "AI 광고·브랜디드",
    "status": "모집중",
    "startDate": "2026-02-15",
    "deadline": "2026-03-31",
    "region": "한국",
    "language": "한국어",
    "reward": "총 상금 4,000만원",
    "format": "AI 광고 영상",
    "target": "일반인·크리에이터",
    "tags": [
      "#후참잘",
      "#AI광고",
      "#브랜디드"
    ],
    "note": "후참잘 브랜드 주제 AI 광고 공모전. KAiCF 광고 부문. 수상자에게 AI 콘텐츠 협업·채용 기회 제공.",
    "link": "https://www.greensnaketv.com"
  },
  {
    "name": "News to Action AI Hackathon 2026",
    "host": "매경미디어",
    "type": "해외",
    "category": "AI 해커톤·서비스",
    "status": "모집중",
    "startDate": "2026-02-01",
    "deadline": "2026-03-20",
    "region": "한국",
    "language": "한국어",
    "reward": "대상 200만원, 최우수상 150만원, 우수상 100만원 + Claude 크레딧",
    "format": "AI 서비스 프로토타입",
    "target": "개발자·기획자",
    "tags": [
      "#해커톤",
      "#매경미디어",
      "#뉴스AI"
    ],
    "note": "뉴스 데이터를 활용한 AI 서비스 개발 해커톤. 2026.3.20 본 행사 개최.",
    "link": "https://www.mk.co.kr"
  },
  {
    "name": "2026 AI INNOVATION CHALLENGE",
    "host": "아모레퍼시픽",
    "type": "영상",
    "category": "AI 에이전트·광고",
    "status": "마감",
    "startDate": "2025-11-28",
    "deadline": "2026-01-04",
    "region": "한국",
    "language": "한국어",
    "reward": "총 상금 3,000만원 (대상 1,000만원)",
    "format": "AI 에이전트 / 브랜디드 영상",
    "target": "개발자·크리에이터",
    "tags": [
      "#아모레퍼시픽",
      "#AI에이전트",
      "#브랜디드"
    ],
    "note": "AGENT TRACK: AI 에이전트 개발, CREATIVE TRACK: 브랜디드 AI 영상 콘텐츠 제작.",
    "link": "https://www.blaybus.com"
  },
  {
    "name": "OpenData X AI 챌린지 2026",
    "host": "중소벤처기업부",
    "type": "해외",
    "category": "AI 스타트업·공공데이터",
    "status": "마감",
    "startDate": "2025-11-01",
    "deadline": "2026-02-12",
    "region": "한국",
    "language": "한국어",
    "reward": "창업 사업화·R&D·전문인력·정책자금 지원",
    "format": "AI 솔루션 제안",
    "target": "AI 스타트업",
    "tags": [
      "#공공데이터",
      "#중소기업부",
      "#AI스타트업"
    ],
    "note": "공공데이터+AI 기술로 중소기업·소상공인 문제 해결. 124개 기업 참여, 최종 6개 선정.",
    "link": "https://www.etnews.com"
  },
  {
    "name": "1B AI Film Award (Google Gemini)",
    "host": "1 Billion Followers Summit, Google",
    "type": "영상",
    "category": "AI 영화·글로벌",
    "status": "마감",
    "startDate": "2025-09-01",
    "deadline": "2025-11-20",
    "region": "글로벌",
    "language": "영어",
    "reward": "$1,000,000 (약 13억원)",
    "format": "AI 생성 영화 (7~10분, Google AI 도구 70% 활용)",
    "target": "전 세계 영상 크리에이터",
    "tags": [
      "#Google",
      "#Gemini",
      "#AI영화"
    ],
    "note": "Google Gemini·Veo 3·Flow 활용 필수. 2026.1.11 두바이에서 수상자 발표 완료.",
    "link": "https://www.1billionsummit.com"
  },
  {
    "name": "제2회 지센 AI 아트 콘테스트 (위비스)",
    "host": "위비스(Wibys), 지센(ZISEN)",
    "type": "이미지",
    "category": "AI 아트·패션",
    "status": "모집중",
    "startDate": "2026-02-11",
    "deadline": "2026-03-01",
    "region": "한국",
    "language": "한국어",
    "reward": "1등 50만원, 2등 위비스몰 포인트 15만원(3명), 3등 10만원(5명)",
    "format": "AI 생성 이미지 (SNS 업로드)",
    "target": "일반인",
    "tags": [
      "#위비스",
      "#지센",
      "#AI아트"
    ],
    "note": "주제: '빛나는 나'. 지센 브랜드 스타일을 AI로 창의적 표현. SNS 좋아요·댓글 수 추가 점수 반영.",
    "link": "https://www.allforyoung.com"
  },
  {
    "name": "제64회 진해군항제 AI 영상 공모전",
    "host": "창원시, 진해이순신축제위원회",
    "type": "영상",
    "category": "AI 영상·지역축제",
    "status": "모집중",
    "startDate": "2026-01-29",
    "deadline": "2026-03-06",
    "region": "한국",
    "language": "한국어",
    "reward": "대상 200만원, 최우수상 100만원, 우수상 50만원",
    "format": "영상 60초 이내 (FHD, MP4/MOV)",
    "target": "대한민국 국민 누구나 (개인/4인 이하 팀)",
    "tags": [
      "#군항제",
      "#진해",
      "#AI영상"
    ],
    "note": "진해군항제 관련 자유 주제 AI 영상. AI 도구·프롬프트 요약 제출 필수. 수상작은 군항제 공식 YouTube 채널 활용.",
    "link": "https://www.thinkyou.co.kr"
  },
  {
    "name": "경북국제 AI·메타버스 영상 공모전 (GAMFF)",
    "host": "경상북도, 구미시, 포항시, 청도군 / 경북테크노파크",
    "type": "영상",
    "category": "AI·메타버스 영상",
    "status": "접수예정",
    "startDate": "2026-05-01",
    "deadline": "2026-06-30",
    "region": "한국/글로벌",
    "language": "한국어/영어",
    "reward": "총 상금 1억원 (종합대상 1,000만원)",
    "format": "AI·메타버스 활용 영상",
    "target": "일반인",
    "tags": [
      "#GAMFF",
      "#경북",
      "#메타버스"
    ],
    "note": "2025년 기준 총 1억원 상금. 2026년 일정은 추후 gamff.com에서 발표 예정. 경북 게임 페스티벌과 연계.",
    "link": "https://www.gamff.com"
  }
];

const tools = [
  // 영상 생성 (6개)
  { name: "Sora", type: "영상", free: "Preview", description: "텍스트→비디오 변환 모델, 사실적인 영상을 생성.", link: "https://openai.com/sora", color: "#000" },
  { name: "Runway Gen-3", type: "영상", free: "무료 체험", description: "영상 편집 및 생성", link: "https://runwayml.com", color: "#6d4aff" },
  { name: "Kling AI", type: "영상", free: "무료 체험", description: "고품질 영상 생성", link: "https://klingai.com", color: "#ff6b35" },
  { name: "Pika", type: "영상", free: "무료 플랜", description: "AI 영상 생성", link: "https://pika.art", color: "#00d4ff" },
  { name: "Flow", type: "영상", free: "무료 체험", description: "AI 워크플로우 영상", link: "https://www.useflow.ai", color: "#8b5cf6" },
  { name: "Grok", type: "영상", free: "유료", description: "xAI 영상 생성", link: "https://grok.x.ai", color: "#1d9bf0" },

  // 이미지 생성 (4개)
  { name: "Midjourney", type: "이미지", free: "유료", description: "상상 속 이미지를 현실로 만드는 이미지 생성 AI.", link: "https://www.midjourney.com", color: "#2463eb" },
  { name: "Whisk", type: "이미지", free: "무료", description: "Google 이미지 믹싱", link: "https://labs.google/fx/tools/whisk", color: "#34a853" },
  { name: "Ideogram", type: "이미지", free: "무료 플랜", description: "텍스트 포함 이미지", link: "https://ideogram.ai", color: "#9333ea" },
  { name: "나노바나나", type: "이미지", free: "무료", description: "Gemini 이미지 생성", link: "https://nanobanana.co.kr", color: "#fbbc04" },

  // 음악/오디오 (4개)
  { name: "Suno", type: "오디오", free: "무료 플랜", description: "누구나 작곡가가 될 수 있는 음악 생성 도구.", link: "https://suno.com", color: "#ff3b30" },
  { name: "Udio", type: "오디오", free: "무료 체험", description: "AI 음악 생성", link: "https://udio.com", color: "#5856d6" },
  { name: "ElevenLabs", type: "오디오", free: "무료 플랜", description: "음성 합성/클로닝", link: "https://elevenlabs.io", color: "#000" },
  { name: "Mubert", type: "오디오", free: "무료 플랜", description: "AI 배경음악", link: "https://mubert.com", color: "#00e5ff" },

  // 기획/텍스트 (5개)
  { name: "ChatGPT", type: "기획", free: "무료 플랜", description: "텍스트 생성/대화", link: "https://chatgpt.com", color: "#10a37f" },
  { name: "Claude", type: "기획", free: "무료 플랜", description: "Anthropic AI 어시스턴트", link: "https://claude.ai", color: "#d97706" },
  { name: "Gemini", type: "기획", free: "무료", description: "Google AI 어시스턴트", link: "https://gemini.google.com", color: "#4285f4" },
  { name: "Grok", type: "기획", free: "유료", description: "xAI 대화형 AI", link: "https://grok.x.ai", color: "#1d9bf0" },
  { name: "Perplexity", type: "기획", free: "무료 플랜", description: "AI 검색 엔진", link: "https://www.perplexity.ai", color: "#20a4f3" }
];

const el = {
  cards: document.getElementById("contestCards"),
  urgentCards: document.getElementById("urgentCards"),
  homeToolCards: document.getElementById("homeToolCards"),
  search: document.getElementById("searchInput"),
  status: document.getElementById("statusFilter"),
  type: document.getElementById("typeFilter"),
  toolSearch: document.getElementById("toolSearch"),
  toolFilters: document.querySelectorAll("[data-tool-filter]"),
  listBtn: document.getElementById("listViewBtn"),
  calBtn: document.getElementById("calendarViewBtn"),
  listPanel: document.getElementById("listPanel"),
  calPanel: document.getElementById("calendarPanel"),
  calGrid: document.getElementById("calendarGrid"),
  calTitle: document.getElementById("calendarTitle"),
  prevMonth: document.getElementById("prevMonthBtn"),
  todayBtn: document.getElementById("todayBtn"),
  nextMonth: document.getElementById("nextMonthBtn"),
  tools: document.getElementById("toolCards"),
  drawer: document.getElementById("detailDrawer"),
  detail: document.getElementById("detailContent"),
  closeDrawer: document.getElementById("closeDrawer"),
  drawerOverlay: document.getElementById("drawerOverlay"),
  requestContestBtn: document.getElementById("requestContestBtn"),
  topLinks: document.querySelectorAll(".top-link"),
  pages: {
    home: document.getElementById("homePage"),
    contests: document.getElementById("contestsPage"),
    tools: document.getElementById("toolsPage"),
    about: document.getElementById("aboutPage")
  }
};

let viewDate = new Date(2026, 1, 1);
let activeToolFilter = "all";
const validPages = ["home", "contests", "tools", "about"];

function getPageFromHash() {
  const page = window.location.hash.replace("#", "");
  return validPages.includes(page) ? page : "home";
}

function parseDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function daysDiff(deadline) {
  const d = parseDate(deadline);
  if (!d) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
}

function getDday(deadline) {
  const diff = daysDiff(deadline);
  if (diff === null) return "일정 미정";
  if (diff === 0) return "D-day";
  if (diff < 0) return `D+${Math.abs(diff)}`;
  return `D-${diff}`;
}

function effectiveStatus(contest) {
  const diff = daysDiff(contest.deadline);
  if (diff === null) return contest.status || "모집중";
  if (diff < 0) return "마감";
  if (diff <= 7) return "마감 임박";
  return contest.status || "모집중";
}

function statusClass(status) {
  if (status === "모집중") return "status-open";
  if (status === "마감 임박") return "status-soon";
  return "status-closed";
}

function pick(...values) {
  return values.find((v) => v !== undefined && v !== null && String(v).trim() !== "");
}

function filteredContests() {
  const q = el.search?.value?.trim().toLowerCase() || "";
  return contests.filter((c) => {
    const name = String(c.name || "").toLowerCase();
    const host = String(c.host || "").toLowerCase();
    const status = effectiveStatus(c);
    const okQ = !q || name.includes(q) || host.includes(q);
    const okS = (el.status?.value || "all") === "all" || status === el.status.value;
    const okT = (el.type?.value || "all") === "all" || c.type === el.type.value;
    return okQ && okS && okT;
  });
}


function cardTemplate(c, index) {
  const status = effectiveStatus(c);
  const tags = Array.isArray(c.tags) ? c.tags : [];
  const deadlineText = c.deadline || "미정";
  const deadlineDisplay = deadlineText !== "미정" ? new Date(c.deadline).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : "일정 미정";

  return `<article class="card" data-index="${index}">
      <div class="card-top">
        <span class="badge ${statusClass(status)}">${status}</span>
        <span class="dday">${getDday(c.deadline)}</span>
      </div>
      <h3>${c.name || "제목 없음"}</h3>
      <p class="host">주최: ${c.host || "주최 정보 없음"}</p>
      <div class="tag-row">${tags.slice(0, 3).map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      <span class="category">${c.category || "일반"}</span>
      <div class="card-info">
        <p>🏆 상금/혜택: ${c.reward || "혜택 미정"}</p>
        <p title="마감일: ${deadlineDisplay}">📅 마감일: ${deadlineText}</p>
      </div>
    </article>`;
}

function bindCardEvents(scope, sourceList) {
  scope.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = Number(card.dataset.index);
      openDrawer(sourceList[idx]);
    });
  });
}

function renderCards() {
  const list = filteredContests();
  if (!el.cards) return;
  if (!list.length) {
    el.cards.innerHTML = `<article class="card"><p>조건에 맞는 공모전이 없습니다.</p></article>`;
    return;
  }

  // 정렬: 모집중/마감임박 먼저, 마감 나중, 각 그룹 내에서 D-day 오름차순
  const sorted = [...list].sort((a, b) => {
    const statusA = effectiveStatus(a);
    const statusB = effectiveStatus(b);

    // 마감되지 않은 것 우선
    const activeA = statusA !== "마감" ? 0 : 1;
    const activeB = statusB !== "마감" ? 0 : 1;

    if (activeA !== activeB) return activeA - activeB;

    // 같은 그룹 내에서 D-day 오름차순 (긴급한 것 먼저)
    const ddayA = daysDiff(a.deadline) ?? 9999;
    const ddayB = daysDiff(b.deadline) ?? 9999;
    return ddayA - ddayB;
  });

  el.cards.innerHTML = sorted.map((c, i) => cardTemplate(c, i)).join("");
  bindCardEvents(el.cards, sorted);
}

function renderUrgentCards() {
  if (!el.urgentCards) return;
  const list = contests.filter((c) => {
    const d = daysDiff(c.deadline);
    return d !== null && d >= 0 && d <= 7;
  });
  const source = list.length ? list : contests.slice(0, 3);
  el.urgentCards.innerHTML = source.map((c, i) => cardTemplate(c, i)).join("");
  bindCardEvents(el.urgentCards, source);
}

function dayItems(year, month, day) {
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return contests.filter((c) => c.deadline === dateStr);
}

function renderCalendar() {
  if (!el.calGrid || !el.calTitle) return;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  el.calTitle.textContent = `${year}년 ${month + 1}월`;

  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  el.calGrid.innerHTML = "";

  for (let i = 0; i < first; i += 1) {
    el.calGrid.innerHTML += `<div class="day empty"><div class="day-num"></div></div>`;
  }

  for (let d = 1; d <= total; d += 1) {
    const items = dayItems(year, month, d);
    const mark = items.length ? `<div class="day-item">${items.length}개</div>` : "";
    el.calGrid.innerHTML += `<div class="day"><div class="day-num">${d}</div>${mark}</div>`;
  }
}

function toolCard(t, compact = false) {
  if (compact) {
    // Category tag mapping
    const categoryTags = {
      "Sora": "Video",
      "Midjourney": "Art",
      "Suno": "Music"
    };
    const tag = categoryTags[t.name] || "";

    return `<a href="${t.link}" target="_blank" rel="noopener noreferrer" class="tool-card" style="text-decoration: none; color: inherit; cursor: pointer;">
      <div class="tool-icon-rounded" style="background:${t.color}">${t.name.slice(0, 2)}</div>
      <h4>${t.name}</h4>
      <p>${t.description}</p>
      ${tag ? `<span class="tool-tag">${tag}</span>` : ''}
    </a>`;
  }
  return `<a href="${t.link}" target="_blank" rel="noopener noreferrer" class="tool" style="text-decoration: none; color: inherit; cursor: pointer; display: flex; align-items: center; gap: 1rem;"><div class="tool-icon" style="background:${t.color}">${t.name.slice(0, 2)}</div><div><h3>${t.name}</h3><p>${t.description}</p><small>${t.free}</small></div></a>`;
}

function renderHomeTools() {
  if (!el.homeToolCards) return;
  // Featured tools: Sora, Midjourney, Suno
  const featuredTools = [
    tools.find(t => t.name === "Sora"),
    tools.find(t => t.name === "Midjourney"),
    tools.find(t => t.name === "Suno")
  ].filter(Boolean);

  const toolsHTML = featuredTools.map((t) => toolCard(t, true)).join("");
  const moreButton = `<div class="tool-card more-card" data-jump="tools" style="cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
    <div style="font-size: 3rem; color: #9ca3af;">+</div>
    <h4 style="margin: 0;">전체 도구 보기</h4>
  </div>`;

  el.homeToolCards.innerHTML = toolsHTML + moreButton;

  // Add click event for the "more" button
  const moreCard = el.homeToolCards.querySelector('.more-card');
  if (moreCard) {
    moreCard.addEventListener('click', () => setPage('tools'));
  }
}

function filteredTools() {
  const q = el.toolSearch?.value?.trim().toLowerCase() || "";
  return tools.filter((t) => {
    const byFilter = activeToolFilter === "all" || t.type === activeToolFilter;
    const text = `${t.name} ${t.description}`.toLowerCase();
    return byFilter && (!q || text.includes(q));
  });
}

function renderTools() {
  if (!el.tools) return;
  el.tools.innerHTML = filteredTools().map((t) => toolCard(t)).join("");
}

function posterTemplate(contest) {
  if (contest.poster) {
    return `<img class="poster" src="${contest.poster}" alt="${contest.name || "공모전"}" />`;
  }
  return `<div class="poster">${String(contest.name || "공모").slice(0, 2)}</div>`;
}

function openDrawer(contest) {
  const tags = Array.isArray(contest.tags) ? contest.tags : [];
  const status = effectiveStatus(contest);
  el.detail.innerHTML = `
    ${posterTemplate(contest)}
    <h3>${contest.name || "제목 없음"}</h3>
    <p>주최: ${contest.host || "주최 정보 없음"}</p>
    <p><strong>소개</strong><br>${contest.note || "상세 설명 없음"}</p>
    <div class="tag-row">${tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
    <div class="meta-row"><span class="badge ${statusClass(status)}">${status}</span></div>
    <div class="detail-meta">
      <div class="detail-box"><strong>마감일</strong><br>${contest.deadline || "미정"}<br><span class="dday">${getDday(contest.deadline)}</span></div>
      <div class="detail-box"><strong>상금</strong><br>${contest.reward || "혜택 미정"}</div>
      <div class="detail-box"><strong>참가자격</strong><br>${contest.target || "제한 없음"}</div>
      <div class="detail-box"><strong>지역</strong><br>${contest.region || "미정"}</div>
          <div class="detail-box"><strong>게시일/접수 시작</strong><br>${contest.startDate || "미정"}</div>
    </div>
    <p><a class="official-link" href="${contest.link || "#"}" target="_blank" rel="noreferrer">공식 페이지 이동</a></p>
  `;
  el.drawer.classList.remove("hidden");
  el.drawerOverlay?.classList.remove("hidden");
}

function closeDrawer() {
  el.drawer.classList.add("hidden");
  el.drawerOverlay?.classList.add("hidden");
}

function setView(type) {
  const isList = type === "list";
  el.listPanel.classList.toggle("hidden", !isList);
  el.calPanel.classList.toggle("hidden", isList);
  el.listBtn.classList.toggle("active", isList);
  el.calBtn.classList.toggle("active", !isList);
}

function setPage(page, updateHash = true) {
  const target = validPages.includes(page) ? page : "home";
  Object.entries(el.pages).forEach(([key, node]) => node.classList.toggle("active", key === target));
  el.topLinks.forEach((btn) => btn.classList.toggle("active", btn.dataset.page === target));
  if (updateHash) {
    window.location.hash = target;
  }
}

function normalizeContests(raw) {
  return raw.map((c) => {
    const name = pick(c.name, c.title, c.contestTitle);
    const host = pick(c.host, c.organizer, c.organization);
    const reward = pick(c.reward, c.prize, c.benefit);
    const deadline = pick(c.deadline, c.endDate, c.closeDate);
    const note = pick(c.note, c.description, c.summary);
    const target = pick(c.target, c.qualifications, c.eligibility);
    const status = pick(c.status, c.recruitStatus);
    const tags = Array.isArray(c.tags) ? c.tags : Array.isArray(c.keywords) ? c.keywords : [];

    return {
      ...c,
      name,
      host,
      reward,
      deadline,
      note,
      target,
      status: effectiveStatus({ ...c, deadline, status }),
      tags
    };
  });
}

async function loadContests() {
  try {
    const response = await fetch("./contests.json", { cache: "no-store" });
    if (!response.ok) throw new Error("load failed");
    const data = await response.json();
    const source = Array.isArray(data) && data.length ? data : fallbackContests;
    contests = normalizeContests(source);
  } catch (_error) {
    contests = normalizeContests(fallbackContests);
  }
}

async function init() {
  await loadContests();
  renderCards();
  renderUrgentCards();
  renderCalendar();
  renderTools();
  renderHomeTools();

  el.search?.addEventListener("input", renderCards);
  el.status?.addEventListener("change", renderCards);
  el.type?.addEventListener("change", renderCards);
  el.toolSearch?.addEventListener("input", renderTools);

  el.toolFilters.forEach((btn) => btn.addEventListener("click", () => {
    activeToolFilter = btn.dataset.toolFilter;
    el.toolFilters.forEach((item) => item.classList.toggle("active", item === btn));
    renderTools();
  }));

  el.listBtn?.addEventListener("click", () => setView("list"));
  el.calBtn?.addEventListener("click", () => setView("calendar"));
  el.prevMonth?.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    renderCalendar();
  });
  el.todayBtn?.addEventListener("click", () => {
    viewDate = new Date();
    renderCalendar();
  });
  el.nextMonth?.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderCalendar();
  });

  setPage(getPageFromHash(), false);

  el.topLinks.forEach((btn) => btn.addEventListener("click", () => setPage(btn.dataset.page)));
  window.addEventListener("hashchange", () => setPage(getPageFromHash(), false));

  document.querySelectorAll("[data-jump]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    setPage(a.dataset.jump);
  }));

  document.getElementById("focusUrgentBtn")?.addEventListener("click", () => {
    el.status.value = "마감 임박";
    setView("list");
    renderCards();
  });

  el.closeDrawer?.addEventListener("click", closeDrawer);
  el.drawerOverlay?.addEventListener("click", closeDrawer);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  el.requestContestBtn?.addEventListener("click", () => {
    window.open("mailto:help@gordonte.ai?subject=공모전%20등록%20요청", "_blank");
  });
}

init();
