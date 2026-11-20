# 상업 홈페이지/랜딩페이지 애니메이션 효과 카탈로그 (2026)

> Claude Code 스킬 레퍼런스. 각 효과는 **복사하면 바로 작동하는 코드**로 수록.
> 원칙: ① 의존성 없는 순수 CSS/JS 우선 ② GSAP은 정말 필요할 때만(CDN 포함 완성 코드 제공) ③ 모든 애니메이션에 `prefers-reduced-motion` 대응 (§7 참조).
>
> 2026 기준 지원 현황 요약:
> - **CSS scroll-driven animations** (`animation-timeline: view()/scroll()`): Chrome/Edge/Safari 지원, Firefox는 플래그 뒤 → 반드시 `@supports` 폴백 또는 IntersectionObserver 병행.
> - **View Transitions API**: same-document는 전 주요 브라우저, cross-document(MPA)는 Chrome 126+/Safari 18.2+ → 점진적 향상으로 사용.
> - **GSAP**: 2025년부터 전 플러그인(ScrollTrigger, SplitText 등) 무료. CDN: `cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/`.

---

## 1. 스크롤 애니메이션 (Scroll Animations)

### 1-1. 스크롤 리빌 — IntersectionObserver 버전 (표준 채택안)
- 용도: 섹션/카드가 뷰포트 진입 시 fade-up 등장. 상업 사이트의 기본기. **모든 브라우저에서 동작하므로 기본값으로 이것을 쓴다.**
- 난이도: ⭐

```html
<section class="reveal">뷰포트에 들어오면 나타납니다</section>
<section class="reveal">두 번째 섹션</section>

<style>
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
</style>

<script>
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target); // 1회만 실행 (재등장 원하면 이 줄 삭제 + else에서 remove)
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
</script>
```
- 주의: JS 미로딩 시 콘텐츠가 안 보이는 사고 방지 → `<html class="js">`를 스크립트로 붙이고 `.js .reveal`에만 초기 숨김을 걸거나, 위처럼 reduced-motion 폴백을 반드시 포함. `threshold`를 0.5 이상으로 올리면 키 큰 섹션이 영영 안 나타날 수 있음.

### 1-2. 스크롤 리빌 — CSS 단독 최신 버전 (`animation-timeline: view()`)
- 용도: JS 0줄로 같은 효과. Chrome/Edge/Safari 타깃 프로젝트나 점진적 향상용.
- 난이도: ⭐

```html
<div class="card-sd">CSS만으로 등장하는 카드</div>

<style>
@supports (animation-timeline: view()) {
  .card-sd {
    animation: sd-fade-up linear both;
    animation-timeline: view();          /* 이 요소의 뷰포트 통과 진행도가 타임라인 */
    animation-range: entry 0% entry 60%; /* 진입 시작~진입 60% 구간에서 재생 */
  }
}
@keyframes sd-fade-up {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) { .card-sd { animation: none; } }
</style>
```
- 주의: Firefox 미지원(2026 현재 플래그 뒤) → 반드시 `@supports`로 감싸서 미지원 시 "그냥 보이는" 상태가 기본이 되게 할 것. `animation-range: entry`/`cover`/`contain` 구간 개념을 혼동하기 쉬움: `entry`는 요소가 뷰포트에 들어오는 동안, `cover`는 통과 전체.

### 1-3. 스태거 (Stagger, 순차 등장)
- 용도: 카드 그리드·리스트·내비 항목이 도미노처럼 순차 등장. 1-1의 확장.
- 난이도: ⭐

```html
<ul class="stagger reveal">
  <li>기능 1</li><li>기능 2</li><li>기능 3</li><li>기능 4</li>
</ul>

<style>
.stagger > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 90ms); /* 항목당 90ms 간격 */
}
.stagger.is-visible > * { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .stagger > * { opacity: 1; transform: none; transition: none; }
}
</style>

<script>
/* 1-1의 IntersectionObserver 코드를 그대로 재사용. 인덱스만 주입: */
document.querySelectorAll('.stagger').forEach((group) => {
  [...group.children].forEach((child, i) => child.style.setProperty('--i', i));
});
</script>
```
- 주의: 항목이 12개를 넘으면 총 지연이 1초 이상으로 늘어져 답답함 → `min(var(--i), 8)`로 상한을 두거나 간격을 60ms로. `sibling-index()`는 아직 범용적이지 않으니 인라인 `--i` 주입이 안전.

### 1-4. 패럴랙스 (Parallax)
- 용도: 히어로 배경/장식 이미지가 스크롤보다 느리게 움직여 깊이감 연출.
- 난이도: ⭐⭐

```html
<section class="hero-parallax">
  <img class="parallax-bg" src="bg.jpg" alt="">
  <h1>전경 콘텐츠</h1>
</section>

<style>
.hero-parallax { position: relative; height: 90vh; overflow: hidden; display: grid; place-items: center; }
.parallax-bg {
  position: absolute; inset: -20% 0;          /* 이동 여유분 확보 */
  width: 100%; height: 140%; object-fit: cover; z-index: -1;
}
/* CSS 단독 (지원 브라우저) */
@supports (animation-timeline: view()) {
  .parallax-bg {
    animation: parallax linear both;
    animation-timeline: view();
  }
}
@keyframes parallax {
  from { transform: translateY(-10%); }
  to   { transform: translateY(10%); }
}
@media (prefers-reduced-motion: reduce) { .parallax-bg { animation: none; transform: none; } }
</style>

<script>
/* JS 폴백 (Firefox 등) — rAF 기반, 저사양에서도 부드러움 */
if (!CSS.supports('animation-timeline: view()')) {
  const bg = document.querySelector('.parallax-bg');
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const r = bg.parentElement.getBoundingClientRect();
      const progress = 1 - (r.bottom / (innerHeight + r.height)); // 0~1
      bg.style.transform = `translateY(${(progress - 0.5) * 20}%)`;
      ticking = false;
    });
  }, { passive: true });
}
</script>
```
- 주의: `background-attachment: fixed`는 모바일 Safari에서 깨지므로 금지. 이동은 반드시 `transform`으로. 패럴랙스 요소가 많으면 모바일에서 프레임 드랍 → 데스크톱 한정(`@media (pointer: fine)`)도 고려.

