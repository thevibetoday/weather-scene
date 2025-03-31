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

    const type = panel.classList[1];
    if (type === 'rainy') createRain(canvas);
    if (type === 'sunny') createSun(canvas);
    if (type === 'stormy') createStorm(canvas);
    if (type === 'quaint') createBreeze(canvas);
  });
};

function createRain(canvas) {
  const ctx = canvas.getContext('2d');
  const drops = [];
  for (let i = 0; i < 150; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      l: Math.random() * 20,
      xs: -2,
      ys: 10,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.xs, d.y + d.l);
      ctx.stroke();
    }
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      d.x += d.xs;
      d.y += d.ys;
      if (d.y > canvas.height) {
        d.x = Math.random() * canvas.width;
        d.y = -20;
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function createSun(canvas) {
  const ctx = canvas.getContext('2d');
  let angle = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const radius = 80;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const gradient = ctx.createRadialGradient(x, y, 10, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 100, 0.9)');
    gradient.addColorStop(1, 'rgba(255, 255, 100, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    angle += 0.01;
    requestAnimationFrame(draw);
  }
  draw();
}

function createStorm(canvas) {
  const ctx = canvas.getContext('2d');
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const opacity = Math.random() < 0.02 ? 0.8 : 0;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
  }
  draw();
}

function createBreeze(canvas) {
  const ctx = canvas.getContext('2d');
  const leaves = [];
  for (let i = 0; i < 30; i++) {
    leaves.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: Math.random() * 2 + 0.5,
      dy: Math.random() * 0.5 + 0.2,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i];
      ctx.beginPath();
      ctx.arc(leaf.x, leaf.y, leaf.r, 0, Math.PI * 2);
      ctx.fill();
      leaf.x += leaf.dx;
      leaf.y += leaf.dy;
      if (leaf.x > canvas.width || leaf.y > canvas.height) {
        leaf.x = -10;
        leaf.y = Math.random() * canvas.height;
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}
