/* ---------- Neon Grid Background ---------- */
const cv = document.getElementById("grid"),
  ctx = cv.getContext("2d");
let cols, rows;
function resize() {
  cv.width = innerWidth;
  cv.height = innerHeight;
  cols = Math.floor(cv.width / 30);
  rows = Math.floor(cv.height / 30);
}
addEventListener("resize", resize);
resize();
function drawGrid() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.strokeStyle = "rgba(0,249,255,.15)";
  ctx.lineWidth = 1;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      ctx.beginPath();
      ctx.arc(x * 30, y * 30, 1, 0, Math.PI * 2);
      ctx.stroke();
      if (x < cols - 1) {
        ctx.moveTo(x * 30, y * 30);
        ctx.lineTo((x + 1) * 30, y * 30);
        ctx.stroke();
      }
      if (y < rows - 1) {
        ctx.moveTo(x * 30, y * 30);
        ctx.lineTo(x * 30, (y + 1) * 30);
        ctx.stroke();
      }
    }
  }
}
drawGrid();
setInterval(drawGrid, 2000);

/* ---------- Day / Night toggle ---------- */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
  const root = document.documentElement.style;
  if (document.body.classList.contains("light")) {
    root.setProperty("--bg", "#ffffff");
    root.setProperty("--card", "#f4f4f8");
    root.setProperty("--text", "#111");
    toggle.textContent = "☀️";
  } else {
    root.setProperty("--bg", "#0d0d0d");
    root.setProperty("--card", "#111118");
    root.setProperty("--text", "#ffffff");
    toggle.textContent = "🌙";
  }
};

/* ---------- Password strength ---------- */
const pw = document.getElementById("pw"),
  bar = document.getElementById("strengthBar");
pw.addEventListener("input", () => {
  let s = 0;
  if (pw.value.length > 4) s += 25;
  if (/[A-Z]/.test(pw.value)) s += 25;
  if (/[0-9]/.test(pw.value)) s += 25;
  if (/[^A-Za-z0-9]/.test(pw.value)) s += 25;
  bar.style.width = s + "%";
  bar.style.background = s < 50 ? "#ff3333" : s < 75 ? "#ffcc00" : "#00ff88";
});

/* ---------- Show/Hide Password ---------- */
document.getElementById("togglePw").onclick = () => {
  const type = pw.getAttribute("type") === "password" ? "text" : "password";
  pw.setAttribute("type", type);
};

/* ---------- Form submit ---------- */
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("btn");
  btn.classList.add("loading");
  btn.textContent = "";
  await new Promise((r) => setTimeout(r, 1800));
  const ok = Math.random() > 0.3;
  btn.classList.remove("loading");
  btn.textContent = ok ? "✓ Success" : "✗ Failed";
  btn.classList.add(ok ? "success" : "error");
  if (!ok) {
    document.getElementById("errorMsg").textContent = "Check credentials";
  }
  setTimeout(() => {
    btn.textContent = "Log In";
    btn.classList.remove("success", "error");
    document.getElementById("errorMsg").textContent = "";
  }, 2000);
});

/* ---------- Fingerprint mock-up ---------- */
document.getElementById("finger").onclick = () => {
  const f = document.getElementById("finger");
  f.textContent = "✓";
  f.style.color = "#00ff88";
  setTimeout(() => {
    f.textContent = "👆";
    f.style.color = "";
  }, 1500);
};