### 1-5. 스크롤 진행바 (Scroll Progress Bar)
- 용도: 블로그/긴 랜딩 상단에 읽기 진행도 표시.
- 난이도: ⭐

```html
<div class="progress-bar" aria-hidden="true"></div>

<style>
.progress-bar {
  position: fixed; top: 0; left: 0; z-index: 999;
  width: 100%; height: 4px;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  transform-origin: 0 50%;
  transform: scaleX(0);
}
/* CSS 단독 — 문서 스크롤 진행도를 그대로 타임라인으로 */
@supports (animation-timeline: scroll()) {
  .progress-bar { animation: grow linear both; animation-timeline: scroll(root); }
}
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
</style>

<script>
if (!CSS.supports('animation-timeline: scroll()')) {
  const bar = document.querySelector('.progress-bar');
  addEventListener('scroll', () => {
    const h = document.documentElement;
    bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight)})`;
  }, { passive: true });
}
</script>
```
- 주의: `width`가 아닌 `transform: scaleX`로 애니메이션할 것(리플로우 방지). 장식 요소이므로 `aria-hidden="true"`.

### 1-6. 숫자 카운트업 (Count-up)
- 용도: "고객 12,000+", "만족도 98%" 등 지표 섹션. 신뢰 지표 강조에 필수급.
- 난이도: ⭐⭐

```html
<p><span class="countup" data-target="12000" data-suffix="+">0</span> 명의 고객</p>
<p>만족도 <span class="countup" data-target="98" data-suffix="%">0</span></p>

<script>
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
function countUp(el, duration = 1600) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * easeOut(p)).toLocaleString('ko-KR') + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target.toLocaleString('ko-KR') + suffix; // 즉시 최종값
    return;
  }
  requestAnimationFrame(frame);
}
const ioCount = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { countUp(e.target); ioCount.unobserve(e.target); }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.countup').forEach((el) => ioCount.observe(el));
</script>
```
- 주의: 숫자 폭 변동으로 레이아웃이 덜컹임 → 해당 텍스트에 `font-variant-numeric: tabular-nums` 적용. 소수점 지표(4.9점)는 `Math.round` 대신 `(target * p).toFixed(1)`.

### 1-7. 핀 고정 섹션 (Pinned Section) — GSAP ScrollTrigger
- 용도: 스크롤하는 동안 섹션을 화면에 고정하고 내부 콘텐츠를 단계별 전환(제품 기능 워크스루). 순수 CSS(`position: sticky`)로 어려운 정밀 제어가 필요할 때.
- 난이도: ⭐⭐⭐

```html
<section class="pin-section">
  <div class="pin-content">
    <div class="step" data-step>1단계: 가입</div>
    <div class="step" data-step>2단계: 연동</div>
    <div class="step" data-step>3단계: 완료</div>
  </div>
</section>
<section style="height:100vh">다음 섹션</section>

<style>
.pin-section { height: 100vh; display: grid; place-items: center; background: #0f172a; color: #fff; }
.pin-content { position: relative; font-size: 2.5rem; }
.step { position: absolute; inset: 0; display: grid; place-items: center; opacity: 0; white-space: nowrap; }
.step:first-child { opacity: 1; }
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger);
const steps = gsap.utils.toArray('[data-step]');
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.pin-section',
    start: 'top top',
    end: '+=200%',      // 뷰포트 2배 높이만큼 스크롤하는 동안 고정
    pin: true,
    scrub: 0.5,         // 스크롤에 부드럽게 동기화
    // markers: true,   // 디버그 시 주석 해제
  },
});
steps.forEach((step, i) => {
  if (i === 0) return;
  tl.to(steps[i - 1], { opacity: 0, y: -40, duration: 1 })
    .to(step, { opacity: 1, y: 0, duration: 1 }, '<0.2');
});
/* 접근성: 모션 최소화 시 ScrollTrigger 비활성 */
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.set('[data-step]', { opacity: 1, position: 'static' });
}
</script>
```
- 주의: `pin: true`는 레이아웃에 spacer를 삽입하므로 부모에 `overflow: hidden`이 있으면 깨짐. 리사이즈/폰트 로딩 후 위치 틀어지면 `ScrollTrigger.refresh()` 호출. 단순 고정이면 GSAP 없이 `position: sticky; top: 0` + 1-2의 `view()` 조합을 먼저 검토.

---

## 2. 히어로 연출 (Hero)

### 2-1. 텍스트 스플릿 등장 (글자/단어별)
- 용도: 히어로 헤드라인이 단어(또는 글자) 단위로 차례로 떠오르는 인트로. 첫인상 결정타.
- 난이도: ⭐⭐

```html
<h1 class="split" data-split="word">비즈니스를 다음 단계로</h1>

<style>
.split .chunk {
  display: inline-block;
  opacity: 0;
  transform: translateY(1em) rotate(4deg);
  animation: chunk-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i) * 70ms);
}
@keyframes chunk-in { to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .split .chunk { animation: none; opacity: 1; transform: none; }
}
</style>

