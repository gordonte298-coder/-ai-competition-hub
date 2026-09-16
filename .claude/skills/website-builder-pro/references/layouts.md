# 상업 홈페이지/랜딩페이지의 짜임 — 페이지 구조·섹션 설계·레이아웃 패턴 총정리 (2026 기준)

> Claude Code 스킬 레퍼런스. 이 문서 하나로 "어떤 섹션을 → 어떤 순서로 → 어떤 레이아웃으로" 배치할지 즉시 결정할 수 있게 구성했다.
> 핵심 원칙: **Clarity(명확) → Comprehension(이해) → Credibility(신뢰) → Conversion(전환)** 순서로 페이지가 흐르게 한다.

---

## 1. 업종별 페이지 구성 공식 (검증된 섹션 순서)

모든 상업 페이지의 서사는 동일하다: **문제 제기 → 해결책 제시 → 증거(Proof) → 행동 유도(CTA)**.
아래 공식은 이 서사를 업종별로 구체화한 것이다. 섹션 순서를 바꾸면 사용자가 페이지를 이해하는 데 드는 마찰(friction)이 커진다.

### 1-1. SaaS / 제품 랜딩페이지

```
1. 헤더 (스티키, 로고 + 4~5개 메뉴 + CTA 버튼)
2. 히어로 (결과 중심 헤드라인 + 서브헤드 + CTA + 제품 스크린샷/데모)
3. 로고월 (고객사 로고 5~8개 — "첫 스크롤 안에" 배치가 2026 표준)
4. 문제 제기 or 기능/혜택 (3열 그리드 또는 벤토 그리드)
5. 작동 방식 How it works (3단계, 번호 매김)
6. 상세 기능 (지그재그 교차 레이아웃, 2~4블록)
7. 후기/사례 (인물 사진 + 이름 + 직함 필수)
8. 가격표 (3단, 가운데 추천 강조)
9. FAQ (아코디언, 5~8문항 — 반박 처리 역할)
10. 최종 CTA 섹션 (풀블리드 배경 + 헤드라인 재진술)
11. 푸터 (4열: 제품/회사/리소스/법적 고지)
```
- 2026 트렌드: 히어로에서 3~5초 안에 제품 가치가 **시각적으로** 증명돼야 함(제품 UI 실사, 인터랙티브 데모, 마이크로 애니메이션).
- 폴드 위(above the fold)에 반드시: 헤드라인 + CTA + 소셜 프루프 1개.

### 1-2. 회사 소개 (기업 사이트)

```
1. 헤더 (메가메뉴 가능 — 사업 영역 많을 때)
2. 히어로 (미션/슬로건 + 대표 비주얼, CTA는 "문의하기"/"회사소개서")
3. 핵심 수치 (연혁 N년, 고객사 N개, 임직원 N명 — 4열 스탯 바)
4. 사업 영역 (카드 그리드 3~4열, 각 카드 → 상세 페이지 링크)
5. 회사 소개 / 연혁 (타임라인 or 2열 텍스트+이미지)
6. 고객사/파트너 로고월
7. 뉴스/공지 (최신 3건 카드)
8. 오시는 길 + 문의 폼 (지도 임베드 + 폼 2열)
9. 푸터 (회사 정보, 사업자등록번호, 개인정보처리방침 — 한국 필수)
```

### 1-3. 쇼핑몰 / 이커머스

```
1. 프로모션 바 (얇은 띠 — "무료배송" 등, 닫기 버튼)
2. 헤더 (로고 + 검색창 중앙 + 장바구니/마이페이지, 카테고리 내비)
3. 히어로 배너 (시즌 프로모션, 캐러셀은 3장 이하)
4. 카테고리 바로가기 (아이콘/이미지 타일 4~8개)
5. 베스트셀러 (상품 카드 그리드, "더보기" 링크)
6. 프로모션 스플릿 배너 (2열 이미지 배너)
7. 신상품 / 추천 상품
8. 리뷰 하이라이트 (별점 + 포토리뷰)
9. 브랜드 스토리 (짧게) + 인스타그램 피드
10. 푸터 (고객센터 전화/시간, 교환·반품 정책, 사업자 정보)
```
- 핵심: 상품 카드로 최대한 빨리 도달하게. 히어로에 모두가 공감할 상품이 없으면 히어로를 줄이고 카테고리/상품을 위로 올린다.
- 모바일 우선 필수(모바일 구매 비중이 과반).

### 1-4. 카페·식당·로컬 비즈니스

