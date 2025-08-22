const galaxy = document.getElementById("galaxy");

document.addEventListener("mousemove", (e) => {
  galaxy.style.left = e.clientX + "px";
  galaxy.style.top = e.clientY + "px";

  /* Spawn star trail */
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = e.clientX - 1.5 + "px";
  star.style.top = e.clientY - 1.5 + "px";
  star.style.boxShadow = `0 0 ${Math.random() * 6 + 2}px #fff`;
  document.body.appendChild(star);
  star.addEventListener("animationend", () => star.remove());
});
