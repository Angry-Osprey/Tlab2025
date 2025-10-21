// src/Portfolio.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';

class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.targetAngle = this.angle;
  }

  update(mouse, isMoving, birds, width, height, dt = 1) {
    // Gentle wandering (time-scaled)
    this.angle += (Math.random() - 0.5) * 0.15 * dt;
    this.vx += Math.cos(this.angle) * 0.15 * dt;
    this.vy += Math.sin(this.angle) * 0.15 * dt;

    // Mouse avoidance (time-scaled)
    const mdx = this.x - mouse.x;
    const mdy = this.y - mouse.y;
    const md = Math.hypot(mdx, mdy) || 1;
    if (isMoving && md < 200) {
      const force = ((200 - md) / 200) * 0.8 * dt;
      this.vx += (mdx / md) * force;
      this.vy += (mdy / md) * force;
    }

    // Flocking strength varies with mouse proximity (farther = stronger)
    let flockStrength = 0.267;
    if (isMoving && md < 500) flockStrength = (md / 300) * 0.05;

    // Neighborhood accumulators
    let avx = 0, avy = 0, aCount = 0; // alignment
    let cx = 0, cy = 0, cCount = 0;   // cohesion
    let sx = 0, sy = 0, sCount = 0;   // separation

    for (const other of birds) {
      if (other === this) continue;
      const dx = other.x - this.x;
      const dy = other.y - this.y;
      const d = Math.hypot(dx, dy);

      // Alignment: steer toward neighbors' average velocity
      if (d > 0 && d < 100) { avx += other.vx; avy += other.vy; aCount++; }

      // Cohesion: steer toward neighbors' centroid
      if (d > 0 && d < 150) { cx += other.x; cy += other.y; cCount++; }

      // Separation: push away if too close
      if (d > 0 && d < 40) { sx += (this.x - other.x) / d; sy += (this.y - other.y) / d; sCount++; }
    }

    if (aCount > 0) {
      // Average neighbor velocity
      avx /= aCount; avy /= aCount;
      // Steer toward that average (alignment); 0.05 is a gentle blend factor
      // Multiplied by flockStrength and dt to keep behavior stable across frame times
      this.vx += (avx - this.vx) * (0.05 * flockStrength) * dt;
      this.vy += (avy - this.vy) * (0.05 * flockStrength) * dt;
    }

    if (cCount > 0) {
      // Move slightly toward centroid (cohesion)
      cx /= cCount; cy /= cCount;
      this.vx += (cx - this.x) * 0.0008 * flockStrength * dt;
      this.vy += (cy - this.y) * 0.0008 * flockStrength * dt;
    }

    if (sCount > 0) {
      // Immediate repulsion to avoid overlap (separation)
      this.vx += sx * 0.05 * dt;
      this.vy += sy * 0.05 * dt;
    }

    // Time-based damping: ~0.92 per 60 fps frame
    const damping = Math.pow(0.92, dt);
    this.vx *= damping;
    this.vy *= damping;

    // Speed cap
    const speed = Math.hypot(this.vx, this.vy);
    const maxSpeed = 1.2;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }

    // Integrate position
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Rotate toward velocity (time-scaled)
    this.targetAngle = Math.atan2(this.vy, this.vx);
    let da = this.targetAngle - this.angle;
    while (da > Math.PI) da -= Math.PI * 2;
    while (da < -Math.PI) da += Math.PI * 2;
    this.angle += da * 0.08 * dt;

    // Screen wrap
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-4, 4);
    ctx.lineTo(-4, -4);
    ctx.closePath();
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }
}

