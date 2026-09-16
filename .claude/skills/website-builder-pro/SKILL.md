---
name: website-builder-pro
description: 상업 홈페이지·랜딩페이지·포트폴리오 등 "누가 봐도 대박"인 웹사이트를 만들 때 사용. 검증된 페이지 짜임(섹션 구조·레이아웃), 복붙 가능한 애니메이션 효과 카탈로그, 고급 UI 컴포넌트 레시피를 제공한다. Use when building or redesigning any website, landing page, homepage, or portfolio — provides proven page structures, copy-paste animation effects, and polished UI component recipes.
---

# Website Builder Pro — 대박 웹사이트 제작 스킬

이 스킬은 상업 홈페이지, 랜딩페이지, 포트폴리오, 웹앱의 **첫인상을 "와우"로 만드는** 검증된 재료 모음이다. 웹사이트를 만들거나 개선할 때 아래 레퍼런스를 참고해서 작업하라.

## 레퍼런스 파일 (필요한 것만 읽기)

| 파일 | 언제 읽는가 |
|------|------------|
| `references/layouts.md` | 페이지 구조를 짤 때 — 업종별 섹션 구성 공식, 히어로/가격표/FAQ 등 섹션별 해부학, CSS Grid 레이아웃 패턴, 디자인 토큰 스타터 |
| `references/animations.md` | 움직임을 넣을 때 — 스크롤 리빌, 히어로 연출, 마이크로 인터랙션, 마퀴, 페이지 전환 등 복붙 가능한 효과 카탈로그 |
| `references/components.md` | 컴포넌트를 만들 때 — 스티키 헤더, 카드, 버튼, 폼, 아코디언, 모달, 다크모드 토글 등 완성 코드 레시피 |

## 작업 순서 (권장 워크플로)

1. **짜임 먼저**: `layouts.md`에서 해당 업종/목적의 섹션 구성 공식을 골라 페이지 뼈대를 정한다. 섹션 순서는 검증된 공식을 따르되, 히어로의 헤드라인은 반드시 구체적 가치 제안으로 쓴다.
2. **디자인 토큰 정의**: 색·폰트·스페이싱을 CSS 변수로 먼저 깔아둔다 (`layouts.md`의 토큰 스타터 활용). 이후 모든 컴포넌트가 이 변수를 쓰게 해서 통일감을 만든다.
3. **컴포넌트 조립**: `components.md` 레시피로 헤더→히어로→본문 섹션→푸터 순서로 조립한다.
4. **애니메이션은 마지막에**: 정적 레이아웃이 완성된 후 `animations.md`에서 골라 얹는다. 히어로에 시그니처 효과 1개 + 스크롤 리빌 전역 적용이 기본 조합.

## 항상 지킬 원칙

- **애니메이션은 transform과 opacity만** 건드린다. `prefers-reduced-motion` 대응 코드를 반드시 포함한다.
- **모바일 퍼스트**: 360px 폭에서 먼저 확인하고 데스크톱으로 확장한다.
- **과유불급**: 시그니처 효과는 페이지당 1~2개. 모든 요소가 움직이면 아무것도 돋보이지 않는다.
- **접근성 기본기**: 포커스 스타일 제거 금지, 명도 대비 4.5:1 이상, 시맨틱 태그(`<nav>`, `<main>`, `<section>`) 사용.
- **성능**: 이미지 lazy loading + `width/height` 명시, 폰트는 `font-display: swap`, Lighthouse 90점 이상 목표.
- **공유 대비**: OG 태그(`og:title`, `og:image`)를 빼먹지 않는다.

## 함께 보면 좋은 자료

이 저장소의 `docs/website-resources/`에 게임 사이트, 어학 학습 사이트, 포트폴리오, 기술스택/배포 리서치 문서가 있다. 프로젝트 기획 단계에서는 그쪽을, 실제 구현 단계에서는 이 스킬의 references를 참고하라.
