# 상업 홈페이지용 고급 UI 컴포넌트 레시피 (2026)

의존성 없는 순수 HTML/CSS/JS 레시피 모음. 모든 코드는 아래 **디자인 토큰**을 전제로 하므로, 프로젝트 색상에 맞게 `:root` 변수만 갈아끼우면 전체 톤이 바뀐다. 2026년 기준 베이스라인: 네이티브 `<dialog>`, `popover` 속성, `<details>` 아코디언, `@starting-style` 트랜지션은 모두 프로덕션에서 사용 가능.

## 0. 공통 디자인 토큰 (필수 — 모든 레시피가 참조)

```css
:root {
  --primary: #4f46e5;          /* 브랜드 메인 */
  --primary-hover: #4338ca;
  --primary-contrast: #ffffff; /* primary 위 텍스트 (대비 4.5:1 확인) */
  --surface: #ffffff;          /* 카드/패널 배경 */
  --bg: #f8fafc;               /* 페이지 배경 */
  --text: #0f172a;             /* 본문 (bg 대비 4.5:1 이상) */
  --text-muted: #475569;       /* 보조 텍스트 (#64748b는 흰 배경에서 4.5:1 미달 주의) */
  --border: #e2e8f0;
  --radius: 12px;
  --shadow: 0 1px 3px rgb(0 0 0 / .08), 0 4px 12px rgb(0 0 0 / .06);
  --shadow-lg: 0 8px 30px rgb(0 0 0 / .12);
  --transition: .25s cubic-bezier(.4, 0, .2, 1);
}
html { scroll-behavior: smooth; scroll-padding-top: 80px; /* 스티키 헤더 높이만큼 */ }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  html { scroll-behavior: auto; }
}
```

---

## 1. 내비게이션 (Navigation)

### 스티키 글래스모피즘 헤더 + 햄버거 메뉴 + 스크롤 스파이 (통합)
- 용도: 상업 사이트 표준 헤더. 스크롤하면 반투명 블러 배경이 생기고, 현재 보이는 섹션의 메뉴가 하이라이트됨.

```html
<header class="site-header" id="siteHeader">
  <nav class="nav container" aria-label="주 메뉴">
    <a href="#" class="nav-logo">Brand</a>
    <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navMenu" aria-label="메뉴 열기">
      <span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span>
    </button>
    <ul class="nav-menu" id="navMenu">
      <li><a href="#features" class="nav-link">기능</a></li>
      <li><a href="#pricing" class="nav-link">가격</a></li>
      <li><a href="#faq" class="nav-link">FAQ</a></li>
      <li><a href="#contact" class="btn btn-primary nav-cta">문의하기</a></li>
    </ul>
  </nav>
</header>
```

```css
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: transparent; transition: background var(--transition), box-shadow var(--transition);
}
.site-header.scrolled {
  background: color-mix(in srgb, var(--surface) 75%, transparent);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  backdrop-filter: saturate(180%) blur(16px);
  box-shadow: var(--shadow);
}
@supports not (backdrop-filter: blur(1px)) { .site-header.scrolled { background: var(--surface); } } /* 폴백 */
.nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; max-width: 1200px; margin: 0 auto; }
.nav-logo { font-weight: 800; font-size: 1.25rem; color: var(--text); text-decoration: none; }
.nav-menu { display: flex; gap: 2rem; align-items: center; list-style: none; margin: 0; padding: 0; }
.nav-link { color: var(--text-muted); text-decoration: none; font-weight: 500; transition: color var(--transition); }
.nav-link:hover, .nav-link.active { color: var(--primary); }
.nav-link.active { font-weight: 700; }
.nav-toggle { display: none; }

@media (max-width: 768px) {
  .nav-toggle { display: flex; flex-direction: column; gap: 5px; background: none; border: 0; cursor: pointer; padding: 8px; }
  .nav-toggle-bar { width: 24px; height: 2px; background: var(--text); transition: transform var(--transition), opacity var(--transition); }
  .nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(2) { opacity: 0; }
  .nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .nav-menu {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: var(--surface); box-shadow: var(--shadow-lg);
    max-height: 0; overflow: hidden; transition: max-height .35s ease;
  }
  .nav-menu.open { max-height: 400px; }
  .nav-menu li { width: 100%; text-align: center; }
  .nav-menu .nav-link { display: block; padding: 1rem; }
}
```

