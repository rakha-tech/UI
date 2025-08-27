/* ---------- Background particle constellation ---------- */
const b = document.getElementById("bg"),
  g = b.getContext("2d");
let W,
  H,
  nodes = 120,
  mouseX = 0,
  mouseY = 0;
resize();
addEventListener("resize", resize);
addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function resize() {
  W = b.width = innerWidth;
  H = b.height = innerHeight;
}
const dot = [];
for (let i = 0; i < nodes; i++)
  dot.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  });
function drawBg() {
  g.clearRect(0, 0, W, H);
  dot.forEach((d) => {
    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0 || d.x > W) d.vx *= -1;
    if (d.y < 0 || d.y > H) d.vy *= -1;
    g.fillStyle = "rgba(0,249,255,.7)";
    g.beginPath();
    g.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
    g.fill();
    const dx = mouseX - d.x,
      dy = mouseY - d.y,
      dis = Math.sqrt(dx * dx + dy * dy);
    if (dis < 150) {
      g.strokeStyle = `rgba(0,249,255,${1 - dis / 150})`;
      g.lineWidth = 0.5;
      g.beginPath();
      g.moveTo(d.x, d.y);
      g.lineTo(mouseX, mouseY);
      g.stroke();
    }
  });
  requestAnimationFrame(drawBg);
}
drawBg();

/* ---------- Ambient light sensor ---------- */
if ("AmbientLightSensor" in window) {
  navigator.permissions.query({ name: "ambient-light-sensor" }).then((res) => {
    if (res.state === "granted" || res.state === "prompt") {
      const sensor = new AmbientLightSensor();
      sensor.addEventListener("reading", () => {
        document.documentElement.style.setProperty(
          "--bg",
          sensor.illuminance > 50 ? "#ffffff" : "#000"
        );
        document.documentElement.style.setProperty(
          "--text",
          sensor.illuminance > 50 ? "#000" : "#fff"
        );
      });
      sensor.start();
    }
  });
}

/* ---------- Card tilt & morph ---------- */
const card = document.getElementById("card");
addEventListener("mousemove", (e) => {
  const x = (e.clientX / innerWidth - 0.5) * 20;
  const y = (e.clientY / innerHeight - 0.5) * 20;
  card.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
  card.classList.add("morph");
});
addEventListener("mouseleave", () => {
  card.style.transform = "";
  card.classList.remove("morph");
});

/* ---------- Haptic feedback helper ---------- */
const haptic = () => navigator.vibrate && navigator.vibrate(30);

/* ---------- Voice login (Web Speech API) ---------- */
const vBtn = document.getElementById("voiceBtn");
const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
rec.lang = "en-US";
rec.continuous = false;
rec.interimResults = false;
rec.onstart = () => {
  vBtn.classList.add("recording");
  haptic();
};
rec.onend = () => vBtn.classList.remove("recording");
rec.onresult = (e) => {
  const said = e.results[0][0].transcript.trim().toLowerCase();
  // demo: accept "open sesame"
  if (said.includes("open sesame")) {
    document.getElementById("email").value = "demo@voice.2";
    document.getElementById("pw").value = "sesame";
    document.getElementById("form").requestSubmit();
  } else {
    document.getElementById("errorMsg").textContent = "Voice not recognized";
    setTimeout(
      () => (document.getElementById("errorMsg").textContent = ""),
      2000
    );
  }
};
vBtn.onclick = () => rec.start();

/* ---------- Password toggle ---------- */
document.getElementById("togglePw").onclick = () => {
  const p = document.getElementById("pw");
  p.type = p.type === "password" ? "text" : "password";
  document.getElementById("togglePw").textContent =
    p.type === "password" ? "👁" : "👁‍🗨";
  haptic();
};

/* ---------- Theme toggle ---------- */
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
  const r = document.documentElement.style;
  if (document.body.classList.contains("light")) {
    r.setProperty("--bg", "#ffffff");
    r.setProperty("--text", "#000");
    document.getElementById("themeToggle").textContent = "☀️";
  } else {
    r.setProperty("--bg", "#000");
    r.setProperty("--text", "#fff");
    document.getElementById("themeToggle").textContent = "🌙";
  }
  haptic();
};

/* ---------- Fingerprint particle explosion ---------- */
function explode() {
  const c = document.createElement("canvas");
  c.style.position = "absolute";
  c.style.top = 0;
  c.style.left = 0;
  c.style.pointerEvents = "none";
  c.width = innerWidth;
  c.height = innerHeight;
  document.body.appendChild(c);
  const ctx = c.getContext("2d"),
    parts = [];
  for (let i = 0; i < 80; i++) {
    const a = Math.random() * Math.PI * 2;
    parts.push({
      x: innerWidth / 2,
      y: innerHeight / 2,
      vx: Math.cos(a) * Math.random() * 6,
      vy: Math.sin(a) * Math.random() * 6,
      life: 60,
    });
  }
  function boom() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.fillStyle = `rgba(0,249,255,${p.life / 60})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    if (parts[0].life > 0) requestAnimationFrame(boom);
    else c.remove();
  }
  boom();
}

/* ---------- Form submit with haptics & explosion ---------- */
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  haptic();
  const btn = document.getElementById("btn");
  btn.classList.add("loading");
  btn.textContent = "";
  await new Promise((r) => setTimeout(r, 1800));
  const ok = Math.random() > 0.3;
  btn.classList.remove("loading");
  btn.textContent = ok ? "✓ Success" : "✗ Failed";
  btn.classList.add(ok ? "success" : "error");
  document.getElementById("errorMsg").textContent = ok ? "" : "Try again";
  if (ok) explode();
  setTimeout(() => {
    btn.textContent = "Log In";
    btn.classList.remove("success", "error");
    document.getElementById("errorMsg").textContent = "";
  }, 2200);
});
