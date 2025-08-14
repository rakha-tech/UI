const comet = document.getElementById("comet");
const colors = [
  "#ff00ff",
  "#00ffff",
  "#ffff00",
  "#00ff99",
  "#ff0073",
  "#7300ff",
];
let hue = 0;

/* Move the main cursor */
window.addEventListener("mousemove", (e) => {
  comet.style.left = `${e.clientX}px`;
  comet.style.top = `${e.clientY}px`;

  /* Create a new colored particle at the same spot */
  const p = document.createElement("div");
  p.classList.add("particle");
  const size = Math.random() * 12 + 6; // 6-18px
  p.style.width = p.style.height = `${size}px`;
  p.style.left = `${e.clientX - size / 2}px`;
  p.style.top = `${e.clientY - size / 2}px`;

  /* Rainbow cycle */
  p.style.background = `hsl(${hue},100%,60%)`;
  hue = (hue + 35) % 360;

  /* Glow */
  p.style.boxShadow = `0 0 8px currentColor`;

  document.body.appendChild(p);

  /* Remove the particle after its animation finishes */
  p.addEventListener("animationend", () => p.remove());
});