<script>
document.querySelectorAll('.split').forEach((el) => {
  const mode = el.dataset.split === 'char' ? '' : ' ';
  const parts = el.textContent.trim().split(mode);
  el.setAttribute('aria-label', el.textContent.trim()); // 스크린리더용 원문
  el.innerHTML = parts.map((p, i) =>
    `<span class="chunk" aria-hidden="true" style="--i:${i}">${p === ' ' ? '&nbsp;' : p}</span>`
  ).join(mode === ' ' ? ' ' : '');
});
</script>
```
- 주의: 한국어는 **글자(char) 단위 분할 시 자연스럽지만, 영문은 단어 단위**가 무난. `aria-label` + `aria-hidden` 처리 없으면 스크린리더가 한 글자씩 읽음. GSAP SplitText(무료화됨)를 쓰면 줄바꿈 대응 등이 더 견고.

### 2-2. 타이핑 효과 (Typewriter)
- 용도: 히어로 서브카피에서 여러 타깃 키워드 순환("디자이너를 위한 / 개발자를 위한 …").
- 난이도: ⭐⭐

```html
<h2>모든 <span class="typing" data-words='["스타트업","크리에이터","팀"]'></span>을 위한 도구</h2>

<style>
.typing { color: #6366f1; border-right: 2px solid currentColor; padding-right: 2px; }
@media (prefers-reduced-motion: no-preference) {
  .typing { animation: caret 0.9s steps(1) infinite; }
}
@keyframes caret { 50% { border-color: transparent; } }
</style>

<script>
document.querySelectorAll('.typing').forEach((el) => {
  const words = JSON.parse(el.dataset.words);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = words[0]; return;
  }
  let w = 0, i = 0, deleting = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    let delay = deleting ? 45 : 110;
    if (!deleting && i === word.length) { delay = 1800; deleting = true; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
    i += deleting ? -1 : 1;
    setTimeout(tick, delay);
  })();
});
</script>
```
- 주의: 단어 길이 차이로 뒤 텍스트가 밀림 → 부모에 `display:inline-block; min-width:` 최장 단어 폭 지정 권장. SEO 핵심 카피는 타이핑 대상에 넣지 말 것(초기 HTML에 비어 있음).

### 2-3. 그라디언트 애니메이션 배경
- 용도: 히어로 배경이 은은하게 색을 순환. SaaS 랜딩 단골.
- 난이도: ⭐

```html
<section class="hero-gradient"><h1>Hero</h1></section>

<style>
.hero-gradient {
  min-height: 90vh; display: grid; place-items: center; color: #fff;
  background: linear-gradient(120deg, #4f46e5, #9333ea, #db2777, #4f46e5);
  background-size: 300% 300%;
  animation: gradient-shift 14s ease infinite;
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@media (prefers-reduced-motion: reduce) { .hero-gradient { animation: none; } }
</style>
```
- 주의: `background-position` 애니메이션은 페인트 비용이 있으나 단일 히어로 1개 수준에선 문제없음. 텍스트 대비(WCAG 4.5:1)가 그라디언트 전 구간에서 유지되는지 확인. 텍스트 자체에 그라디언트를 입히려면 §6-2의 `@property` 기법 사용.

### 2-4. 블롭/오브 배경 (Blob / Orb)
- 용도: 흐릿한 빛덩어리가 부유하는 모던 배경. 글래스모피즘과 궁합.
- 난이도: ⭐⭐

```html
<section class="hero-orbs">
  <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
  <h1>콘텐츠</h1>
</section>

<style>
.hero-orbs { position: relative; min-height: 90vh; overflow: hidden; background: #0b1020; color: #fff; display: grid; place-items: center; }
.orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.55;
  animation: float 18s ease-in-out infinite alternate;
  will-change: transform;
}
.orb-1 { width: 480px; height: 480px; background: #6366f1; top: -10%; left: -5%; }
.orb-2 { width: 380px; height: 380px; background: #ec4899; bottom: -15%; right: 0; animation-delay: -6s; }
.orb-3 { width: 300px; height: 300px; background: #06b6d4; top: 40%; left: 55%; animation-delay: -12s; }
@keyframes float {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(60px, -50px) scale(1.15); }
}
@media (prefers-reduced-motion: reduce) { .orb { animation: none; } }
</style>
```
- 주의: `blur()` 값이 크고 오브가 많으면 GPU 부담 → 모바일에선 `blur(50px)` 이하 + 오브 2개로 축소(`@media (max-width: 640px)`). 애니메이션은 `transform`만 (blur 값 자체를 애니메이션하지 말 것).

### 2-5. 마우스 따라다니는 글로우 (Cursor Glow)
- 용도: 히어로/카드 위에서 커서 주변이 은은하게 빛남. 인터랙티브한 인상.
- 난이도: ⭐⭐

```html
<section class="glow-area"><h1>마우스를 움직여 보세요</h1></section>

<style>
.glow-area {
  position: relative; min-height: 80vh; background: #0b1020; color: #fff;
  display: grid; place-items: center; overflow: hidden;
}
.glow-area::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%),
              rgba(99, 102, 241, 0.25), transparent 60%);
}
</style>

<script>
const area = document.querySelector('.glow-area');
area.addEventListener('pointermove', (e) => {
  const r = area.getBoundingClientRect();
  area.style.setProperty('--mx', `${e.clientX - r.left}px`);
  area.style.setProperty('--my', `${e.clientY - r.top}px`);
});
</script>
```
- 주의: 터치 기기에선 의미 없음 → 문제는 없지만 굳이 살리려 하지 말 것. 여러 카드에 적용할 땐 이벤트를 부모 한 곳에 위임하고 카드별 CSS 변수만 갱신.

### 2-6. 비디오 배경 처리
- 용도: 브랜드 무드 전달용 풀스크린 배경 영상.
- 난이도: ⭐⭐

```html
<section class="hero-video">
  <video class="bg-video" autoplay muted loop playsinline
         poster="poster.jpg" preload="metadata">
    <source src="hero.webm" type="video/webm">
    <source src="hero.mp4" type="video/mp4">
  </video>
  <div class="video-overlay"></div>
  <h1>헤드라인</h1>
</section>

<style>
.hero-video { position: relative; min-height: 90vh; display: grid; place-items: center; color: #fff; overflow: hidden; }
.bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; }
.video-overlay { position: absolute; inset: 0; background: rgba(10, 12, 24, 0.55); z-index: -1; } /* 텍스트 대비 확보 */
</style>

<script>
/* 데이터 절약·모션 최소화 사용자는 포스터만 표시 */
const v = document.querySelector('.bg-video');
if (matchMedia('(prefers-reduced-motion: reduce)').matches ||
    navigator.connection?.saveData) {
  v.removeAttribute('autoplay'); v.pause(); v.removeAttribute('loop');
}
/* 화면 밖에서는 재생 정지 (배터리 절약) */
new IntersectionObserver(([e]) => {
  e.isIntersecting ? v.play().catch(() => {}) : v.pause();
}).observe(v);
</script>
```
- 주의: **`muted` + `playsinline` 없으면 모바일 자동재생 불가.** 파일은 10초 내외·1080p 이하·2~4MB 목표(웹 최적화 인코딩). 반드시 오버레이로 텍스트 대비 확보. 오디오 있는 영상은 배경으로 쓰지 말 것.

---

## 3. 마이크로 인터랙션 (Micro-interactions)

### 3-1. 버튼 호버 3종 (스케일+그림자 / 샤인 스윕 / 자석)
- 용도: CTA 버튼 강조. 스케일+그림자는 기본기, 샤인은 프리미엄 느낌, 자석은 포트폴리오/크리에이티브 사이트용.
- 난이도: ⭐(스케일)~⭐⭐(자석)

```html
<button class="btn btn-lift">시작하기</button>
<button class="btn btn-shine">프리미엄 구매</button>
<button class="btn btn-magnet">문의하기</button>

<style>
.btn {
  padding: 0.9em 2em; border: 0; border-radius: 999px; cursor: pointer;
  background: #6366f1; color: #fff; font-size: 1rem; position: relative; overflow: hidden;
}
/* ① 스케일 + 그림자 */
.btn-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.btn-lift:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 10px 24px rgba(99, 102, 241, 0.45); }
.btn-lift:active { transform: translateY(0) scale(0.98); }