```js
// 1) 스크롤 시 배경
const header = document.getElementById('siteHeader');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });

// 2) 햄버거 토글
const toggle = document.getElementById('navToggle'), menu = document.getElementById('navMenu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
menu.addEventListener('click', e => { // 링크 클릭 시 자동 닫기
  if (e.target.matches('a')) { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', e => { // Esc로 닫기
  if (e.key === 'Escape' && menu.classList.contains('open')) { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
});

// 3) 스크롤 스파이 (IntersectionObserver — scroll 이벤트보다 성능 우수)
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link.active').forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
      link.classList.add('active');
      link.setAttribute('aria-current', 'true');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }); // 화면 중앙 부근 통과 시 활성화
document.querySelectorAll('section[id]').forEach(s => spy.observe(s));
```

- 커스터마이징: 블러 강도는 `blur(16px)`, 투명도는 `color-mix`의 `75%`. 모바일 분기점은 `768px`. 스파이 민감도는 `rootMargin` 비율로 조정.
- 접근성: `aria-expanded`/`aria-controls`/`aria-current` 반영, Esc 닫기, 글래스 배경에서 텍스트 대비 확인 필수(투명도 75% 미만이면 대비 깨지기 쉬움).

---

## 2. 카드 (Cards)

카드 공통 베이스:

```css
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; box-shadow: var(--shadow); }
```

### 호버 리프트 카드
```css
.card-lift { transition: transform var(--transition), box-shadow var(--transition); }
.card-lift:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
/* 카드 전체 클릭 가능 패턴: 카드 안 제목 링크에 ::after 확장 */
.card-lift { position: relative; }
.card-lift h3 a { color: inherit; text-decoration: none; }
.card-lift h3 a::after { content: ""; position: absolute; inset: 0; }
.card-lift:focus-within { outline: 2px solid var(--primary); outline-offset: 2px; }
```

### 글래스 카드
```css
.card-glass {
  background: color-mix(in srgb, var(--surface) 55%, transparent);
  -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  border: 1px solid color-mix(in srgb, var(--surface) 40%, transparent);
  border-radius: var(--radius); padding: 1.5rem;
}
```

### 그라디언트 보더 카드
```css
.card-gradient-border {
  position: relative; background: var(--surface); border-radius: var(--radius); padding: 1.5rem;
  border: 1px solid transparent;
  background: linear-gradient(var(--surface), var(--surface)) padding-box,
              linear-gradient(135deg, var(--primary), #ec4899) border-box; /* 두 번째 색만 교체 */
}
```

### 이미지 줌 카드
```html
<article class="card card-img-zoom" style="padding:0; overflow:hidden;">
  <div class="img-wrap"><img src="photo.jpg" alt="제품 사용 장면" loading="lazy"></div>
  <div style="padding:1.5rem;"><h3>제목</h3><p>설명</p></div>
</article>
```
```css
.card-img-zoom .img-wrap { overflow: hidden; aspect-ratio: 16 / 9; }
.card-img-zoom img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
.card-img-zoom:hover img { transform: scale(1.06); }
```

### 프라이싱 카드 (추천 강조)
```html
<div class="pricing-grid">
  <div class="card pricing-card">
    <h3>Basic</h3><p class="price">₩9,900<span>/월</span></p>
    <ul><li>기능 A</li><li>기능 B</li></ul>
    <a href="#contact" class="btn btn-secondary">시작하기</a>
  </div>
  <div class="card pricing-card featured">
    <p class="pricing-badge">가장 인기</p>
    <h3>Pro</h3><p class="price">₩29,900<span>/월</span></p>
    <ul><li>Basic 전체</li><li>기능 C</li><li>우선 지원</li></ul>
    <a href="#contact" class="btn btn-primary">시작하기</a>
  </div>
</div>
```
```css
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; align-items: center; }
.pricing-card { text-align: center; display: flex; flex-direction: column; gap: 1rem; }
.pricing-card .price { font-size: 2.25rem; font-weight: 800; } .pricing-card .price span { font-size: 1rem; color: var(--text-muted); }
.pricing-card ul { list-style: none; padding: 0; margin: 0; display: grid; gap: .5rem; color: var(--text-muted); }
.pricing-card.featured { position: relative; border: 2px solid var(--primary); transform: scale(1.05); box-shadow: var(--shadow-lg); }
.pricing-badge { position: absolute; top: -14px; left: 50%; translate: -50%; background: var(--primary); color: var(--primary-contrast); padding: .25rem .9rem; border-radius: 999px; font-size: .8rem; font-weight: 700; margin: 0; }
```

- 커스터마이징: 리프트 높이 `-6px`, 줌 배율 `1.06`, 그라디언트 끝색 `#ec4899`, 추천 카드 확대율 `scale(1.05)`(모바일에선 `@media`로 1로 리셋 권장).
- 접근성: 이미지 `alt` 필수, 카드 전체 클릭은 `::after` 확장 패턴 사용(중첩 링크 금지), 글래스 카드 위 텍스트 대비 재확인.

