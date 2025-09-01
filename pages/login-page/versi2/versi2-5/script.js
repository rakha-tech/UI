/* ---------- Fractal tunnel background ---------- */
const t = document.getElementById("tunnel"),
  tx = t.getContext("2d");
let frame = 0,
  timer;
function resizeT() {
  t.width = innerWidth;
  t.height = innerHeight;
}
resizeT();
addEventListener("resize", resizeT);
function drawTunnel() {
  tx.fillStyle = "#000";
  tx.fillRect(0, 0, t.width, t.height);
  const cx = t.width / 2,
    cy = t.height / 2;
  for (let i = 0; i < 12; i++) {
    const r = (frame + i * 25) % 600;
    const alpha = 1 - r / 600;
    tx.strokeStyle = `rgba(0,249,255,${alpha})`;
    tx.lineWidth = 2;
    tx.beginPath();
    tx.arc(cx, cy, r, 0, Math.PI * 2);
    tx.stroke();
  }
  frame += 2;
  timer = requestAnimationFrame(drawTunnel);
}
drawTunnel();

/* ---------- Haptic helper ---------- */
const vibe = (ms = 30) => navigator.vibrate && navigator.vibrate(ms);

/* ---------- WebAuthn biometric ---------- */
document.getElementById("webauthnBtn").onclick = async () => {
  if (!window.PublicKeyCredential) {
    alert("WebAuthn not supported");
    return;
  }
  try {
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: Uint8Array.from(
          window.crypto.getRandomValues(new Uint8Array(32))
        ),
        rp: { name: "Holo-Vault", id: location.hostname },
        user: {
          id: Uint8Array.from(
            "1234567890".split("").map((c) => c.charCodeAt(0))
          ),
          name: "demo@holo.vault",
          displayName: "Demo User",
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
        attestation: "none",
      },
    });
    explode("✅ Fingerprint / Face registered!");
  } catch (e) {
    explode("❌ " + (e.message || "Cancelled"));
  }
};

/* ---------- NFC demo ---------- */
document.getElementById("nfcBtn").onclick = () => {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    ndef
      .scan()
      .then(
        () =>
          (ndef.onreading = ({ message }) => {
            const rec = message.records[0];
            const txt = new TextDecoder().decode(rec.data);
            explode("📲 NFC tapped: " + txt);
          })
      )
      .catch((e) => explode("NFC error: " + e));
  } else {
    explode("📲 NFC API not available");
  }
};

/* ---------- AR lens toggle ---------- */
document.getElementById("arBtn").onclick = () => {
  document.getElementById("lens").classList.toggle("on");
  vibe();
};

/* ---------- Quantum key visualiser ---------- */
const qDots = document.querySelectorAll("#quantum span");
setInterval(() => {
  qDots.forEach(
    (d) => (d.style.transform = `scale(${0.8 + Math.random() * 0.6})`)
  );
  document.getElementById("qText").textContent = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase();
}, 1500);

/* ---------- Form submit ---------- */
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  vibe(50);
  const btn = document.getElementById("btn");
  btn.disabled = true;
  btn.textContent = "•••";
  await new Promise((r) => setTimeout(r, 1800));
  const ok = Math.random() > 0.3;
  btn.textContent = ok ? "✅ Welcome" : "❌ Try again";
  btn.style.background = ok ? "var(--ok)" : "var(--err)";
  if (ok) explode("✅ Access granted");
  setTimeout(() => {
    btn.textContent = "Log In";
    btn.style.background = "";
    btn.disabled = false;
  }, 2200);
});

/* ---------- Universal particle explosion ---------- */
function explode(msg) {
  document.getElementById("errorMsg").textContent = msg;
  const c = document.createElement("canvas");
  c.style.position = "fixed";
  c.style.top = 0;
  c.style.left = 0;
  c.style.pointerEvents = "none";
  c.width = innerWidth;
  c.height = innerHeight;
  c.style.zIndex = 999;
  document.body.appendChild(c);
  const ctx = c.getContext("2d"),
    parts = [];
  for (let i = 0; i < 150; i++) {
    const a = Math.random() * Math.PI * 2,
      s = 1 + Math.random() * 4;
    parts.push({
      x: innerWidth / 2,
      y: innerHeight / 2,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 60,
      r: 2 + Math.random() * 3,
    });
  }
  function boom() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.fillStyle = `rgba(0,249,255,${p.life / 60})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (parts[0].life > 0) requestAnimationFrame(boom);
    else c.remove();
  }
  boom();
  setTimeout(
    () => (document.getElementById("errorMsg").textContent = ""),
    3000
  );
}

/* ---------- Accessibility: ESC closes explosions ---------- */
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cancelAnimationFrame(timer);
    document.querySelectorAll("canvas:not(#tunnel)").forEach((c) => c.remove());
  }
});
