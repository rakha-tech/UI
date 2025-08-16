const cross = document.getElementById('cross');
const coords = document.getElementById('coords');

document.addEventListener('mousemove', e=>{
  cross.style.left = e.clientX + 'px';
  cross.style.top  = e.clientY + 'px';
  coords.textContent = `X:${e.clientX}  Y:${e.clientY}`;
});

document.addEventListener('mousedown', e=>{
  const b = document.createElement('div');
  b.classList.add('blast');
  b.style.left = e.clientX + 'px';
  b.style.top  = e.clientY + 'px';
  document.body.appendChild(b);
  b.addEventListener('animationend', ()=>b.remove());
});