---

## 3. 버튼 (Buttons)

- 용도: 사이트 전역에서 재사용하는 버튼 세트. 모든 상태(hover/active/focus-visible/disabled) 포함.

```html
<button class="btn btn-primary">주 버튼</button>
<button class="btn btn-secondary">보조 버튼</button>
<button class="btn btn-ghost">고스트</button>
<button class="btn btn-gradient">그라디언트</button>
<button class="btn btn-icon" aria-label="검색">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
</button>
<button class="btn btn-primary" disabled>비활성</button>
```

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
  padding: .7rem 1.4rem; border-radius: calc(var(--radius) - 4px);
  font: inherit; font-weight: 600; line-height: 1; cursor: pointer;
  border: 1px solid transparent; text-decoration: none;
  transition: background var(--transition), transform .1s ease, box-shadow var(--transition);
}
.btn:active:not(:disabled) { transform: scale(.97); }
.btn:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; } /* 마우스 클릭 시엔 안 보임 */
.btn:disabled { opacity: .5; cursor: not-allowed; }

.btn-primary { background: var(--primary); color: var(--primary-contrast); }
.btn-primary:hover:not(:disabled) { background: var(--primary-hover); box-shadow: 0 4px 14px color-mix(in srgb, var(--primary) 40%, transparent); }

.btn-secondary { background: var(--surface); color: var(--text); border-color: var(--border); }
.btn-secondary:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }

.btn-ghost { background: transparent; color: var(--primary); }
.btn-ghost:hover:not(:disabled) { background: color-mix(in srgb, var(--primary) 10%, transparent); }

