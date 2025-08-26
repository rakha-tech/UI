/* ---------- Particle Network Background ---------- */
const pCv = document.getElementById("particles"),
  pCtx = pCv.getContext("2d");
let W,
  H,
  mouse = { x: 0, y: 0 };
const dots = [],
  dotCount = 90;
function resize() {
  W = pCv.width = innerWidth;
  H = pCv.height = innerHeight;
}
resize();
addEventListener("resize", resize);
addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
class Dot {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.7;
    this.vy = (Math.random() - 0.5) * 0.7;
    this.r = Math.random() * 2 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
    this.draw();
  }
  draw() {
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    pCtx.fillStyle = "rgba(0,249,255,.6)";
    pCtx.fill();
  }
}
for (let i = 0; i < dotCount; i++) dots.push(new Dot());
function animateParticles() {
  pCtx.clearRect(0, 0, W, H);
  dots.forEach((d) => d.update());
  // connect nearby dots
  dots.forEach((d, i) => {
    dots.slice(i + 1).forEach((d2) => {
      const dx = d.x - d2.x,
        dy = d.y - d2.y,
        dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        pCtx.beginPath();
        pCtx.moveTo(d.x, d.y);
        pCtx.lineTo(d2.x, d2.y);
        pCtx.strokeStyle = `rgba(0,249,255,${1 - dist / 120})`;
        pCtx.lineWidth = 0.5;
        pCtx.stroke();
      }
    });
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ---------- Eye-tracking glow on card ---------- */
const card = document.getElementById("card");
addEventListener("mousemove", (e) => {
  const x = (e.clientX / innerWidth) * 100;
  const y = (e.clientY / innerHeight) * 100;
  card.style.setProperty("--x", x + "%");
  card.style.setProperty("--y", y + "%");
});

/* ---------- Day / Night toggle (with sound) ---------- */
const themeBtn = document.getElementById("themeToggle");
const clickSound = new Audio(
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAA="
);
themeBtn.onclick = () => {
  clickSound.play();
  document.body.classList.toggle("light");
  const root = document.documentElement.style;
  if (document.body.classList.contains("light")) {
    root.setProperty("--bg", "#ffffff");
    root.setProperty("--glass-bg", "rgba(0,0,0,.04)");
    root.setProperty("--text", "#000000");
    themeBtn.textContent = "☀️";
  } else {
    root.setProperty("--bg", "#0d0d0d");
    root.setProperty("--glass-bg", "rgba(255,255,255,.06)");
    root.setProperty("--text", "#ffffff");
    themeBtn.textContent = "🌙";
  }
};

/* ---------- Password strength bar + sound ---------- */
const pw = document.getElementById("pw"),
  bar = document.getElementById("bar");
const keySound = new Audio(
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAA="
);
pw.addEventListener("input", () => {
  keySound.currentTime = 0;
  keySound.play();
  let score = 0;
  if (pw.value.length > 4) score += 25;
  if (/[A-Z]/.test(pw.value)) score += 25;
  if (/[0-9]/.test(pw.value)) score += 25;
  if (/[^A-Za-z0-9]/.test(pw.value)) score += 25;
  bar.style.width = score + "%";
  bar.style.background =
    score < 50 ? "#ff3333" : score < 75 ? "#ffcc00" : "#00ff88";
});

/* ---------- Show / Hide password ---------- */
document.getElementById("togglePw").onclick = () => {
  const type = pw.getAttribute("type") === "password" ? "text" : "password";
  pw.setAttribute("type", type);
  document.getElementById("togglePw").textContent =
    type === "password" ? "👁" : "👁‍🗨";
};

/* ---------- Form submit with sound & auto-hide cursor ---------- */
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  document.body.style.cursor = "none";
  const btn = document.getElementById("btn");
  btn.classList.add("loading");
  btn.textContent = "";
  await new Promise((r) => setTimeout(r, 1800));
  const ok = Math.random() > 0.3;
  btn.classList.remove("loading");
  btn.textContent = ok ? "✓ Success" : "✗ Failed";
  btn.classList.add(ok ? "success" : "error");
  document.getElementById("errorMsg").textContent = ok ? "" : "Incorrect data";
  setTimeout(() => {
    btn.textContent = "Log In";
    btn.classList.remove("success", "error");
    document.getElementById("errorMsg").textContent = "";
    document.body.style.cursor = "default";
  }, 2000);
});
