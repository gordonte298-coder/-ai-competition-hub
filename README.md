# 고든테의 AI 캐비넷

AI 크리에이터를 위한 공모전/도구 모음 사이트입니다.

## 자동 수집 기준

현재 자동 수집은 뉴스 기사가 아니라 위비티 공식 사이트를 기준으로 합니다.

- 수집 소스: `https://www.wevity.com/`
- 대상: AI, 생성형 AI, 영상, 숏폼, 이미지, 스토리, 동화, 콘텐츠, 데이터 관련 공모전
- 제외: 일반 뉴스 기사, 기자단, 서포터즈, 체험단, 교육/아카데미성 글
- 마감 기준: `2026-06-01` 이후 마감 공모전만 유지

## 생성 파일

- `data/contests.json`: 사이트가 우선 읽는 최신 공모전 데이터
- `contests.json`: 기존 사이트 호환용 데이터
- `data/notion-import.csv`: Notion으로 가져오기 좋은 CSV

## 로컬 실행

```bash
python -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다.

## 수동 수집 실행

```bash
node scripts/sync-notion-to-json.mjs
```

## 자동 업데이트

GitHub Actions의 `Sync contests data` 워크플로우가 매일 실행됩니다.
데이터가 바뀌면 자동 커밋되고, Vercel은 GitHub 변경사항을 감지해 다시 배포합니다.

## Notion 사용

`data/notion-import.csv`를 Notion 데이터베이스로 가져오면 됩니다.
완전 자동 Notion 업로드는 Notion Integration Token과 Database ID가 필요합니다.