.btn-gradient { background: linear-gradient(135deg, var(--primary), #ec4899); color: #fff; background-size: 150%; }
.btn-gradient:hover:not(:disabled) { background-position: 100%; box-shadow: 0 4px 14px rgb(236 72 153 / .35); }

.btn-icon { padding: .7rem; border-radius: 50%; background: var(--surface); color: var(--text); border-color: var(--border); }
.btn-icon:hover:not(:disabled) { color: var(--primary); border-color: var(--primary); }
```

- 커스터마이징: 크기 변형은 `.btn-lg { padding: .9rem 2rem; font-size: 1.1rem; }` 추가. 라운드는 `border-radius: 999px`로 필(pill) 형태.
- 접근성: `:focus-visible`만 사용(마우스 사용자 방해 없음), 아이콘 버튼은 `aria-label` 필수 + SVG에 `aria-hidden="true"`, disabled 상태도 텍스트 대비 유지 확인.

---

## 4. 폼 (Forms)

### 플로팅 라벨 인풋 + 유효성 검사 스타일
- 용도: 문의/가입 폼의 입력 필드. `placeholder=" "`(공백 1칸) 트릭으로 JS 없이 동작.

```html
<div class="field">
  <input type="email" id="email" name="email" class="input" placeholder=" " required autocomplete="email">
  <label for="email" class="float-label">이메일</label>
  <p class="field-error" aria-live="polite"></p>
</div>
```

```css
.field { position: relative; margin-bottom: 1.25rem; }
.input {
  width: 100%; padding: 1.1rem 1rem .5rem; font: inherit; color: var(--text);
  background: var(--surface); border: 1px solid var(--border); border-radius: calc(var(--radius) - 4px);
  transition: border-color var(--transition), box-shadow var(--transition);
}
.input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent); }
.float-label {
  position: absolute; left: 1rem; top: .85rem; color: var(--text-muted); pointer-events: none;
  transition: all .2s ease; transform-origin: left top;
}
.input:focus + .float-label, .input:not(:placeholder-shown) + .float-label { transform: translateY(-.55rem) scale(.78); color: var(--primary); }
/* 유효성: 사용자가 건드린 뒤에만 표시 — :user-invalid (2026 베이스라인) */
.input:user-invalid { border-color: #dc2626; }
.input:user-invalid + .float-label { color: #dc2626; }
.input:user-valid { border-color: #16a34a; }
.field-error { color: #dc2626; font-size: .85rem; margin: .35rem 0 0; min-height: 1em; }
```

### 뉴스레터 구독 폼
```html
<form class="newsletter" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <label for="nl-email" class="sr-only">이메일 주소</label>
  <input type="email" id="nl-email" name="email" class="input" placeholder="이메일 주소" required style="padding:.8rem 1rem;">
  <button type="submit" class="btn btn-primary">구독하기</button>
</form>
```
```css
.newsletter { display: flex; gap: .5rem; max-width: 440px; }
.newsletter .input { flex: 1; }
@media (max-width: 480px) { .newsletter { flex-direction: column; } }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
```

### 문의 폼 전체 + Formspree 연동 (무료 월 50건)
- 연동법: https://formspree.io 가입 → New Form → 발급된 엔드포인트(`https://formspree.io/f/xxxxxxxx`)를 `action`에 넣으면 끝. 백엔드 불필요. (대안: Web3Forms, Getform)

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
  <div class="field">
    <input type="text" id="cf-name" name="name" class="input" placeholder=" " required autocomplete="name">
    <label for="cf-name" class="float-label">이름</label>
  </div>
  <div class="field">
    <input type="email" id="cf-email" name="email" class="input" placeholder=" " required autocomplete="email">
    <label for="cf-email" class="float-label">이메일</label>
  </div>
  <div class="field">
    <textarea id="cf-msg" name="message" class="input" placeholder=" " rows="5" required></textarea>
    <label for="cf-msg" class="float-label">문의 내용</label>
  </div>
  <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off"> <!-- 스팸 허니팟 -->
  <button type="submit" class="btn btn-primary" id="cfSubmit">보내기</button>
  <p id="cfStatus" role="status" aria-live="polite" style="margin-top:.75rem;"></p>
</form>
```

```js
const cf = document.getElementById('contactForm');
cf.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!cf.reportValidity()) return; // 네이티브 검증 활용
  const btn = document.getElementById('cfSubmit'), status = document.getElementById('cfStatus');
  btn.disabled = true; btn.textContent = '전송 중…';
  try {
    const res = await fetch(cf.action, { method: 'POST', body: new FormData(cf), headers: { 'Accept': 'application/json' } });
    if (res.ok) { status.textContent = '문의가 접수되었습니다. 곧 연락드리겠습니다.'; cf.reset(); }
    else { const data = await res.json(); status.textContent = data.errors?.map(e => e.message).join(', ') || '전송에 실패했습니다. 잠시 후 다시 시도해주세요.'; }
  } catch { status.textContent = '네트워크 오류가 발생했습니다.'; }
  finally { btn.disabled = false; btn.textContent = '보내기'; }
});
```

- 커스터마이징: 에러/성공 색은 `#dc2626`/`#16a34a`를 토큰화(`--danger`, `--success`) 권장. Formspree 대시보드에서 이메일 알림·자동응답·리다이렉트 설정 가능.
- 접근성: 모든 입력에 `<label>` 연결, 상태 메시지는 `role="status"` + `aria-live="polite"`, `:user-invalid`로 첫 로드 시 빨간 테두리 방지, `autocomplete` 속성으로 자동완성 지원.

---

## 5. 인터랙티브 요소 (Interactive)

### 아코디언 FAQ (네이티브 `<details>`)
- 용도: JS 없이 동작하는 FAQ. `name` 속성으로 한 번에 하나만 열림(2026 베이스라인).

```html
<section id="faq" class="faq">
  <details class="faq-item" name="faq">
    <summary>환불 정책은 어떻게 되나요?</summary>
    <div class="faq-body"><p>구매 후 14일 이내 전액 환불이 가능합니다.</p></div>
  </details>
  <details class="faq-item" name="faq">
    <summary>플랜은 언제든 변경할 수 있나요?</summary>
    <div class="faq-body"><p>네, 대시보드에서 즉시 변경되며 일할 계산됩니다.</p></div>
  </details>
</section>
```
```css
.faq-item { border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); margin-bottom: .75rem; }
.faq-item summary {
  padding: 1.1rem 1.25rem; font-weight: 600; cursor: pointer; list-style: none;
  display: flex; justify-content: space-between; align-items: center; border-radius: var(--radius);
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: "+"; font-size: 1.4rem; color: var(--primary); transition: rotate var(--transition); }
.faq-item[open] summary::after { rotate: 45deg; }
.faq-item summary:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.faq-body { padding: 0 1.25rem 1.1rem; color: var(--text-muted); }
/* 부드러운 열림 (2026: 크롬/엣지/사파리 지원, 미지원 브라우저는 즉시 열림으로 우아하게 저하) */
.faq-item::details-content { block-size: 0; overflow: hidden; transition: block-size .3s ease, content-visibility .3s allow-discrete; }
.faq-item[open]::details-content { block-size: auto; block-size: calc-size(auto, size); }
```

### 탭 (Tabs)
```html
<div class="tabs">
  <div role="tablist" aria-label="제품 정보" class="tab-list">
    <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1" class="tab">개요</button>
    <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" class="tab" tabindex="-1">스펙</button>
  </div>
  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" class="tab-panel">개요 내용</div>
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" class="tab-panel" hidden>스펙 내용</div>
</div>
```
```css
.tab-list { display: flex; gap: .25rem; border-bottom: 2px solid var(--border); }
.tab { padding: .7rem 1.2rem; border: 0; background: none; font: inherit; font-weight: 600; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; }
.tab[aria-selected="true"] { color: var(--primary); border-bottom-color: var(--primary); }
.tab:focus-visible { outline: 2px solid var(--primary); outline-offset: -2px; }
.tab-panel { padding: 1.25rem 0; }
```
```js
document.querySelectorAll('[role="tablist"]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const select = (tab) => tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    if (on) t.focus();
  });
  list.addEventListener('click', e => e.target.matches('[role="tab"]') && select(e.target));
  list.addEventListener('keydown', e => { // 화살표 키 이동 (WAI-ARIA 패턴)
    const i = tabs.indexOf(document.activeElement);
    if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length]);
    if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length]);
    if (e.key === 'Home') select(tabs[0]);
    if (e.key === 'End') select(tabs.at(-1));
  });
});
```

### 모달/다이얼로그 (네이티브 `<dialog>`)
- 용도: 포커스 트랩·Esc 닫기·배경 잠금이 내장된 모달. JS는 열기/닫기만.

```html
<button class="btn btn-primary" onclick="document.getElementById('demoModal').showModal()">모달 열기</button>
<dialog id="demoModal" class="modal" aria-labelledby="modalTitle" closedby="any">
  <h2 id="modalTitle">알림</h2>
  <p>내용이 들어갑니다.</p>
  <form method="dialog" style="text-align:right; margin-top:1rem;">
    <button class="btn btn-secondary">닫기</button>
  </form>
</dialog>
```
```css
.modal { border: 0; border-radius: var(--radius); padding: 2rem; max-width: min(480px, 90vw); box-shadow: var(--shadow-lg); background: var(--surface); color: var(--text); }
.modal::backdrop { background: rgb(0 0 0 / .5); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); }
/* 등장 애니메이션 (@starting-style — 2026 베이스라인) */
.modal { opacity: 0; translate: 0 12px; transition: opacity .25s, translate .25s, overlay .25s allow-discrete, display .25s allow-discrete; }
.modal[open] { opacity: 1; translate: 0; }
@starting-style { .modal[open] { opacity: 0; translate: 0 12px; } }
```
`closedby="any"`는 배경 클릭으로도 닫히게 함(2026 신규 속성, 미지원 시 무시됨).

### 토스트 알림 (Toast)
```html
<div id="toastRegion" role="region" aria-label="알림" style="position:fixed; bottom:1.5rem; right:1.5rem; z-index:200; display:grid; gap:.5rem;"></div>
```
```css
.toast {
  background: var(--text); color: var(--bg); padding: .9rem 1.25rem; border-radius: var(--radius);
  box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: .75rem; max-width: 360px;
  animation: toast-in .3s ease;
}
.toast.success { border-left: 4px solid #16a34a; } .toast.error { border-left: 4px solid #dc2626; }
@keyframes toast-in { from { opacity: 0; translate: 0 12px; } }
```
```js
function showToast(message, type = 'success', duration = 3500) {
  const region = document.getElementById('toastRegion');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.setAttribute('role', type === 'error' ? 'alert' : 'status'); // 스크린리더가 자동 낭독
  el.textContent = message;
  region.append(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, duration);
}
// 사용: showToast('저장되었습니다.'); showToast('오류가 발생했습니다.', 'error');
```

### 툴팁 (CSS 전용, 키보드 접근 가능)
```html
<button class="btn btn-icon has-tooltip" data-tooltip="장바구니에 추가" aria-label="장바구니에 추가">🛒</button>
```
```css
.has-tooltip { position: relative; }
.has-tooltip::after {
  content: attr(data-tooltip);
  position: absolute; bottom: calc(100% + 8px); left: 50%; translate: -50%;
  background: var(--text); color: var(--bg); padding: .4rem .7rem; border-radius: 6px;
  font-size: .8rem; white-space: nowrap; pointer-events: none;
  opacity: 0; transition: opacity .2s .15s;
}
.has-tooltip:hover::after, .has-tooltip:focus-visible::after { opacity: 1; }
```

### 이미지 라이트박스 (`<dialog>` 재활용)
```html
<div class="gallery">
  <button class="gallery-thumb" data-full="photo1-large.jpg"><img src="photo1.jpg" alt="갤러리: 사무실 전경" loading="lazy"></button>
  <button class="gallery-thumb" data-full="photo2-large.jpg"><img src="photo2.jpg" alt="갤러리: 팀 미팅" loading="lazy"></button>
</div>
<dialog id="lightbox" class="lightbox" closedby="any" aria-label="이미지 크게 보기">
  <img id="lightboxImg" src="" alt="">
  <form method="dialog"><button class="btn btn-icon" aria-label="닫기" style="position:absolute; top:1rem; right:1rem;">✕</button></form>
</dialog>
```
```css
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
.gallery-thumb { border: 0; padding: 0; cursor: zoom-in; border-radius: var(--radius); overflow: hidden; background: none; }
.gallery-thumb img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; transition: transform .3s; }
.gallery-thumb:hover img { transform: scale(1.05); }
.gallery-thumb:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.lightbox { border: 0; background: transparent; padding: 0; max-width: 90vw; max-height: 90vh; }
.lightbox img { max-width: 90vw; max-height: 90vh; border-radius: var(--radius); display: block; }
.lightbox::backdrop { background: rgb(0 0 0 / .85); }
```
```js
const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-thumb').forEach(t => t.addEventListener('click', () => {
  lbImg.src = t.dataset.full; lbImg.alt = t.querySelector('img').alt; lb.showModal();
}));
```

- 커스터마이징: 토스트 위치(`bottom/right`), 지속시간, 아코디언 아이콘(`+` → SVG 셰브런), 탭 스타일(언더라인 → 필 배경).
- 접근성: `<dialog>`/`<details>` 네이티브 요소 덕에 포커스·키보드 처리 대부분 무료. 탭은 WAI-ARIA 화살표 패턴 구현 완료. 토스트는 `role="status/alert"`로 자동 낭독.

---

## 6. 콘텐츠 표시 (Content Display)

### 후기 캐러셀 (CSS scroll-snap — JS 최소)
```html
<div class="carousel-wrap">
  <ul class="carousel" id="reviewCarousel" aria-label="고객 후기" tabindex="0">
    <li class="card review"><blockquote>"도입 후 매출이 30% 늘었습니다."</blockquote><cite>— 김OO, A사 대표</cite></li>
    <li class="card review"><blockquote>"지원팀 응답이 정말 빠릅니다."</blockquote><cite>— 이OO, B사 마케터</cite></li>
  </ul>
  <button class="btn btn-icon car-btn" data-dir="-1" aria-label="이전 후기">‹</button>
  <button class="btn btn-icon car-btn" data-dir="1" aria-label="다음 후기">›</button>
</div>
```
```css
.carousel { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; padding: .5rem; list-style: none; margin: 0; scrollbar-width: none; }
.carousel::-webkit-scrollbar { display: none; }
.review { flex: 0 0 min(340px, 85%); scroll-snap-align: center; }
.review blockquote { margin: 0 0 .75rem; font-size: 1.05rem; }
.review cite { color: var(--text-muted); font-style: normal; font-size: .9rem; }
.carousel:focus-visible { outline: 2px solid var(--primary); border-radius: var(--radius); }
```
```js
const car = document.getElementById('reviewCarousel');
document.querySelectorAll('.car-btn').forEach(b => b.addEventListener('click', () =>
  car.scrollBy({ left: b.dataset.dir * (car.firstElementChild.offsetWidth + 16), behavior: 'smooth' })));
```

### 통계 카운터 섹션 (스크롤 진입 시 카운트업)
```html
<div class="stats">
  <div class="stat"><span class="stat-num" data-target="12000" data-suffix="+">0</span><span class="stat-label">누적 고객</span></div>
  <div class="stat"><span class="stat-num" data-target="99.9" data-suffix="%">0</span><span class="stat-label">가동률</span></div>
</div>
```
```css
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 2rem; text-align: center; }
.stat-num { display: block; font-size: 2.5rem; font-weight: 800; color: var(--primary); font-variant-numeric: tabular-nums; }
.stat-label { color: var(--text-muted); }
```
```js
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const counterObs = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const el = entry.target, target = parseFloat(el.dataset.target), suffix = el.dataset.suffix || '';
  const decimals = (el.dataset.target.split('.')[1] || '').length;
  if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; obs.unobserve(el); return; }
  const t0 = performance.now(), dur = 1500;
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
  obs.unobserve(el);
}), { threshold: .5 });
document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));
```

### 타임라인
```html
<ol class="timeline">
  <li class="tl-item"><span class="tl-date">2024</span><h3>회사 설립</h3><p>3명의 팀으로 시작</p></li>
  <li class="tl-item"><span class="tl-date">2026</span><h3>글로벌 진출</h3><p>일본·동남아 서비스 오픈</p></li>
</ol>
```
```css
.timeline { list-style: none; padding: 0; margin: 0; position: relative; }
.timeline::before { content: ""; position: absolute; left: 8px; top: 4px; bottom: 4px; width: 2px; background: var(--border); }
.tl-item { position: relative; padding: 0 0 2rem 2.25rem; }
.tl-item::before {
  content: ""; position: absolute; left: 0; top: 4px; width: 18px; height: 18px;
  border-radius: 50%; background: var(--surface); border: 3px solid var(--primary);
}
.tl-date { font-size: .85rem; font-weight: 700; color: var(--primary); }
.tl-item h3 { margin: .25rem 0; } .tl-item p { margin: 0; color: var(--text-muted); }
```

### 비교표 (모바일 가로 스크롤)
```html
<div class="table-wrap" role="region" aria-label="플랜 비교" tabindex="0">
  <table class="compare">
    <caption class="sr-only">플랜별 기능 비교표</caption>
    <thead><tr><th scope="col">기능</th><th scope="col">Basic</th><th scope="col" class="highlight">Pro</th></tr></thead>
    <tbody>
      <tr><th scope="row">프로젝트 수</th><td>3개</td><td class="highlight">무제한</td></tr>
      <tr><th scope="row">우선 지원</th><td aria-label="미제공">—</td><td class="highlight" aria-label="제공">✓</td></tr>
    </tbody>
  </table>
</div>
```
```css
.table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius); }
.compare { width: 100%; min-width: 480px; border-collapse: collapse; background: var(--surface); }
.compare th, .compare td { padding: .9rem 1.1rem; text-align: left; border-bottom: 1px solid var(--border); }
.compare thead th { background: var(--bg); font-weight: 700; }
.compare tbody tr:last-child > * { border-bottom: 0; }
.compare .highlight { background: color-mix(in srgb, var(--primary) 7%, var(--surface)); }
```

### 뱃지/칩
```html
<span class="badge">NEW</span>
<span class="badge badge-outline">Beta</span>
<span class="badge badge-soft">할인 중</span>
```
```css
.badge { display: inline-flex; align-items: center; gap: .3em; padding: .25em .75em; border-radius: 999px; font-size: .78rem; font-weight: 700; background: var(--primary); color: var(--primary-contrast); }
.badge-outline { background: transparent; color: var(--primary); border: 1px solid var(--primary); }
.badge-soft { background: color-mix(in srgb, var(--primary) 12%, var(--surface)); color: var(--primary); }
```

- 커스터마이징: 캐러셀 카드 폭 `min(340px, 85%)`, 카운터 지속시간 `dur`, 타임라인 점 크기/색, 비교표 하이라이트 열.
- 접근성: 캐러셀은 키보드 스크롤 가능(`tabindex="0"`) + 버튼 라벨, 카운터는 reduced-motion 시 즉시 표시, 표는 `scope`/`caption` 지정, ✓/— 기호에 `aria-label`.

---

## 7. 다크모드 (Dark Mode)

- 용도: 시스템 설정 감지 + 수동 토글 + localStorage 저장 + 첫 로드 깜빡임(FOUC) 방지 완성 패턴.

**1) `<head>` 최상단(스타일시트보다 먼저)에 인라인 스크립트** — 첫 페인트 전에 동기 실행되어 깜빡임을 막는 핵심:

