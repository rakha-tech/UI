const glass = document.getElementById("glass");
let lastX = 0,
  lastY = 0;

document.addEventListener("mousemove", (e) => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const angle = Math.atan2(dy, dx);

  glass.style.left = e.clientX + "px";
  glass.style.top = e.clientY + "px";
  // tilt the sphere toward movement
  glass.style.transform = `
    translate(-50%,-50%)
    rotateX(${dy * 0.1}deg)
    rotateY(${-dx * 0.1}deg)
  `;

  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener("mousedown", (e) => {
  const r = document.createElement("div");
  r.className = "ripple";
  r.style.left = e.clientX + "px";
  r.style.top = e.clientY + "px";
  document.body.appendChild(r);
  r.addEventListener("animationend", () => r.remove());
});