```
1. 헤더 (전화번호 + "예약/주문" 버튼을 헤더에 상시 노출)
2. 히어로 (음식/공간 풀블리드 사진 + 상호 + 한 줄 소개 + [메뉴 보기][예약하기])
3. 핵심 정보 바 (영업시간 · 주소 · 전화 — 스크롤 없이 보이게)
4. 대표 메뉴 (사진 카드 그리드 or 가격 리스트, PDF 금지·페이지 내 임베드)
5. 공간/분위기 갤러리 (매스너리 or 가로 스크롤)
6. 브랜드 스토리 (셰프/오너 소개, 1블록)
7. 리뷰 (네이버/구글 리뷰 인용 3개)
8. 오시는 길 (지도 임베드 + 주차 안내)
9. 푸터 (영업시간 재노출 + SNS + 전화)
```
- 방문자가 3초 안에 알아야 할 것: **뭘 파는지, 어디 있는지, 어떻게 주문/예약하는지.**
- 주소·영업시간·전화는 헤더와 푸터 양쪽에 모든 페이지 노출.

### 1-5. 에이전시 / 스튜디오

```
1. 헤더 (미니멀 — 로고 + Work/About/Contact 3~4개)
2. 히어로 (큰 타이포 선언문 "We build ___ for ___" + 스크롤 유도)
3. 대표 프로젝트 쇼케이스 (대형 썸네일 2열 or 풀와이드 교차 — 포트폴리오가 곧 증거)
4. 서비스 영역 (넘버링 리스트 or 카드 3열)
5. 클라이언트 로고월 + 수상 실적
6. 프로세스 (4단계: 발견→설계→제작→운영)
7. 팀/스튜디오 소개 (선택)
8. 후기 (클라이언트 실명 인용)
9. 대형 CTA ("프로젝트 문의" — 이메일 대문짝 타이포도 유효)
10. 푸터
```
- 에이전시는 **작업물이 히어로 다음에 바로** 나와야 한다. 말보다 결과물.

### 1-6. 개인 브랜드 (포트폴리오/프리랜서/크리에이터)

```
1. 헤더 (이름 로고 + 3개 메뉴)
2. 히어로 (얼굴 사진 or 아바타 + "나는 누구고 무엇을 해주는 사람" 한 문장 + CTA)
3. 소셜 프루프 (기고/출연 매체, 구독자 수, 고객 로고)
4. 제공 서비스 or 대표 작업 (카드 3열)
5. About (스토리텔링 — 개인 브랜드에선 비중 큼)
6. 후기
7. 뉴스레터 구독 or 문의 CTA
8. 푸터 (SNS 링크 중심)
```

---

## 2. 섹션별 해부학 (Anatomy)

각 섹션: **목적 → 필수 요소 → 레이아웃 변형 → HTML 스켈레톤** 순.

### 2-1. 히어로 (Hero)

**목적**: 3~5초 안에 "무엇을, 누구에게, 왜"를 전달하고 첫 CTA 클릭을 만든다.

**필수 요소**: ① 헤드라인 ② 서브헤드 ③ 프라이머리 CTA(+보조 CTA) ④ 비주얼(제품 스샷/사진) ⑤ 마이크로 소셜 프루프(별점, "N개 팀이 사용 중")

**헤드라인 공식 (가치 제안 작성법)**:
- `[목표 고객]이 [원하는 결과]를 얻게 하는 [카테고리]` — 예: "1인 쇼핑몰도 하루 만에 여는 온라인 스토어"
- `[고통] 없이 [결과]` — 예: "개발자 없이 랜딩페이지를 30분 만에"
- `[행동 동사] + [결과] + [시간/조건]` — 예: "회의록 정리를 자동으로, 회의 끝나자마자"
- 규칙: 헤드라인은 **결과(outcome)**, 서브헤드는 **대상+방법(mechanism)**, 비주얼은 **사용 중인 제품**. 형용사 자랑("최고의", "혁신적인") 금지, 구체적 수치 우대.

**레이아웃 변형**:
| 변형 | 구조 | 적합 |
|---|---|---|
| 스플릿 (좌텍스트/우비주얼) | 2열 grid, 55:45 | SaaS 기본값 |
| 센터 정렬 | 텍스트 중앙 + 아래 대형 스크린샷 | 제품 UI가 강할 때 |
| 풀블리드 배경 | 사진/영상 위 텍스트 오버레이 | 식당·호텔·브랜드 |
| 빅 타이포 | 화면의 60%가 헤드라인 | 에이전시·개인 브랜드 |

```html
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">신규 기능 출시</p><!-- 선택: 아이브로우/배지 -->
      <h1>회의록 정리를 자동으로,<br>회의 끝나자마자</h1>
      <p class="hero__sub">녹음만 하면 AI가 요약·할일·결정사항을 뽑아줍니다. 팀을 위한 회의 비서.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#pricing">무료로 시작하기</a>
        <a class="btn btn--ghost" href="#demo">데모 보기</a>
      </div>
      <p class="hero__proof">★ 4.9 · 2,300개 팀이 사용 중</p>
    </div>
    <div class="hero__media"><img src="app-shot.png" alt="제품 대시보드 화면"></div>
  </div>
</section>
```
```css
.hero__grid{ display:grid; grid-template-columns: 1.1fr .9fr; gap: var(--space-8); align-items:center; min-height: min(80vh, 720px); }
@media (max-width: 768px){ .hero__grid{ grid-template-columns: 1fr; text-align:center; } }
```