/* ② 샤인 스윕 */
.btn-shine::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%);
  transform: translateX(-120%);
  transition: transform 0.6s ease;
}
.btn-shine:hover::after { transform: translateX(120%); }

/* ③ 자석 (JS 필요) */
.btn-magnet { transition: transform 0.2s ease-out; will-change: transform; }
@media (prefers-reduced-motion: reduce) {
  .btn-lift, .btn-magnet { transition: none; }
  .btn-shine::after { display: none; }
}
</style>

<script>
document.querySelectorAll('.btn-magnet').forEach((btn) => {
  const strength = 0.35;
  btn.addEventListener('pointermove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });
  btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
});
</script>
```
- 주의: 호버 효과는 전부 `@media (hover: hover)` 안에 넣으면 터치 기기의 끈적임(sticky hover)을 막을 수 있음. 자석 strength는 0.3~0.4가 한계 — 그 이상이면 클릭 타깃이 도망다니는 UX 사고.

### 3-2. 카드 3D 틸트 (Tilt)
- 용도: 제품/기능 카드에 마우스 방향으로 기우는 입체감.
- 난이도: ⭐⭐

```html
<div class="tilt-card"><h3>3D 카드</h3><p>마우스를 올려 보세요</p></div>

<style>
.tilt-card {
  width: 300px; padding: 2rem; border-radius: 16px;
  background: linear-gradient(145deg, #1e293b, #0f172a); color: #fff;
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) { .tilt-card { transition: none; } }
</style>

<script>
document.querySelectorAll('.tilt-card').forEach((card) => {
  const max = 10; // 최대 기울기(deg)
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;  // -0.5 ~ 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform =
      `perspective(800px) rotateY(${px * max * 2}deg) rotateX(${py * -max * 2}deg) scale(1.02)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
</script>
```
- 주의: 최대 기울기 10~12deg 초과 시 촌스러워짐. 카드 내부에 `transform: translateZ(30px)`를 주면 콘텐츠가 떠 보이는 고급 효과. 카드가 많은 그리드에선 pointermove 연산을 rAF로 스로틀.

### 3-3. 링크 언더라인 애니메이션
- 용도: 내비게이션/본문 링크 호버 시 밑줄이 좌→우로 그려짐.
- 난이도: ⭐

```html
<a class="link-underline" href="#">자세히 보기</a>

<style>
.link-underline {
  color: inherit; text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 2px;
  background-position: 0 100%;   /* 왼쪽에서 시작 */
  background-repeat: no-repeat;
  transition: background-size 0.3s ease;
  padding-bottom: 2px;
}
.link-underline:hover, .link-underline:focus-visible { background-size: 100% 2px; }
/* 변형: 나갈 때 오른쪽으로 사라지게 하려면
   기본 background-position: 100% 100%; hover 시 0 100%로 교체 */
</style>
```
- 주의: `background-size` 트랜지션은 합성 레이어가 아니지만 밑줄 1개 수준에선 무해. 멀티라인 링크에서도 자연스럽게 동작하는 것이 이 기법의 장점(가상요소 방식은 멀티라인 불가).

### 3-4. 리플 효과 (Ripple)
- 용도: 클릭 지점에서 물결 확산. 머티리얼 계열·앱형 UI 버튼.
- 난이도: ⭐⭐

```html
<button class="btn-ripple">클릭해 보세요</button>

<style>
.btn-ripple {
  position: relative; overflow: hidden;
  padding: 0.9em 2em; border: 0; border-radius: 12px;
  background: #0ea5e9; color: #fff; font-size: 1rem; cursor: pointer;
}
.ripple {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  animation: ripple 0.6s ease-out forwards;
}
@keyframes ripple { to { transform: scale(4); opacity: 0; } }
</style>

<script>
document.querySelectorAll('.btn-ripple').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = btn.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.cssText =
      `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    btn.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  });
});
</script>
```
- 주의: `animationend`에서 DOM 정리를 잊으면 span이 누적됨. 키보드 활성화(Enter)의 `clientX`는 0이므로 필요 시 중앙 좌표로 폴백 처리.

---

## 4. 연속 흐름 (Continuous Motion)

### 4-1. 무한 마퀴 — 로고 슬라이더 (Infinite Marquee)
- 용도: "이런 기업들이 사용합니다" 고객사 로고 벨트. 신뢰 섹션 표준.
- 난이도: ⭐⭐

```html
<div class="marquee" aria-label="고객사 로고">
  <div class="marquee-track">
    <!-- 원본 세트 -->
    <img src="logo1.svg" alt="회사1"><img src="logo2.svg" alt="회사2">
    <img src="logo3.svg" alt="회사3"><img src="logo4.svg" alt="회사4">
    <!-- 복제 세트 (aria-hidden 필수) -->
    <img src="logo1.svg" alt="" aria-hidden="true"><img src="logo2.svg" alt="" aria-hidden="true">
    <img src="logo3.svg" alt="" aria-hidden="true"><img src="logo4.svg" alt="" aria-hidden="true">
  </div>