export default function Portfolio() {
  // UI state (for labels/inputs, not used by RAF loop directly)
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // Refs used by the animation loop (so the loop doesn't re-create on state change)
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const movingRef = useRef(false);

  const canvasRef = useRef(null);
  const birdsRef = useRef([]);
  const mouseTimeoutRef = useRef(null);
  const lastTimeRef = useRef(performance.now());

  // Create birds once
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push(new Bird(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    }
    birdsRef.current = list;
  }, []);

  // Mouse handling
  useEffect(() => {
    const handleMouseMove = (e) => {
      const m = { x: e.clientX, y: e.clientY };
      setMousePosition(m);
      mouseRef.current = m;

      setIsMouseMoving(true);
      movingRef.current = true;

      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
        movingRef.current = false;
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
    };
  }, []);

  // Canvas + RAF loop (run once)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    // High-DPI setup
    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // cap 2x for perf
      const w = Math.floor(window.innerWidth);
      const h = Math.floor(window.innerHeight);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // keep drawing coords in CSS pixels
    };
    resize();
    window.addEventListener('resize', resize);

    const gridSize = 20;
    const glowRadius = 100;
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const now = performance.now();
      let dt = (now - lastTimeRef.current) / 16.6667; // 1 ≈ one 60fps frame
      lastTimeRef.current = now;
      dt = Math.min(2, Math.max(0.25, dt));

      // canvas size in CSS pixels after transform
      const t = ctx.getTransform();
      const w = canvas.width / (t.a || 1);
      const h = canvas.height / (t.d || 1);

      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my } = mouseRef.current;
      for (let x = 0; x < w; x += gridSize) {
        for (let y = 0; y < h; y += gridSize) {
          const dx = mx - x, dy = my - y;
          const distance = Math.hypot(dx, dy);
          if (distance < glowRadius) {
            const intensity = 1 - distance / glowRadius;
            ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.6})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);
          } else {
            ctx.fillStyle = 'rgba(255, 208, 0, 0.25)';
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
          }
        }
      }

      // birds
      for (const bird of birdsRef.current) {
        bird.update(mouseRef.current, movingRef.current, birdsRef.current, w, h, dt);
        bird.draw(ctx);
      }
    };

    lastTimeRef.current = performance.now();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, []);

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message received.');
    setFormData({ name: '', email: '', message: '' });
  };

  const projects = [
    {
      title: 'This Portfolio',
      description: 'Modern developer portfolio built with React, TailwindCSS, and Firebase, featuring dynamic project showcases, responsive design, and a clean, performant architecture.',
      tags: ['Firebase', 'React', 'Tailwindcss', 'Vite'],
      link: 'https://github.com/Angry-Osprey/Tlab2025'
    },
    {
      title: 'Comming Soon',
      description: 'This project is not quite ready yet.',
      tags: ['HL7 FHIR', 'Firestore', 'React'],
      link: '#'
    }
  ];

  const skills = ['C#', 'React', 'Node.js', 'Python', 'Firebase', 'WebGL', 'Unity6'];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="text-xl font-light tracking-wider text-gray-300">Tylers-Lab.dev</div>
              <div className="flex space-x-8">
                <a href="#work" className="text-gray-400 hover:text-white transition-colors">Work</a>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero (mobile-safe) */}
        <section className="min-h-dvh flex items-center justify-center px-4 pt-24 md:pt-28">
          <div className="max-w-5xl mx-auto p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="mb-6 text-gray-500 font-mono text-xs tracking-[0.18em] md:text-sm">
              DEVELOPER / VETERAN / BUILDER
            </div>

            <h1 className="font-bold leading-tight mb-8">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">TYLER</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-700">THOMPSON</span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Crafting digital experiences at the intersection of design and technology.
              Building the future, one line of code at a time.
            </p>

            <a
              href="#work"
              className="inline-flex items-center gap-3 text-white border rounded-2xl border-gray-700 px-6 py-3 sm:px-8 sm:py-4 hover:bg-white hover:text-black transition-all group"
            >
              <span className="text-base sm:text-lg">Explore Work</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="py-32 px-6">
          <div className="max-w-7xl mx-auto p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <h2 className="text-sm font-mono text-gray-500 mb-16 tracking-wider">PROJECTS</h2>
            <div className="space-y-12">
              {projects.map((project, index) => (
                <div key={index} className="group border rounded-2xl border-gray-800 p-8 hover:border-gray-600 transition-all bg-black/40">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-sm text-gray-600 font-mono mb-2">0{index + 1}</div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <a href={project.link} className="text-gray-600 hover:text-white transition-colors">
                      <ExternalLink size={24} />
                    </a>
                  </div>

                  <p className="text-gray-400 text-lg mb-6 max-w-2xl">{project.description}</p>

                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="border rounded-2xl border-gray-800 text-gray-500 px-4 py-2 text-sm font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-32 px-6 border-t backdrop-blur-sm border-gray-900">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-mono text-gray-500 mb-8 tracking-wider">ABOUT</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                My role as a software engineer involves developing sophisticated solutions to handle complex technical problems. 
                My professional experience spans work with web development and machine learning and systems architecture. 
                I worked as an Undergraduate Research Assistant at Lamar University to help develop mixed reality solutions through the HoloLens 2 project which combined innovative technology with real-world functionality. 
                My time in the United States Air Force 524th Special Operations Squadron under Air Force Special Operations Command (USSOCOM) has shown me how to stay precise and disciplined while being flexible. 
                The problem-solving abilities and team collaboration experience I developed in the Air Force help me design efficient systems and overcome technical challenges with focused dedication.
              </p>
              <p className="text-xl text-gray-400 leading-relaxed">
                Currently exploring the boundaries of what's possible with modern web technologies and pushing the
                limits of browser-based applications.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-mono text-gray-500 mb-8 tracking-wider">CAPABILITIES</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Tailwindcss', 'React', 'Node.js', 'Python', 'Firebase', 'WebGL', 'Java', 'C#'].map((skill, i) => (
                  <div key={i} className="border rounded-2xl border-gray-800 p-4 text-gray-400 hover:border-gray-600 hover:text-white transition-all">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 px-6 border-t border-gray-900">
          <div className="max-w-4xl backdrop-blur-xs p-5 border border-gray-900 rounded-2xl mx-auto">
            <h2 className="text-sm font-mono text-shadow-amber-300 mb-16 tracking-wider">GET IN TOUCH</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm mb-2 font-mono">NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border backdrop-blur-sm border-gray-800 px-6 py-4 text-white focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-mono">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent backdrop-blur-sm border border-gray-800 px-6 py-4 text-white focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-mono">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-transparent backdrop-blur-sm border border-gray-800 px-6 py-4 text-white focus:outline-none focus:border-gray-600 transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full backdrop-blur-sm border border-gray-700 px-8 py-4 text-white hover:bg-white hover:text-black transition-all font-mono"
              >
                SEND MESSAGE
              </button>
            </div>

            <div className="flex justify-center space-x-8 mt-16">
              <a href="https://github.com/Angry-Osprey" target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/tyler-thompson-429305146/" target='_blank' rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="mailto:tylerthompson508@gmail.com" className="text-gray-600 hover:text-white transition-colors"><Mail size={24} /></a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-900 backdrop-blur-sm py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-600 text-sm">
            <div>© 2025 ALL RIGHTS RESERVED</div>
            <div className="font-mono">BUILT WITH REACT + FIREBASE</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