### 2-2. 소셜 프루프 (Social Proof)

**목적**: "나 같은 사람이 이미 쓰고 있다"는 신뢰 형성. **결정 지점(CTA, 가격표) 가까이에 배치**하는 게 원칙.

**3가지 형태와 위치**:
1. **로고월 (Logo Wall)** — 히어로 직후. 5~8개, 그레이스케일 처리로 톤 통일. "이런 팀들이 함께합니다" 한 줄 캡션.
2. **수치 스탯 바** — "가입자 12,000+ · 처리 문서 300만 건 · 만족도 98%". 3~4개, 큰 숫자 + 작은 라벨.
3. **후기 (Testimonial)** — 가격표 앞뒤. **실명 + 직함 + 얼굴 사진** 3종 세트가 없으면 효과 급감. 구체적 수치가 든 후기("도입 후 처리 시간 40% 감소")가 최상.

```html
<!-- 로고월 -->
<section class="logos">
  <div class="container">
    <p class="logos__caption">2,300개 이상의 팀이 함께합니다</p>
    <ul class="logos__row">
      <li><img src="logo-a.svg" alt="A사"></li>
      <!-- × 5~8 -->
    </ul>
  </div>
</section>

<!-- 후기 카드 -->
<figure class="testimonial">
  <blockquote>"도입 2주 만에 회의 후속 작업 시간이 절반으로 줄었어요."</blockquote>
  <figcaption>
    <img src="face.jpg" alt="" class="testimonial__avatar">
    <div><strong>김민지</strong><span>프로덕트 매니저, ○○테크</span></div>
  </figcaption>
</figure>
```
```css
.logos__row{ display:flex; flex-wrap:wrap; justify-content:center; gap: var(--space-6) var(--space-8); }
.logos__row img{ height:28px; filter:grayscale(1); opacity:.6; }
```

### 2-3. 기능/혜택 소개 (Features / Benefits)

**목적**: "그래서 나한테 뭐가 좋은데?"에 답한다. 기능(feature)이 아니라 **혜택(benefit) 언어**로 쓴다("실시간 동기화" ✕ → "어디서 열어도 항상 최신 문서" ○).

**변형 1 — 3열 카드 그리드** (기본값, 혜택 3~6개):
```html
<section class="features section">
  <div class="container">
    <header class="section__head">
      <h2>일 잘하는 팀의 회의는 다릅니다</h2>
      <p>기록하고, 요약하고, 실행까지 이어지는 3단계.</p>
    </header>
    <div class="cards-grid">
      <article class="card">
        <div class="card__icon">🎙</div>
        <h3>자동 녹취</h3>
        <p>버튼 하나로 녹음과 화자 분리까지. 놓치는 발언이 없습니다.</p>
      </article>
      <!-- × 3 or 6 -->
    </div>
  </div>
</section>
```

**변형 2 — 지그재그 교차 (Alternating)** (상세 설명이 필요한 핵심 기능 2~4개):
```html
<div class="zigzag">
  <div class="zigzag__row"><!-- 홀수: 텍스트 좌, 이미지 우 -->
    <div class="zigzag__copy"><h3>…</h3><p>…</p><a href="#">자세히 →</a></div>
    <div class="zigzag__media"><img src="feat1.png" alt=""></div>
  </div>
  <div class="zigzag__row zigzag__row--reverse"><!-- 짝수: 반전 --></div>
</div>
```
```css
.zigzag__row{ display:grid; grid-template-columns:1fr 1fr; gap:var(--space-8); align-items:center; }
.zigzag__row--reverse .zigzag__copy{ order:2; }
@media (max-width:768px){ .zigzag__row{ grid-template-columns:1fr; } .zigzag__row--reverse .zigzag__copy{ order:0; } }
```

**변형 3 — 벤토 그리드 (Bento Grid)** (2026 대세 — Apple식. 중요도에 따라 셀 크기 차등, 라운드 12~24px):
```html
<div class="bento">
  <article class="bento__cell bento__cell--hero">주력 기능 (2×2)</article>
  <article class="bento__cell">보조 기능</article>
  <article class="bento__cell">보조 기능</article>
  <article class="bento__cell bento__cell--wide">가로 강조 (2×1)</article>
</div>
```
```css
.bento{ display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:180px; gap:var(--space-4); }
.bento__cell{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); padding:var(--space-6); }
.bento__cell--hero{ grid-column:span 2; grid-row:span 2; }
.bento__cell--wide{ grid-column:span 2; }
@media (max-width:768px){ .bento{ grid-template-columns:repeat(2,1fr); } }
@media (max-width:480px){ .bento{ grid-template-columns:1fr; grid-auto-rows:auto; } .bento__cell--hero,.bento__cell--wide{ grid-column:auto; grid-row:auto; } }
```