</div>

<style>
.marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); /* 양끝 페이드 */
}
.marquee-track {
  display: flex; gap: 4rem; width: max-content;
  animation: marquee 28s linear infinite;
}
.marquee-track img { height: 40px; opacity: 0.7; }
.marquee:hover .marquee-track { animation-play-state: paused; } /* 호버 시 정지 */
@keyframes marquee { to { transform: translateX(calc(-50% - 2rem)); } } /* 절반(원본 세트 폭 + gap/2)만큼 이동 */
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; }
}
</style>
```
- 주의: **콘텐츠를 정확히 2배 복제하고 -50% 이동해야 이음새가 안 보임.** gap을 쓰면 `calc(-50% - gap/2)`로 보정. 로고 수가 적어 트랙이 컨테이너보다 좁으면 빈 구간 발생 → 최소 2세트가 컨테이너 폭을 넘도록 복제 수 조절.

### 4-2. 이미지 캐러셀 (Carousel) — CSS scroll-snap 기반
- 용도: 후기/포트폴리오/스크린샷 슬라이더. 라이브러리 없이 네이티브 스크롤로.
- 난이도: ⭐⭐

```html
<div class="carousel" tabindex="0" aria-label="이미지 캐러셀">
  <div class="slide"><img src="1.jpg" alt="슬라이드 1"></div>
  <div class="slide"><img src="2.jpg" alt="슬라이드 2"></div>
  <div class="slide"><img src="3.jpg" alt="슬라이드 3"></div>
</div>
<div class="carousel-nav">
  <button data-dir="-1" aria-label="이전">←</button>
  <button data-dir="1" aria-label="다음">→</button>
</div>

<style>
.carousel {
  display: flex; gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;              /* Firefox 스크롤바 숨김 */
}
.carousel::-webkit-scrollbar { display: none; }
.slide { flex: 0 0 min(80%, 640px); scroll-snap-align: center; }
.slide img { width: 100%; border-radius: 16px; display: block; }
@media (prefers-reduced-motion: reduce) { .carousel { scroll-behavior: auto; } }
</style>

<script>
const track = document.querySelector('.carousel');
document.querySelectorAll('.carousel-nav button').forEach((b) => {
  b.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth * 0.8 * +b.dataset.dir, behavior: 'smooth' });
  });
});
</script>
```
- 주의: 자동재생 캐러셀은 전환율을 깎는다는 게 정설 — 기본은 수동. 자동이 꼭 필요하면 `setInterval` + 사용자 인터랙션 시 즉시 중단. 터치 스와이프는 네이티브 스크롤이라 공짜로 동작(이 방식의 최대 장점).

### 4-3. 무한 스크롤 텍스트 (거대 텍스트 벨트)
- 용도: "DESIGN — DEVELOP — DEPLOY —" 식의 대형 타이포 장식 밴드.
- 난이도: ⭐

```html
<div class="text-belt" aria-hidden="true">
  <span>DESIGN · DEVELOP · DEPLOY · </span><span>DESIGN · DEVELOP · DEPLOY · </span>
</div>

<style>
.text-belt {
  display: flex; overflow: hidden; white-space: nowrap;
  font-size: clamp(3rem, 10vw, 8rem); font-weight: 800;
  color: transparent; -webkit-text-stroke: 1px #94a3b8; /* 아웃라인 타이포 */
}
.text-belt span { animation: belt 20s linear infinite; }
@keyframes belt { to { transform: translateX(-100%); } }
@media (prefers-reduced-motion: reduce) { .text-belt span { animation: none; } }
</style>
```
- 주의: 장식이므로 `aria-hidden="true"` 필수. span 2개가 각각 -100% 이동하는 구조라 마퀴(4-1)와 달리 gap 보정 불필요 — 대신 span 안 텍스트가 끝 공백까지 동일해야 함.

---

## 5. 전환/로딩 (Transitions & Loading)

### 5-1. 페이지 로드 인트로
- 용도: 첫 진입 시 커튼이 걷히며 콘텐츠 공개. 브랜드 사이트용.
- 난이도: ⭐⭐

```html
<div class="intro-curtain" aria-hidden="true"><span class="intro-logo">BRAND</span></div>

