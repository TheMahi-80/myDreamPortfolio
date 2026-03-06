const textArray = [
  "ML Engineer.",
  "AI Researcher.",
  "Tech Entrepreneur.",
  "Neurotech Enthusiast.",
];

let textIndex = 0;
let charIndex = 0;

const typingElement = document.querySelector(".typing-text");

function type() {
  if (charIndex < textArray[textIndex].length) {
    typingElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;

    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = textArray[textIndex].substring(
      0,
      charIndex - 1,
    );
    charIndex--;

    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % textArray.length;

    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".scroll-anim").forEach((el) => observer.observe(el));

const canvas = document.getElementById("canvas-container");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

let mouse = { x: null, y: null, radius: 150 };

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 2 + 1;

    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fillStyle = "#64ffda";

    ctx.fill();
  }
}

function init() {
  particlesArray = [];

  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();

        ctx.strokeStyle = `rgba(100,255,218,${1 - distance / 100})`;

        ctx.lineWidth = 0.5;

        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);

        ctx.stroke();
      }
    }

    if (mouse.x != null) {
      const dx = particlesArray[i].x - mouse.x;
      const dy = particlesArray[i].y - mouse.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        ctx.beginPath();

        ctx.strokeStyle = `rgba(100,255,218,${1 - distance / mouse.radius})`;

        ctx.lineWidth = 1;

        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(mouse.x, mouse.y);

        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

init();
animate();