### 2-4. 가격표 (Pricing) — 3단 프라이싱 심리학

**목적**: 선택 마비를 없애고 "가운데 플랜"으로 유도한다.

**심리학 원칙**:
- **3단 구성** (Good/Better/Best): 2단은 비교 기준 부족, 4단 이상은 결정 피로. 3단이 표준.
- **앵커링(Anchoring)**: 가장 비싼 플랜이 가운데 플랜을 "합리적"으로 보이게 한다.
- **추천 강조**: 가운데 플랜에 "인기" 배지 + 테두리 색 + 살짝 확대(scale 1.03~1.05). 팔고 싶은 플랜을 강조하라.
- 가격 숫자는 크게, 통화·기간은 작게. 연간 결제 토글 시 "2개월 무료" 같은 할인 라벨.
- 각 플랜의 **대상 고객 한 줄**("혼자 쓰는 분께", "성장하는 팀에") 명시 → 자기 선택을 돕는다.
- CTA 문구는 플랜별로: 무료 플랜 "무료로 시작" / 유료 "14일 무료 체험" / 엔터프라이즈 "도입 문의".
- 표 아래에 "언제든 해지 가능 · 카드 등록 불필요" 같은 **불안 해소 문구(risk reversal)** 필수.

```html
<section id="pricing" class="pricing section">
  <div class="container">
    <header class="section__head"><h2>합리적인 가격</h2></header>
    <div class="pricing__grid">
      <article class="plan">
        <h3>Starter</h3><p class="plan__for">혼자 쓰는 분께</p>
        <p class="plan__price"><strong>₩0</strong><span>/월</span></p>
        <ul class="plan__list"><li>월 5회 회의 요약</li><li>…</li></ul>
        <a class="btn btn--ghost" href="#">무료로 시작</a>
      </article>
      <article class="plan plan--featured">
        <span class="plan__badge">가장 인기</span>
        <h3>Pro</h3><p class="plan__for">성장하는 팀에</p>
        <p class="plan__price"><strong>₩19,000</strong><span>/인·월</span></p>
        <ul class="plan__list">…</ul>
        <a class="btn btn--primary" href="#">14일 무료 체험</a>
      </article>
      <article class="plan"><h3>Enterprise</h3> … <a class="btn btn--ghost">도입 문의</a></article>
    </div>
    <p class="pricing__note">언제든 해지 가능 · 카드 등록 없이 시작</p>
  </div>
</section>
```
```css
.pricing__grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-5); align-items:start; }
.plan{ border:1px solid var(--border); border-radius:var(--radius-lg); padding:var(--space-7); }
.plan--featured{ border-color:var(--primary); box-shadow:var(--shadow-lg); transform:scale(1.03); position:relative; }
@media (max-width:900px){ .pricing__grid{ grid-template-columns:1fr; max-width:420px; margin-inline:auto; } .plan--featured{ transform:none; order:-1; } }
```
(모바일에서는 추천 플랜을 `order:-1`로 맨 위로.)

### 2-5. FAQ (아코디언)

**목적**: 구매 반박(objection) 처리. 영업사원이 매번 받는 질문 5~8개를 그대로 싣는다 — 환불, 보안, 해지, 요금, 지원 범위.
JS 없이 `<details>/<summary>`가 표준이고 접근성·SEO에 유리하다.

```html
<section class="faq section">
  <div class="container container--narrow">
    <h2>자주 묻는 질문</h2>
    <details class="faq__item" open>
      <summary>무료 체험이 끝나면 자동 결제되나요?</summary>
      <p>아니요. 체험 종료 시 무료 플랜으로 전환되며, 결제 정보 없이 시작할 수 있습니다.</p>
    </details>
    <details class="faq__item"><summary>…</summary><p>…</p></details>
  </div>
</section>
```
```css
.faq__item{ border-bottom:1px solid var(--border); padding-block:var(--space-4); }
.faq__item summary{ cursor:pointer; font-weight:600; list-style:none; display:flex; justify-content:space-between; }
.faq__item summary::after{ content:"+"; }
.faq__item[open] summary::after{ content:"–"; }
```
- FAQ 본문에는 `FAQPage` JSON-LD 스키마를 넣으면 검색 결과에 노출된다.

### 2-6. 최종 CTA 섹션

**목적**: 끝까지 스크롤한 "고관심" 방문자를 놓치지 않는다. 페이지 마지막, 푸터 직전 고정 배치.

**필수**: 헤드라인 재진술(히어로와 같은 약속, 다른 문장) + 단일 CTA + 불안 해소 한 줄. 배경색 반전(프라이머리 or 다크)으로 시각적 마침표.

