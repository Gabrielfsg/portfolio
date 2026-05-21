/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.35 + 0.05;
    this.color = Math.random() > 0.6 ? '0,230,118' : '255,255,255';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,230,118,${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== TYPED TEXT ===== */
const phrases = [
  'Software Engineer',
  'Full-Stack Developer',
  'Java & Spring Expert',
  'Angular Developer',
  'Cloud Enthusiast',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typed = document.getElementById('typedText');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typed.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 40);
  } else {
    typed.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 80);
  }
}
setTimeout(typeLoop, 1400);

/* ===== REVEAL ON SCROLL ===== */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ===== EDUCATION PROGRESS BARS ===== */
const eduObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.edu-progress-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      eduObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.edu-card-new').forEach(el => eduObserver.observe(el));

/* ===== SKILL BARS ===== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count;
          if (count >= target) clearInterval(timer);
        }, 40);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.about-stats').forEach(el => counterObserver.observe(el));

/* ===== MOBILE MENU ===== */
const toggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.right = '24px';
  navLinks.style.background = 'rgba(10,10,15,0.97)';
  navLinks.style.border = '1px solid rgba(255,255,255,0.07)';
  navLinks.style.borderRadius = '12px';
  navLinks.style.padding = '20px 28px';
  navLinks.style.gap = '20px';
  navLinks.style.backdropFilter = 'blur(20px)';
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.style.display = 'none';
}));

/* ===== SMOOTH ACTIVE LINK ===== */
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : '';
  });
});