<style>
.intro-curtain {
  position: fixed; inset: 0; z-index: 1000;
  background: #0f172a; display: grid; place-items: center;
  animation: curtain-up 0.8s cubic-bezier(0.76, 0, 0.24, 1) 1.4s forwards;
}
.intro-logo {
  color: #fff; font-size: 2rem; font-weight: 800; letter-spacing: 0.3em;
  opacity: 0; animation: logo-in 0.6s ease 0.2s forwards;
}
@keyframes logo-in { to { opacity: 1; } }
@keyframes curtain-up { to { transform: translateY(-100%); visibility: hidden; } }
@media (prefers-reduced-motion: reduce) { .intro-curtain { display: none; } }
</style>

<script>
/* 재방문자에겐 스킵 (세션당 1회) */
if (sessionStorage.getItem('intro-seen')) {
  document.querySelector('.intro-curtain')?.remove();
} else {
  sessionStorage.setItem('intro-seen', '1');
  /* 인트로 동안 스크롤 잠금 */
  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.body.style.overflow = ''; }, 2200);
}
</script>
```
- 주의: **총 시간 2.5초 초과 금지** — 인트로는 이탈률과 직결. LCP를 가리므로 성능 점수에 불리, 커머스/전환 중심 사이트에선 쓰지 않는 것이 정답.

### 5-2. View Transitions API 페이지 전환 (MPA, JS 0줄)
- 용도: 정적 다중 페이지 사이트에서 SPA급 부드러운 페이지 전환.
- 난이도: ⭐⭐

```html
<!-- 모든 페이지의 <head>에 동일하게 삽입 -->
<style>
@view-transition { navigation: auto; }  /* 이것만으로 크로스페이드 전환 활성화 */

/* 커스텀: 새 페이지는 아래에서 올라오고, 이전 페이지는 페이드아웃 */
::view-transition-old(root) { animation: vt-out 0.25s ease both; }
::view-transition-new(root) { animation: vt-in 0.35s ease both; }
@keyframes vt-out { to { opacity: 0; } }
@keyframes vt-in { from { opacity: 0; transform: translateY(16px); } }

/* 페이지 간 요소 연결: 목록 썸네일 → 상세 히어로 이미지가 morphing.
   두 페이지에서 같은 view-transition-name을 가진 요소끼리 자동 연결 */
.product-hero-img { view-transition-name: product-1; }

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root), ::view-transition-new(root) { animation: none; }
}
</style>
```
- 주의: Chrome 126+/Safari 18.2+에서만 동작, Firefox는 미지원 — **미지원 브라우저는 그냥 일반 내비게이션**이 되므로 폴백 코드 불필요(완벽한 점진적 향상). same-origin 내비게이션만 적용. `view-transition-name`은 한 페이지에 중복되면 전환 전체가 취소되므로 목록에서는 항목별 고유 이름을 인라인으로 부여.

### 5-3. 스켈레톤 로딩 (Skeleton)
- 용도: 데이터 로딩 중 콘텐츠 골격 표시. 스피너보다 체감 속도 우수.
- 난이도: ⭐

```html
<div class="card">
  <div class="skeleton" style="height:180px"></div>
  <div class="skeleton skeleton-text" style="width:70%"></div>
  <div class="skeleton skeleton-text" style="width:45%"></div>
</div>

<style>
.skeleton {
  border-radius: 8px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
.skeleton-text { height: 1em; margin-top: 0.75em; }
@keyframes shimmer { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .skeleton { animation: none; background: #e2e8f0; } }
/* 다크 모드 */
@media (prefers-color-scheme: dark) {
  .skeleton { background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%); background-size: 200% 100%; }
}
</style>
```
- 주의: 스켈레톤 치수를 실제 콘텐츠와 맞춰 CLS(레이아웃 이동) 0으로. 로딩 완료 시 스켈레톤 → 콘텐츠 교체에 짧은 fade(0.2s)를 넣으면 깜빡임이 줄어듦. 컨테이너에 `aria-busy="true"` 부여.

### 5-4. 커스텀 커서
- 용도: 포트폴리오/에이전시 사이트의 브랜드 커서. 링크 위에서 확대.
- 난이도: ⭐⭐

```html
<div class="cursor" aria-hidden="true"></div>

<style>
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .cursor {
    position: fixed; top: 0; left: 0; z-index: 9999;
    width: 24px; height: 24px; border-radius: 50%;
    border: 2px solid #6366f1; pointer-events: none;
    translate: -50% -50%;
    transition: width 0.25s, height 0.25s, background 0.25s;
    will-change: transform;
  }
  .cursor.is-hovering { width: 56px; height: 56px; background: rgba(99, 102, 241, 0.15); }
}
@media (pointer: coarse), (prefers-reduced-motion: reduce) { .cursor { display: none; } }
</style>

<script>
const cursor = document.querySelector('.cursor');
let cx = 0, cy = 0, tx = 0, ty = 0;
addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
(function loop() { /* lerp로 살짝 따라오는 느낌 */
  cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('pointerenter', () => cursor.classList.add('is-hovering'));
  el.addEventListener('pointerleave', () => cursor.classList.remove('is-hovering'));
});
</script>
```
- 주의: **기본 커서를 `cursor: none`으로 숨기는 건 비추** — 커스텀 커서가 렌더링 밀릴 때 커서 실종 사고. 보조 링(위 코드처럼 기본 커서와 공존)이 안전. 터치 기기·reduced-motion에선 반드시 숨김.

---

## 6. 최신 CSS 단독 기법 (2026)

### 6-1. Scroll-driven Animations 핵심 치트시트
- 용도: §1에서 쓴 기법의 개념 정리. JS 없이 스크롤 연동.
- 난이도: ⭐⭐

```css
/* ① view(): "이 요소"가 뷰포트를 통과하는 진행도 */
.item { animation: fade-up linear both; animation-timeline: view(); animation-range: entry 0% entry 80%; }

/* ② scroll(): "스크롤러"의 전체 스크롤 진행도 (진행바, 헤더 축소 등) */
.progress { animation: grow linear both; animation-timeline: scroll(root); }

/* ③ 헤더 축소: 스크롤 시작 후 120px 구간에서만 */
.site-header {
  animation: shrink linear both;
  animation-timeline: scroll(root);
  animation-range: 0 120px;
}
@keyframes shrink { to { padding-block: 0.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.12); } }