```html
<section class="cta-final">
  <div class="container" style="text-align:center">
    <h2>오늘 회의부터 정리는 맡기세요</h2>
    <p>설치 없이 3분 만에 시작할 수 있습니다.</p>
    <a class="btn btn--inverse btn--lg" href="#">무료로 시작하기</a>
    <p class="cta-final__note">신용카드 등록 불필요</p>
  </div>
</section>
```
```css
.cta-final{ background:var(--primary); color:#fff; padding-block:var(--space-10); }
```

### 2-7. 푸터 (Footer)

**목적**: 내비게이션 보조 + 신뢰/법적 정보. "길 잃은 사용자의 마지막 수단".

**표준 구조 (4열 + 하단 바)**:
```html
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <img src="logo.svg" alt="브랜드명">
      <p>한 줄 소개</p>
      <div class="footer__sns"><!-- SNS 아이콘 --></div>
    </div>
    <nav><h4>제품</h4><ul><li><a href="#">기능</a></li><li><a href="#">가격</a></li></ul></nav>
    <nav><h4>회사</h4><ul><li><a href="#">소개</a></li><li><a href="#">채용</a></li></ul></nav>
    <nav><h4>지원</h4><ul><li><a href="#">문의</a></li><li><a href="#">FAQ</a></li></ul></nav>
  </div>
  <div class="container footer__legal">
    <p>㈜회사명 · 대표 ○○○ · 사업자등록번호 000-00-00000 · 서울시 … <br>
       <a href="#">이용약관</a> · <a href="#"><strong>개인정보처리방침</strong></a></p>
    <p>© 2026 Brand. All rights reserved.</p>
  </div>
</footer>
```
```css
.footer__grid{ display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:var(--space-8); padding-block:var(--space-9); }
@media (max-width:768px){ .footer__grid{ grid-template-columns:1fr 1fr; } }
```
- 한국 상업 사이트 필수: 상호·대표자·사업자등록번호·통신판매업 신고번호(쇼핑몰)·개인정보처리방침(볼드 처리 관례).
- 로컬 비즈니스는 영업시간·전화·주소를 푸터에도 반복.

### 2-8. 내비게이션 / 헤더

**목적**: 항상 접근 가능한 이동 수단 + 상시 노출 CTA.

**원칙**:
- 메뉴 4~6개 이하. 우측 끝에 프라이머리 CTA 버튼(배경색 채움) 1개 — 헤더에서 유일하게 "버튼"처럼 생긴 요소여야 한다.
- **스티키(sticky)**: `position:sticky; top:0` + 스크롤 시 배경 블러/그림자. 높이 64~80px, 모바일 56~64px.
- **메가메뉴**: 메뉴가 2단계 이상이고 항목이 7개+일 때만(기업·이커머스). 그 외엔 단순 드롭다운.
- **모바일 햄버거**: 768px 이하에서 전환. 열리면 풀스크린 오버레이 + 메뉴를 큰 타이포로. CTA 버튼은 오버레이 하단 고정.

```html
<header class="header">
  <div class="container header__inner">
    <a class="header__logo" href="/"><img src="logo.svg" alt="브랜드명"></a>
    <nav class="header__nav" id="nav">
      <a href="#features">기능</a><a href="#pricing">가격</a><a href="#faq">FAQ</a><a href="/blog">블로그</a>
    </nav>
    <a class="btn btn--primary header__cta" href="#pricing">무료 시작</a>
    <button class="header__burger" aria-expanded="false" aria-controls="nav" aria-label="메뉴 열기">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```
```css
.header{ position:sticky; top:0; z-index:50; background:color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter:blur(12px); border-bottom:1px solid var(--border); }
.header__inner{ display:flex; align-items:center; gap:var(--space-6); height:72px; }
.header__nav{ display:flex; gap:var(--space-5); margin-left:auto; }
.header__burger{ display:none; }
@media (max-width:768px){
  .header__nav, .header__cta{ display:none; }
  .header__burger{ display:block; margin-left:auto; }
  .header__nav.is-open{ display:flex; flex-direction:column; position:fixed; inset:56px 0 0;
    background:var(--bg); padding:var(--space-7); font-size:var(--fs-xl); }
}
```
```js
document.querySelector('.header__burger').addEventListener('click', (e)=>{
  const nav = document.getElementById('nav');
  const open = nav.classList.toggle('is-open');
  e.currentTarget.setAttribute('aria-expanded', open);
});
```

---

## 3. 레이아웃 시스템

### 3-1. 최대 폭 컨테이너 패턴

```css
.container{ width:100%; max-width:1200px; margin-inline:auto; padding-inline:clamp(16px, 4vw, 32px); }
.container--narrow{ max-width:720px; }  /* FAQ, 긴 텍스트용 */
.container--wide{ max-width:1400px; }   /* 갤러리, 대형 비주얼용 */
```
- 본문 텍스트 줄 길이는 45~75자(한글 기준 폭 640~760px)가 최적 → narrow 컨테이너 사용.

