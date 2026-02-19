// ==========================================
// 1. LINUX BOOT PRELOADER & SYSTEM INIT
// ==========================================
const bootLogs = [
    "Initializing Kernel...",
    "Mounting VFS: rootfs on / ready.",
    "Starting system logger...",
    "Starting kernel event manager...",
    "Loading IT Infrastructure modules: OK",
    "Loading Cyber Threat Protocols: OK",
    "Loading Digital Strategy Architectures: OK",
    "Mounting Network Systems: SUCCESS",
    "Bypassing standard limits... [Overridden]",
    "Executing JeffreyOS v2.0..."
];

window.addEventListener('load', () => {
    const bootText = document.getElementById('boot-text');
    const loaderContent = document.getElementById('loader-content');
    const preloader = document.getElementById('preloader');
    
    let delay = 0;
    bootLogs.forEach((log, index) => {
        setTimeout(() => {
            bootText.innerHTML += `<div>[${(Math.random() * 2 + 1).toFixed(4)}] ${log}</div>`;
            bootText.scrollTop = bootText.scrollHeight;
        }, delay);
        delay += Math.random() * 150 + 50;
    });

    setTimeout(() => {
        bootText.style.display = 'none';
        loaderContent.style.opacity = '1';
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1500);
    }, delay + 300);
});

// ==========================================
// 2. INTERACTIVE CANVAS (NEURAL NETWORK)
// ==========================================
const canvas = document.getElementById('network-canvas');
if(window.innerWidth > 992) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y;
            this.directionX = directionX; this.directionY = directionY;
            this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;
            let color = 'rgba(0, 229, 255, 0.5)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(138, 43, 226, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
            // Mouse connection
            if(mouse.x != null) {
                let distMouse = ((particlesArray[a].x - mouse.x) ** 2) + ((particlesArray[a].y - mouse.y) ** 2);
                if(distMouse < 25000) {
                    ctx.strokeStyle = `rgba(0, 229, 255, ${1 - distMouse/25000})`;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
        connect();
    }
    initParticles();
    animate();
}

// ==========================================
// 3. FULLY PLAYABLE DRAGGABLE TERMINAL
// ==========================================
const termToggle = document.getElementById('terminal-toggle');
const termWindow = document.getElementById('terminal-window');
const termClose = document.getElementById('terminal-close');
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('terminal-output');
const termHeader = document.getElementById('terminal-header');

termToggle.addEventListener('click', () => {
    termWindow.classList.toggle('active');
    termInput.focus();
});
termClose.addEventListener('click', () => { termWindow.classList.remove('active'); });
termWindow.addEventListener('click', () => { termInput.focus(); }); // Keep focus

termInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        let command = this.value.trim().toLowerCase();
        let response = "";
        
        termOutput.innerHTML += `<p><span class="term-cmd">$ jeffrey:~#</span> ${this.value}</p>`;
        
        switch(command) {
            case "help":
                response = "Available commands: <br>- <b>whoami</b>: Display architect info<br>- <b>skills</b>: Show tech stack<br>- <b>contact</b>: Get communication protocols<br>- <b>clear</b>: Clear terminal";
                break;
            case "whoami":
                response = "Ibrahim (Jeffrey). IT Architect & Digital Strategist. Building systems, not following them.";
                break;
            case "skills":
                response = "[IT Operations] [Linux Admin] [Cyber Threat Intel] [CRM Architecture] [SEO/Growth]";
                break;
            case "contact":
                response = "Email: jeffreysec01@gmail.com | LinkedIn: /in/0x6558f";
                break;
            case "sudo":
                response = "<span class='term-err'>Error: This incident will be reported. You are not root.</span>";
                break;
            case "clear":
                termOutput.innerHTML = "";
                response = "";
                break;
            case "":
                break;
            default:
                response = `<span class='term-err'>Command not found: ${command}. Type 'help' for options.</span>`;
        }
        
        if(response !== "") termOutput.innerHTML += `<p>${response}</p>`;
        this.value = "";
        
        // Auto scroll to bottom
        const termBody = document.getElementById('terminal-body');
        termBody.scrollTop = termBody.scrollHeight;
    }
});

// Drag Logic
let isDragging = false, currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
termHeader.addEventListener('mousedown', dragStart);
document.addEventListener('mouseup', dragEnd);
document.addEventListener('mousemove', drag);

function dragStart(e) {
    initialX = e.clientX - xOffset; initialY = e.clientY - yOffset;
    if (e.target === termHeader || e.target.parentElement === termHeader) isDragging = true;
}
function dragEnd() { initialX = currentX; initialY = currentY; isDragging = false; }
function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX; currentY = e.clientY - initialY;
        xOffset = currentX; yOffset = currentY;
        termWindow.style.right = 'auto'; termWindow.style.bottom = 'auto';
        termWindow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
}

// ==========================================
// 4. CUSTOM CURSOR & MAGNETIC BUTTONS
// ==========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverTargets = document.querySelectorAll('.hover-target, a, button, .social-card, .cert-card, .project-card, .timeline-item');

if(window.innerWidth > 992) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`; cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 150, fill: "forwards" });
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => { cursorDot.classList.add('hovered'); cursorOutline.classList.add('hovered'); });
        target.addEventListener('mouseleave', () => { cursorDot.classList.remove('hovered'); cursorOutline.classList.remove('hovered'); });
    });

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const pos = btn.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0px, 0px)'; });
    });

    // 3D Tilt
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;  
            const cX = rect.width / 2; const cY = rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${((y - cY) / cY) * -5}deg) rotateY(${((x - cX) / cX) * 5}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`; });
    });
}

// ==========================================
// 5. NAV, SCROLL REVEAL & TYPING
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(i => i.addEventListener('click', () => navLinks.classList.remove('active')));

const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    window.scrollY > 50 ? navbar.classList.add('sticky') : navbar.classList.remove('sticky');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

const roles = ["IT Operations Specialist.", "Digital Strategist.", "CRM Architect.", "Cybersecurity Enthusiast."];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
    const cur = roles[roleIdx];
    isDeleting ? charIdx-- : charIdx++;
    typedEl.textContent = cur.substring(0, charIdx);
    
    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIdx === cur.length) { speed = 2000; isDeleting = true; } 
    else if (isDeleting && charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; speed = 400; }
    setTimeout(type, speed);
}
document.addEventListener('DOMContentLoaded', type);

const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('active');
            if (e.target.classList.contains('skill-category')) {
                e.target.querySelectorAll('.progress-fill').forEach(f => f.style.width = f.getAttribute('data-target'));
            }
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Easter Egg
console.log("%cJeffreyOS Initialized.", "color: #00e5ff; font-size: 20px; font-weight: bold; font-family: monospace;");
console.log("%cFind the vulnerability. Secure the system. Architect the future.", "color: #4ade80; font-size: 14px; font-family: monospace;");