/* 폴백 게이트 — 반드시 이 안에서만 사용 */
@supports (animation-timeline: view()) { /* ... */ }
```
- 주의: `animation-duration`은 무의미해짐(스크롤이 곧 시간). `both` fill 필수(구간 밖에서 첫/끝 상태 유지). Firefox 폴백을 항상 설계할 것.

### 6-2. `@property`로 그라디언트 각도/색 애니메이션
- 용도: 원래 애니메이션 불가능한 그라디언트 각도·색상 정지점을 부드럽게 전환. CTA 테두리 회전 효과의 핵심.
- 난이도: ⭐⭐

```html
<button class="btn-conic">회전 테두리 버튼</button>

<style>
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;      /* 등록해야 --angle이 '보간 가능한 값'이 됨 */
}
.btn-conic {
  position: relative; padding: 1em 2.4em; border: 0; border-radius: 999px;
  background: #0f172a; color: #fff; font-size: 1rem; cursor: pointer;
}
.btn-conic::before {
  content: ''; position: absolute; inset: -2px; z-index: -1; border-radius: inherit;
  background: conic-gradient(from var(--angle), #6366f1, #ec4899, #06b6d4, #6366f1);
  animation: spin-angle 3s linear infinite;
}
@keyframes spin-angle { to { --angle: 360deg; } }
@media (prefers-reduced-motion: reduce) { .btn-conic::before { animation: none; } }
</style>
```
- 주의: `@property` 등록 없이 `--angle`을 keyframes에 넣으면 보간 없이 뚝뚝 끊김. 2026 기준 전 주요 브라우저 지원(Baseline). 같은 기법으로 `<color>`, `<percentage>` 커스텀 속성도 애니메이션 가능.

### 6-3. `:has()` 활용 팁 — JS 없는 상태 연동
- 용도: 자식/형제 상태에 따라 부모·주변 요소를 애니메이션. 폼 포커스 시 카드 강조 등.
- 난이도: ⭐

```css
/* 폼 안 input에 포커스되면 카드 전체가 떠오름 */
.form-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.form-card:has(input:focus-visible) {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(99, 102, 241, 0.25);
}

/* 그리드에서 한 카드 호버 시 나머지 카드 흐리게 (스포트라이트) */
.grid:has(.card:hover) .card:not(:hover) { opacity: 0.45; scale: 0.98; }
.card { transition: opacity 0.3s ease, scale 0.3s ease; }

/* 체크박스 토글로 섹션 열기 (JS 0줄 아코디언 트리거) */
.faq:has(> input:checked) .faq-body { grid-template-rows: 1fr; }
.faq-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s ease; }
.faq-body > * { overflow: hidden; }
```
- 주의: `grid-template-rows: 0fr → 1fr` 트랜지션은 "height: auto 애니메이션" 문제의 표준 해법(내부 요소에 `overflow: hidden` 필수). 최신 브라우저는 `interpolate-size: allow-keywords`로 `height: auto` 직접 전환도 가능하나 아직 Chromium 계열 위주.

### 6-4. Anchor Positioning 활용 팁
- 용도: 내비게이션의 "미끄러지는 활성 인디케이터", 툴팁 위치 지정을 JS 좌표 계산 없이.
- 난이도: ⭐⭐⭐

```html
<nav class="tabs">
  <button class="tab is-active">홈</button>
  <button class="tab">기능</button>
  <button class="tab">가격</button>
  <div class="indicator"></div>
</nav>

<style>
@supports (anchor-name: --a) {
  .tabs { position: relative; display: flex; gap: 0.5rem; }
  .tab.is-active { anchor-name: --active-tab; }   /* 활성 탭이 앵커가 됨 */
  .indicator {
    position: absolute;
    position-anchor: --active-tab;
    left: anchor(left); right: anchor(right); bottom: anchor(bottom);
    height: 3px; background: #6366f1; border-radius: 2px;
    transition: left 0.3s cubic-bezier(0.22,1,0.36,1), right 0.3s cubic-bezier(0.22,1,0.36,1);
  }
}
</style>

<script>
document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
  document.querySelector('.tab.is-active')?.classList.remove('is-active');
  t.classList.add('is-active'); // anchor-name이 옮겨가면 인디케이터가 미끄러져 이동
}));
</script>
```
- 주의: 2026 현재 Chromium + Safari 26 지원, Firefox 미지원 → `@supports` 필수. 폴백은 인디케이터 없이 활성 탭 자체 스타일(밑줄)로 처리하면 충분.

---

## 7. 성능 수칙 (필수)

### 7-1. transform / opacity만 애니메이션한다
- 컴포지터에서 처리되어 60fps 보장. **금지 목록**: `width`, `height`, `top/left`, `margin`, `box-shadow`(직접 전환) → 리플로우/리페인트 유발.

```css
/* 나쁨 */  .bad  { transition: left 0.3s, width 0.3s, box-shadow 0.3s; }
/* 좋음 */  .good { transition: transform 0.3s, opacity 0.3s; }