### 3-2. 12컬럼 그리드 개념

전통적 12컬럼은 "어떤 분할(2/3/4/6열)도 표현 가능"해서 표준이 됐다. 현대 CSS에서는 명시적 12컬럼보다 **섹션마다 필요한 그리드를 직접 선언**하는 게 실용적이지만, 복잡한 비대칭 배치엔 여전히 유효하다:
```css
.grid-12{ display:grid; grid-template-columns:repeat(12,1fr); gap:var(--space-5); }
.span-7{ grid-column:span 7; } .span-5{ grid-column:span 5; } /* 55:45 스플릿 */
```

### 3-3. auto-fit minmax 카드 그리드 (미디어쿼리 없는 반응형)

```css
.cards-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(min(280px,100%), 1fr));
  gap:var(--space-5);
}
```
- 280px 아래로 못 줄어들면 자동 줄바꿈. 카드 개수가 유동적일 때 최고의 패턴.
- 정확히 3열을 유지해야 하면(가격표 등) `repeat(3,1fr)` + 미디어쿼리로 명시.

### 3-4. 풀블리드(Full-bleed) + 컨테이너 혼합

배경은 화면 끝까지, 콘텐츠는 컨테이너 안에 — 가장 흔한 요구. 두 가지 방법:

**방법 A (권장 — 단순 래핑)**:
```html
<section class="band"><div class="container">…</div></section>
```
```css
.band{ background:var(--surface); } /* 배경은 section에, 폭 제한은 container에 */
```

**방법 B (그리드 한 방 — 콘텐츠 흐름 속 풀블리드 요소)**:
```css
.content-grid{
  display:grid;
  grid-template-columns:
    [full-start] minmax(var(--space-4),1fr)
    [content-start] min(1200px, 100% - 2*var(--space-4)) [content-end]
    minmax(var(--space-4),1fr) [full-end];
}
.content-grid > *{ grid-column:content; }
.content-grid > .full-bleed{ grid-column:full; }
```

### 3-5. 섹션 간 리듬 (여백 스케일)

- 섹션 세로 패딩은 **일관된 스케일**에서만 고른다. 들쭉날쭉한 여백이 "아마추어 티"의 주범.
- 표준: 섹션 `padding-block: clamp(64px, 10vw, 128px)`. 연관 섹션(로고월↔히어로)은 절반으로 붙인다.
- 섹션 내부 위계: 섹션 헤딩↔본문 그리드 사이 = 40~64px, 카드 내부 = 16~24px. **"바깥 여백 > 안쪽 여백"** 법칙을 지키면 그룹핑이 명확해진다.
```css
.section{ padding-block:var(--section-y); }
.section__head{ max-width:640px; margin:0 auto var(--space-8); text-align:center; }
```
- 배경색 교대(흰색 ↔ 옅은 회색 밴드)로 섹션 경계를 만들면 구분선 없이 리듬이 생긴다.

---

## 4. 전환율(CVR)을 높이는 설계

### 4-1. 폴드 위 3초 법칙
- 방문자는 3~5초 안에 "여기가 뭐 하는 곳인지" 판단하고 이탈을 결정한다.
- 폴드 위 필수 4종: **헤드라인(결과) + 서브헤드(대상·방법) + CTA + 신뢰 1개**. 이 중 하나라도 스크롤 아래로 밀리면 CVR이 예측 가능하게 떨어진다.
- 히어로 비주얼은 장식이 아니라 **증거**여야 한다(실제 제품 화면, 실제 음식 사진).

### 4-2. CTA 배치 원칙
- **1페이지 1목표**: 프라이머리 CTA는 문구·색이 페이지 전체에서 동일해야 한다(히어로/가격표/최종 CTA 모두 "무료로 시작하기").
- 배치 지점: 헤더(상시) → 히어로 → 기능 섹션 뒤 → 가격표 → 최종 CTA. 대략 **1.5~2 스크린마다 한 번**.
- CTA 버튼은 페이지에서 가장 높은 대비(주변과 명도 차)를 가진 요소여야 하며, 문구는 동사+가치("무료로 시작하기", "메뉴 보기")로. "제출", "클릭" 금지.
- CTA 바로 옆에 마찰 감소 문구("카드 불필요", "30초 가입")를 붙이면 클릭 저항이 준다.
- 모바일: 하단 고정 스티키 CTA 바가 로컬 비즈니스(전화/예약)와 이커머스(구매)에서 특히 유효.

