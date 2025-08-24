const cube = document.getElementById("cube");
let rotY = 45;

document.addEventListener("mousemove", (e) => {
  cube.style.left = e.clientX + "px";
  cube.style.top = e.clientY + "px";
  rotY += 2; // continual spin
  cube.style.transform = `translate(-50%,-50%) rotateX(-15deg) rotateY(${rotY}deg)`;
});

document.addEventListener("mousedown", (e) => {
  const w = document.createElement("div");
  w.className = "wake";
  w.style.left = e.clientX + "px";
  w.style.top = e.clientY + "px";
  document.body.appendChild(w);
  w.addEventListener("animationend", () => w.remove());
});