```html
<script>
  (function () {
    try {
      var saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
      var theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.dataset.theme = theme;
    } catch (e) { document.documentElement.dataset.theme = 'light'; }
  })();
</script>
```

**2) CSS — 토큰만 재정의하면 전 컴포넌트가 자동 대응:**

```css
:root { color-scheme: light dark; } /* 스크롤바·폼 컨트롤도 테마 따라감 */
[data-theme="dark"] {
  --primary: #818cf8;          /* 다크에선 한 단계 밝게 (대비 유지) */
  --primary-hover: #a5b4fc;
  --primary-contrast: #1e1b4b;
  --surface: #1e293b;
  --bg: #0f172a;
  --text: #f1f5f9;
  --text-muted: #94a3b8;
  --border: #334155;
  --shadow: 0 1px 3px rgb(0 0 0 / .4), 0 4px 12px rgb(0 0 0 / .3);
  --shadow-lg: 0 8px 30px rgb(0 0 0 / .5);
}
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }
body { background: var(--bg); color: var(--text); transition: background .3s, color .3s; }
```

**3) 토글 버튼 + JS:**

```html
<button class="btn btn-icon" id="themeToggle" aria-label="다크모드 전환" aria-pressed="false">
  <span class="icon-sun" aria-hidden="true">☀️</span><span class="icon-moon" aria-hidden="true">🌙</span>
</button>
```
```css
[data-theme="dark"] .icon-sun, [data-theme="light"] .icon-moon { display: none; }
```
```js
const themeToggle = document.getElementById('themeToggle');
const syncPressed = () => themeToggle.setAttribute('aria-pressed', document.documentElement.dataset.theme === 'dark');
syncPressed();
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncPressed();
});
// 시스템 설정 변경 감지 — 사용자가 수동 선택한 적 없을 때만 따라감
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) { document.documentElement.dataset.theme = e.matches ? 'dark' : 'light'; syncPressed(); }
});
```

