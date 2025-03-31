function drawScene(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#87CEEB');
  gradient.addColorStop(0.5, '#ffffff');
  gradient.addColorStop(1, '#4a7c59');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  ctx.beginPath();
  ctx.moveTo(0, h * 0.6);
  for (let i = 0; i <= w; i += 1) {
    const scale = 80 * Math.sin(i * 0.005) + 150 * Math.sin(i * 0.002);
    ctx.lineTo(i, h * 0.6 - scale);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = '#3e3e3e';
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(w * 0.75, h * 0.85, w * 0.3, h * 0.1, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#88c5c5';
  ctx.fill();

  const reflect = ctx.createLinearGradient(0, h * 0.75, 0, h);
  reflect.addColorStop(0, 'rgba(255,255,255,0.1)');
  reflect.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = reflect;
  ctx.fillRect(0, h * 0.75, w, h * 0.25);
}



window.onload = () => {
  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel) => {
    const canvas = document.createElement('canvas');
    canvas.width = panel.clientWidth;
    canvas.height = panel.clientHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    panel.appendChild(canvas);
    drawScene(canvas);
    const type = panel.classList[1];
    if (type === 'rainy') createRain(canvas);
    if (type === 'sunny') createSun(canvas);
    if (type === 'stormy') createStorm(canvas);
    if (type === 'quaint') createQuaint(canvas);
  });
};

function createRain(c) {
  const x = c.getContext('2d');
  let r = [];
  for (let i = 0; i < 250; i++) r.push({ x: Math.random() * c.width, y: Math.random() * c.height, l: Math.random() * 20 + 10, xs: -2, ys: 10 });
  function draw() {
    x.clearRect(0, 0, c.width, c.height);
    x.strokeStyle = 'rgba(174,194,224,0.5)';
    x.lineWidth = 1;
    x.lineCap = 'round';
    r.forEach(d => {
      x.beginPath();
      x.moveTo(d.x, d.y);
      x.lineTo(d.x + d.xs, d.y + d.l);
      x.stroke();
      d.x += d.xs;
      d.y += d.ys;
      if (d.y > c.height) {
        d.x = Math.random() * c.width;
        d.y = -20;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

function createSun(c) {
  const x = c.getContext('2d');
  let a = 0;
  function draw() {
    x.clearRect(0, 0, c.width, c.height);
    const r = 150;
    const cx = c.width / 2;
    const cy = c.height / 2;
    const g = x.createRadialGradient(cx, cy, 10, cx, cy, r);
    g.addColorStop(0, 'rgba(255, 255, 180, 1)');
    g.addColorStop(1, 'rgba(255, 255, 180, 0)');
    x.fillStyle = g;
    x.beginPath();
    x.arc(cx, cy, r, 0, Math.PI * 2);
    x.fill();
    a += 0.005;
    requestAnimationFrame(draw);
  }
  draw();
}

function createStorm(c) {
  const x = c.getContext('2d');
  let flash = false;
  function draw() {
    x.clearRect(0, 0, c.width, c.height);
    if (Math.random() < 0.008) flash = true;
    if (flash) {
      x.fillStyle = 'rgba(255,255,255,0.15)';
      x.fillRect(0, 0, c.width, c.height);
      flash = false;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function createQuaint(c) {
  const x = c.getContext('2d');
  const birds = [];
  for (let i = 0; i < 8; i++) birds.push({ x: Math.random() * c.width, y: Math.random() * c.height / 2, dx: 1 + Math.random() * 1.5 });
  const breeze = [];
  for (let i = 0; i < 40; i++) breeze.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 2 + 1, dx: Math.random() * 0.3 + 0.1 });
  function draw() {
    x.clearRect(0, 0, c.width, c.height);
    x.fillStyle = 'rgba(200, 200, 200, 0.2)';
    breeze.forEach(p => {
      x.beginPath();
      x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      x.fill();
      p.x += p.dx;
      if (p.x > c.width) p.x = -5;
    });
    x.fillStyle = 'rgba(0, 0, 0, 0.8)';
    birds.forEach(b => {
      x.beginPath();
      x.moveTo(b.x, b.y);
      x.lineTo(b.x - 10, b.y - 5);
      x.lineTo(b.x - 10, b.y + 5);
      x.closePath();
      x.fill();
      b.x += b.dx;
      if (b.x > c.width + 20) {
        b.x = -20;
        b.y = Math.random() * c.height / 2;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}