### 4-3. F / Z 시선 패턴
- **F 패턴**: 텍스트가 많은 페이지에서 좌상단부터 가로-세로로 훑음 → 중요한 단어를 각 행의 **왼쪽 첫머리**에, 헤드라인 첫 2단어에 핵심을.
- **Z 패턴**: 요소가 적은 랜딩 히어로에서 좌상(로고)→우상(CTA)→좌하(비주얼/카피)→우하(CTA) → 헤더 우측 CTA와 히어로 CTA가 Z의 끝점에 놓이는 이유.
- 실무 적용: 스플릿 히어로에서 텍스트를 왼쪽에 두는 것이 기본(시선 시작점). 인물 사진의 시선/화살표가 CTA를 향하게 하면 유도 효과.

### 4-4. 신뢰 요소 배치
- 신뢰는 "결정 직전"에 필요하다: 로고월은 히어로 직후, 후기는 가격표 앞뒤, 보안 배지·환불 보장은 결제 버튼 옆.
- 구체성이 신뢰를 만든다: "많은 고객" ✕ → "2,300개 팀" ○. 후기도 결과 수치 포함이 최상.

### 4-5. 모바일 우선 설계
- 트래픽 과반이 모바일. **모바일 레이아웃을 먼저 설계**하고 데스크톱으로 확장한다.
- 체크리스트: 터치 타깃 44×44px 이상 / 히어로 헤드라인 모바일 28~36px / 폼 필드 최소화(이메일 하나) / 가로 스크롤 절대 금지 / 이미지 `loading="lazy"` / 스플릿 레이아웃은 모바일에서 텍스트→이미지 순으로 쌓기.

---

## 5. 타이포그래피 시스템

### 5-1. 타입 스케일 (Modular Scale)
- 비율 하나로 전체 크기를 파생: **1.25 (Major Third)** 가 UI 표준(1.2는 밀도 높은 앱, 1.333은 극적인 마케팅 페이지).
- 기준 16px × 1.25ⁿ: 16 → 20 → 25 → 31 → 39 → 49 → 61px.

### 5-2. 반응형 폰트 (clamp 세트 — 복붙용)
```css
:root{
  /* clamp(최소, 유동, 최대) — 뷰포트 375~1280px 기준 */
  --fs-sm:   clamp(0.83rem, 0.8rem + 0.15vw, 0.94rem);
  --fs-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --fs-lg:   clamp(1.13rem, 1.05rem + 0.4vw, 1.41rem);
  --fs-xl:   clamp(1.27rem, 1.15rem + 0.6vw, 1.76rem);   /* h3 */
  --fs-2xl:  clamp(1.6rem, 1.35rem + 1.1vw, 2.2rem);      /* h2 */
  --fs-3xl:  clamp(2rem, 1.6rem + 1.8vw, 2.75rem);        /* 섹션 대제목 */
  --fs-hero: clamp(2.25rem, 1.7rem + 2.8vw, 3.8rem);      /* h1 히어로 */
}
h1{ font-size:var(--fs-hero); } h2{ font-size:var(--fs-3xl); } h3{ font-size:var(--fs-xl); }
```

### 5-3. 행간(line-height) / 자간(letter-spacing)
| 용도 | 행간 | 자간 |
|---|---|---|
| 히어로/대제목 | 1.1~1.25 | -0.02em ~ -0.03em (큰 글자는 좁게) |
| 본문 | 1.6~1.75 (한글은 영문보다 넉넉히) | 0 ~ -0.01em |
| 캡션/라벨 | 1.4 | 0 (대문자 영문 라벨은 +0.05em) |

### 5-4. 한글 웹 타이포 주의점
```css
body{
  font-family:"Pretendard Variable", Pretendard, -apple-system, "Noto Sans KR", sans-serif;
  line-height:1.7;                /* 한글 본문은 1.6 이상 */
  word-break:keep-all;            /* 단어 단위 줄바꿈 — 한글 필수 */
  overflow-wrap:break-word;       /* 긴 URL 등은 강제 줄바꿈 허용 */
  -webkit-font-smoothing:antialiased;
}
h1,h2,h3{ word-break:keep-all; text-wrap:balance; }  /* 제목 줄바꿈 균형 */
```
- `word-break:keep-all` 없으면 한글이 글자 단위로 끊겨 어색해진다. 반드시 `overflow-wrap:break-word`와 함께 쓸 것.
- 한글은 이탤릭이 없다 — 강조는 굵기·색으로. 헤드라인 줄바꿈은 `<br>` 또는 `text-wrap:balance`로 어절 단위 제어.
- 웹폰트는 Pretendard(무료, 가변) 또는 Noto Sans KR. `font-display:swap` + subset(woff2) 필수 — 한글 폰트는 용량이 크다.
- 숫자 강조(가격, 스탯)는 `font-variant-numeric:tabular-nums`로 정렬.

---

## 6. 디자인 토큰 스타터 (CSS 변수 세트 — 복붙용)