- 커스터마이징: 다크 팔레트만 교체하면 됨. 이미지가 너무 밝으면 `[data-theme="dark"] img { filter: brightness(.9); }`.
- 접근성: 다크에서 primary를 밝게 조정해 대비 유지(어두운 배경에 진한 보라 #4f46e5는 대비 미달), `aria-pressed`로 상태 전달, `color-scheme`으로 네이티브 UI 일치. 원칙: 시스템 설정 변경이 사용자의 명시적 선택을 덮어쓰지 않게 함.

---

## 8. 접근성 필수사항 (Accessibility Checklist)

위 레시피에 이미 반영된 사항들 — 새 컴포넌트를 만들 때도 이 기준을 적용:

```css
/* 전역 포커스 스타일 — 키보드 사용자에게만 표시 */
:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
:focus:not(:focus-visible) { outline: none; }

/* 스킵 링크 — body 첫 요소로 넣기: <a href="#main" class="skip-link">본문 바로가기</a> */
.skip-link { position: absolute; top: -100%; left: 1rem; background: var(--primary); color: var(--primary-contrast); padding: .6rem 1rem; border-radius: 0 0 8px 8px; z-index: 999; }
.skip-link:focus { top: 0; }
```

체크리스트:
- [ ] **명도 대비**: 본문 텍스트 4.5:1 이상, 큰 텍스트(24px+/굵은 19px+) 3:1 이상. 검증: Chrome DevTools 색상 피커 또는 https://webaim.org/resources/contrastchecker/
- [ ] **키보드**: 모든 인터랙션이 Tab/Enter/Space/화살표/Esc로 가능한지 마우스 없이 한 바퀴 테스트
- [ ] **터치 타깃**: 버튼/링크 최소 44×44px (모바일)
- [ ] **aria 최소 원칙**: 네이티브 요소(`<button>`, `<dialog>`, `<details>`)를 먼저 쓰고, aria는 그걸로 안 될 때만. `div onclick` 금지
- [ ] **이미지**: 의미 있는 이미지는 `alt` 서술, 장식용은 `alt=""`, 아이콘 SVG는 `aria-hidden="true"`
- [ ] **모션**: `prefers-reduced-motion` 대응 (섹션 0의 전역 규칙으로 처리됨)
- [ ] **랜드마크**: `<header>` `<nav>` `<main>` `<footer>` 사용, `<h1>`은 페이지당 1개, 헤딩 레벨 건너뛰기 금지
- [ ] **동적 콘텐츠**: 토스트/폼 결과는 `aria-live` 영역으로 알림
- [ ] **`lang="ko"`**: `<html lang="ko">` 지정 (스크린리더 발음 결정)

---

## 9. 무료 컴포넌트 소스 활용법

| 소스 | 특징 | 순수 HTML/CSS로 가져오는 법 |
|---|---|---|
| **uiverse.io** | MIT 라이선스, 순수 HTML/CSS 버튼·카드·로더 수천 개 | 그대로 복사 가능. 색상 하드코딩만 이 문서의 토큰으로 치환 |
| **CodePen** | 검색: `glassmorphism card`, `pricing table` 등 | 라이선스 확인(기본 MIT) 후 복사. `trending`보다 `most hearted` 정렬이 품질 좋음 |
| **daisyUI** | Tailwind 기반이지만 [테마 색상 시스템](https://daisyui.com)이 참고 가치 높음 | 컴포넌트 구조(HTML 마크업 패턴)만 차용하고 CSS는 직접 작성 |
| **shadcn/ui** | React 전용이나 디자인·간격·상태 처리 레퍼런스로 최상급 | ui.shadcn.com에서 렌더 결과를 보고 CSS로 재현. Radix 기반이라 aria 패턴 참고에 특히 유용 |
| **Tailwind UI (Plus) 무료분** | tailwindcss.com/plus 의 무료 미리보기 컴포넌트 | 마크업 구조와 반응형 분기점 참고용 |
| **Heroicons / Lucide** | MIT 아이콘. SVG 인라인 복사 | `stroke="currentColor"`라 버튼 색을 자동 상속 — 위 아이콘 버튼 레시피와 호환 |

활용 원칙: **마크업 구조와 aria 패턴은 빌리고, 색·간격·라운드는 반드시 이 문서의 CSS 변수로 치환**해야 사이트 전체 통일감이 유지된다.
