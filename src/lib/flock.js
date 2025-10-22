// lib/flock.js
class Pred {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.targetAngle = this.angle;
  }
  update(Pred, width, height, dt = 1) {
    //pred wandering
    this.angle += (Math.random() - 0.5) * 0.15 * dt;
    this.vx += Math.cos(this.angle) * 0.15 * dt;
    this.vy += Math.sin(this.angle) * 0.15 * dt;

    //speed constraint
    const speed = Math.hypot(this.vx, this.vy);
    const maxSpeed = 2;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }
    //movement
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    //screen wrap
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
    ctx.fillStyle = '#990202';
    ctx.fill();
    ctx.strokeStyle = '#990202';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }
}
// flocking birds (yellow)
class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.targetAngle = this.angle;
  }

  update(mouse, isMoving, birds, preds, width, height, dt = 1) {
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
    // Pred avoidance (time-scaled)
    for (const pred of preds) {
      const dx = this.x - pred.x;
      const dy = this.y - pred.y;
      const dist = Math.hypot(dx, dy) || 1;

      if (dist < 200) {
        const force = ((200 - dist) / 200) * 0.8 * dt;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
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
      // Immediate repulsion 
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