```css
:root{
  /* ── 색상: 프라이머리 1 + 뉴트럴 스케일 구성법 ──
     프라이머리는 브랜드색 하나 + 밝은/어두운 변형 2개면 충분.
     뉴트럴(회색)은 9단계 — 페이지의 90%는 뉴트럴로 칠한다. */
  --primary:        #4f46e5;
  --primary-strong: #4338ca;   /* hover */
  --primary-soft:   #eef2ff;   /* 배경 틴트 */
  --gray-50:#f8fafc; --gray-100:#f1f5f9; --gray-200:#e2e8f0; --gray-300:#cbd5e1;
  --gray-400:#94a3b8; --gray-500:#64748b; --gray-600:#475569; --gray-700:#334155;
  --gray-800:#1e293b; --gray-900:#0f172a;
  /* 시맨틱 별칭 — 컴포넌트에서는 이것만 사용 */
  --bg:var(--gray-50); --surface:#ffffff; --border:var(--gray-200);
  --text:var(--gray-900); --text-muted:var(--gray-600);

  /* ── 스페이싱: 4px 기반 스케일 ── */
  --space-1:4px;  --space-2:8px;  --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px;
  --space-9:96px; --space-10:128px;
  --section-y:clamp(64px, 10vw, 128px);

  /* ── 그림자: 3단계면 충분 ── */
  --shadow-sm:0 1px 2px rgb(0 0 0 / .05);
  --shadow-md:0 4px 12px rgb(0 0 0 / .08);
  --shadow-lg:0 12px 32px rgb(0 0 0 / .12);

  /* ── 라운드 ── */
  --radius-sm:6px; --radius-md:10px; --radius-lg:16px; --radius-full:9999px;
}

/* 기본 버튼 컴포넌트 */
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:var(--space-2);
  padding:.75em 1.5em; border-radius:var(--radius-md); font-weight:600; font-size:var(--fs-base);
  text-decoration:none; transition:background .15s, transform .1s; }
.btn--primary{ background:var(--primary); color:#fff; }
.btn--primary:hover{ background:var(--primary-strong); }
.btn--ghost{ border:1px solid var(--border); color:var(--text); background:var(--surface); }
.btn--inverse{ background:#fff; color:var(--primary); }
.btn--lg{ padding:1em 2em; font-size:var(--fs-lg); }
.card{ background:var(--surface); border:1px solid var(--border);
  border-radius:var(--radius-lg); padding:var(--space-6); box-shadow:var(--shadow-sm); }
```

**색 구성 요령**: ① 프라이머리는 CTA·링크·강조에만(전체 면적의 ~10%) ② 배경·텍스트·보더는 전부 뉴트럴 ③ 성공/경고/오류가 필요하면 green-600/amber-500/red-600 추가 ④ 다크 톤 브랜드면 `--bg`를 gray-900로 뒤집고 시맨틱 별칭만 재정의하면 다크 테마 완성.

---

## 7. 참고 갤러리 (레이아웃 벤치마킹용 URL)

| 사이트 | URL | 특징 |
|---|---|---|
| Land-book | https://land-book.com | 가장 방대한 범용 갤러리. 업종·토픽별 필터 |
| Lapa Ninja | https://www.lapa.ninja | 7,300+ 랜딩페이지. SaaS 카테고리(https://www.lapa.ninja/category/saas/) 유용 |
| SaaS Landing Page | https://saaslandingpage.com | SaaS 특화. 섹션(히어로/가격 등) 단위 검색 가능 |
| Godly | https://godly.website | 하이엔드·실험적 디자인. 에이전시/브랜드 참고 |
| One Page Love | https://onepagelove.com | 원페이지 사이트 특화 |
| Awwwards | https://www.awwwards.com | 수상작 — 인터랙션·모션 참고 |
| Mobbin | https://mobbin.com | 모바일/앱 UI 패턴 |
| Dark Design | https://www.darkdesign.io | 다크 테마 사이트 모음 |

**활용법**: 업종 공식(§1)으로 뼈대를 잡고 → 갤러리에서 같은 업종 상위 3개를 훑어 히어로 변형·컬러 톤만 차용 → 섹션 해부학(§2)의 스켈레톤으로 조립한다.

---

## 부록: 페이지 조립 체크리스트

- [ ] 폴드 위: 헤드라인(결과) + 서브헤드 + CTA + 신뢰 1개
- [ ] 프라이머리 CTA 문구/색이 페이지 전체에서 단일한가
- [ ] 소셜 프루프가 결정 지점(히어로 직후, 가격표 주변)에 있는가
- [ ] 섹션 여백이 스케일(--section-y)에서만 나왔는가
- [ ] 모바일: 햄버거 동작, 카드 1열 스택, 터치 타깃 44px, 가로 스크롤 없음
- [ ] 한글: `word-break:keep-all`, 본문 행간 1.6+, Pretendard/Noto Sans KR
- [ ] 이미지 alt, 시맨틱 태그(header/main/section/footer), h1은 1개
- [ ] 푸터: 사업자 정보·개인정보처리방침(한국 상업 사이트 필수)
