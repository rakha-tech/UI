const dot = document.getElementById("dot");
let lastX = 0,
  lastY = 0;

document.addEventListener("mousemove", (e) => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const speed = Math.min(Math.hypot(dx, dy), 60);

  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";

  /* Stretch & glow based on speed */
  const scale = 1 + speed * 0.008;
  const glow = 10 + speed * 0.25;
  dot.style.transform = `scale(${scale})`;
  dot.style.boxShadow = `0 0 ${glow}px #00f5ff, 0 0 ${glow * 2}px #00f5ff80`;

  lastX = e.clientX;
  lastY = e.clientY;
});

/* Ring on click */
document.addEventListener("mousedown", (e) => {
  const r = document.createElement("div");
  r.className = "ring";
  r.style.left = e.clientX + "px";
  r.style.top = e.clientY + "px";
  document.body.appendChild(r);
  r.addEventListener("animationend", () => r.remove());
});