/* box-shadow가 필요하면: 가상요소에 미리 그려두고 opacity만 전환 */
.card { position: relative; }
.card::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  opacity: 0; transition: opacity 0.3s ease;
}
.card:hover::after { opacity: 1; }
```

### 7-2. will-change는 "쓰는 동안만"
```css
/* 나쁨: 전역 남발 → 메모리 폭증 */
* { will-change: transform; }

/* 좋음: 곧 애니메이션할 대상에만, 끝나면 해제 */
.tilt-card:hover { will-change: transform; }
```
```js
// JS 제어 시: 시작 직전 지정, 종료 후 해제
el.style.willChange = 'transform';
el.addEventListener('transitionend', () => { el.style.willChange = 'auto'; }, { once: true });
```

### 7-3. prefers-reduced-motion — 전 프로젝트 공통 스니펫 (반드시 포함)
```css
/* 전역 안전망: 모션 최소화 사용자에겐 사실상 즉시 완료 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
```js
// JS 애니메이션 공통 게이트
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)');
function safeAnimate(fn, fallback) { REDUCED.matches ? fallback?.() : fn(); }
REDUCED.addEventListener('change', () => location.reload()); // 설정 변경 시 단순 재적용
```
- 주의: `0.01ms` 방식은 `animationend`/`transitionend` 이벤트가 정상 발화되므로 "끝나면 클래스 제거" 류 로직이 깨지지 않음(『duration: 0』이나 `animation: none`보다 안전). 카운트업·타이핑처럼 JS 주도 효과는 위 게이트로 **최종 상태를 즉시 출력**.

### 7-4. 기타 체크리스트
- 스크롤 리스너는 `{ passive: true }` + rAF 스로틀 (§1-4 패턴).
- 화면 밖 무한 애니메이션(마퀴·오브)은 IntersectionObserver로 `animation-play-state: paused` 처리하면 배터리 절약.
- `blur()`·`backdrop-filter` 애니메이션 금지 — 값 고정, 이동은 transform.
- 모바일 실기기에서 반드시 테스트 (개발용 데스크톱 GPU 기준 판단 금지).
- 애니메이션 총량: 첫 화면에서 "동시에 움직이는 것"은 1~2개면 충분. 많을수록 싸 보임.

---

## 8. 도구 선택 가이드 — GSAP vs Motion vs 순수 CSS/JS

| 효과 | 1순위 | 대안 | 비고 |
|---|---|---|---|
| 스크롤 리빌/스태거 | 순수 JS (IntersectionObserver) | CSS `view()` | 라이브러리 불필요 |
| 스크롤 진행바/헤더 축소 | CSS `scroll()` | 순수 JS 폴백 | §1-5, §6-1 |
| 패럴랙스 (단순) | CSS `view()` + JS 폴백 | GSAP ScrollTrigger | 다층·정밀이면 GSAP |
| 핀 고정 + scrub 시퀀스 | **GSAP ScrollTrigger** | CSS sticky + view() | 복잡 시퀀스는 GSAP이 압도적 |
| 텍스트 스플릿 | 순수 JS (§2-1) | GSAP SplitText (무료) | 다국어·줄바꿈 대응은 SplitText |
| 숫자 카운트업 | 순수 JS | GSAP (`snap`) | 10줄이면 충분 |
| 호버/틸트/리플 | 순수 CSS(+JS 몇 줄) | — | 라이브러리 낭비 |
| 마퀴/텍스트 벨트 | 순수 CSS | GSAP (속도 가변 시) | |
| 캐러셀 | CSS scroll-snap | Swiper (복잡 요구 시) | 자동재생·루프·썸네일 필요 시만 Swiper |
| 페이지 전환 (MPA) | **View Transitions API** | — | JS 0줄 |
| React/Next 프로젝트 | **Motion** (구 Framer Motion) | GSAP + useGSAP | 선언형 `whileInView`, `AnimatePresence`가 생산성 우위 |
| SVG 모핑/경로 그리기 | GSAP (MorphSVG/DrawSVG, 무료) | 순수 CSS `stroke-dashoffset` | 단순 라인 드로잉은 CSS로 충분 |
| 물리 기반(스프링) | Motion | GSAP | Motion은 하이브리드 엔진으로 번들 경량 |

**판단 순서**: ① CSS 단독으로 되는가 → ② JS 20줄 이내로 되는가 → ③ 그때 GSAP/Motion. 상업 랜딩 1페이지에 GSAP이 정당화되는 경우는 대개 "핀 + scrub 스토리텔링 섹션"이 있을 때뿐이다.

```html
<!-- GSAP CDN 표준 세트 (2025년부터 전 플러그인 무료) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<!-- 필요 시: SplitText.min.js, MorphSVGPlugin.min.js 등 동일 경로 -->
```
```bash
# Motion (React) 설치
npm install motion
```
```jsx
// Motion 최소 예시 — 스크롤 리빌
import { motion } from 'motion/react';
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
/>
```

---

## 부록: 신규 프로젝트 기본 장착 세트

상업 랜딩페이지라면 아래 5개는 기본 장착을 권장:
1. §7-3 reduced-motion 전역 안전망
2. §1-1 스크롤 리빌 + §1-3 스태거 (IntersectionObserver 1개로 통합)
3. §3-1 ① 버튼 스케일+그림자 / §3-3 링크 언더라인
4. §5-3 스켈레톤 (데이터 로딩 있을 때)
5. §5-2 View Transitions `@view-transition { navigation: auto; }` (MPA일 때, 공짜 업그레이드)
