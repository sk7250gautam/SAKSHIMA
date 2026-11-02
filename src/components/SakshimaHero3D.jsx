import React, { useEffect, useRef } from "react";

export default function SakshimaHero3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouse tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = y * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Generate 3D Sphere Vertices (Fibonacci Sphere algorithm for uniform distribution)
    const NUM_VERTICES = 72;
    const sphereRadius = 145;
    const vertices = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < NUM_VERTICES; i++) {
      const y = 1 - (i / (NUM_VERTICES - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      vertices.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        origX: x * sphereRadius,
        origY: y * sphereRadius,
        origZ: z * sphereRadius,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Outer Orbital Ring Points
    const NUM_ORBIT_POINTS = 36;
    const orbitRing1 = [];
    const orbitRing2 = [];
    const orbitRadius1 = 205;
    const orbitRadius2 = 230;

    for (let i = 0; i < NUM_ORBIT_POINTS; i++) {
      const angle = (i / NUM_ORBIT_POINTS) * Math.PI * 2;
      orbitRing1.push({
        x: Math.cos(angle) * orbitRadius1,
        y: Math.sin(angle) * orbitRadius1 * 0.35,
        z: Math.sin(angle) * orbitRadius1
      });
      orbitRing2.push({
        x: Math.sin(angle) * orbitRadius2 * 0.4,
        y: Math.cos(angle) * orbitRadius2,
        z: Math.sin(angle) * orbitRadius2
      });
    }

    // Floating Ambient Dust Particles in 3D Space
    const NUM_PARTICLES = 60;
    const particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    // Rotation angles
    let rotX = 0.2;
    let rotY = 0.4;
    let rotZ = 0;
    let clock = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = Math.max(rect.height, 460);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // 3D Projection Helper
    const focalLength = 480;
    const project = (x, y, z, cx, cy) => {
      const distance = focalLength + z;
      if (distance <= 10) return null;
      const scale = focalLength / distance;
      return {
        x: cx + x * scale,
        y: cy + y * scale,
        scale,
        depth: z
      };
    };

    // Render loop
    const render = () => {
      clock += prefersReducedMotion ? 0.002 : 0.012;

      // Smooth mouse follow (lerp)
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!prefersReducedMotion) {
        rotY += 0.006 + currentMouseX * 0.01;
        rotX = 0.25 + currentMouseY * 0.25;
        rotZ = Math.sin(clock * 0.5) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Precalculate trig for rotation matrix
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      const rotate = (x, y, z) => {
        // Y rotation
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;
        // X rotation
        let y2 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;
        // Z rotation
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = y2 * cosZ + x1 * sinZ;
        return { x: x3, y: y3, z: z2 };
      };

      // 1. Draw Ambient Floating 3D Dust Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          if (p.x > 300) p.x = -300;
          if (p.x < -300) p.x = 300;
          if (p.y > 300) p.y = -300;
          if (p.y < -300) p.y = 300;
          if (p.z > 250) p.z = -250;
          if (p.z < -250) p.z = 250;
        }

        const pr = project(p.x, p.y, p.z, cx, cy);
        if (pr) {
          const brightness = Math.max(0.1, (pr.depth + 250) / 500);
          ctx.beginPath();
          ctx.arc(pr.x, pr.y, p.size * pr.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 163, 255, ${p.alpha * brightness * 0.5})`;
          ctx.fill();
        }
      }

      // 2. Draw Digital Central Core Glow (Radial gradient backplate)
      const coreGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, sphereRadius * 1.3);
      coreGlow.addColorStop(0, "rgba(0, 163, 255, 0.22)");
      coreGlow.addColorStop(0.4, "rgba(0, 102, 255, 0.12)");
      coreGlow.addColorStop(0.8, "rgba(0, 163, 255, 0.03)");
      coreGlow.addColorStop(1, "rgba(3, 5, 10, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // 3. Transform and project sphere vertices
      const projected = [];
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        // Subtle rhythmic pulse
        const pulse = Math.sin(clock * 2 + v.pulseOffset) * 4;
        const rad = sphereRadius + pulse;
        const factor = rad / sphereRadius;

        const rotated = rotate(v.origX * factor, v.origY * factor, v.origZ * factor);
        const p = project(rotated.x, rotated.y, rotated.z, cx, cy);
        if (p) {
          projected.push({ ...p, origIndex: i, depth: rotated.z });
        }
      }

      // Sort by depth (painter's algorithm)
      projected.sort((a, b) => a.depth - b.depth);

      // 4. Draw connecting wireframe lines between adjacent nodes
      const maxConnectDist = 65;
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const avgDepth = (p1.depth + p2.depth) / 2;
            const depthFactor = (avgDepth + sphereRadius) / (sphereRadius * 2);
            const alpha = (1 - dist / maxConnectDist) * Math.max(0.08, depthFactor * 0.45);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 163, 255, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // 5. Draw the glowing vertices
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthFactor = Math.max(0.15, (p.depth + sphereRadius) / (sphereRadius * 2));
        const radius = Math.max(1.2, 3.2 * p.scale * depthFactor);

        // Outer glow
        if (depthFactor > 0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 163, 255, ${0.25 * depthFactor})`;
          ctx.fill();
        }

        // Inner core point
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = depthFactor > 0.7 ? "#FFFFFF" : `rgba(0, 163, 255, ${depthFactor})`;
        ctx.fill();
      }

      // 6. Draw Outer Holographic Orbital Ring 1 (with digital ticks)
      ctx.lineWidth = 1.2;
      const ring1Projected = [];
      for (let i = 0; i < orbitRing1.length; i++) {
        const pt = orbitRing1[i];
        // Rotate ring on independent axis
        const cosR = Math.cos(clock * 0.3);
        const sinR = Math.sin(clock * 0.3);
        const rx = pt.x * cosR - pt.z * sinR;
        const rz = pt.z * cosR + pt.x * sinR;
        const rot = rotate(rx, pt.y, rz);
        const pr = project(rot.x, rot.y, rot.z, cx, cy);
        if (pr) ring1Projected.push({ ...pr, depth: rot.z });
      }

      if (ring1Projected.length > 2) {
        ctx.beginPath();
        ctx.moveTo(ring1Projected[0].x, ring1Projected[0].y);
        for (let i = 1; i < ring1Projected.length; i++) {
          ctx.lineTo(ring1Projected[i].x, ring1Projected[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(0, 163, 255, 0.22)";
        ctx.stroke();

        // Data nodes along the ring
        const activeNodeIndex = Math.floor((clock * 12) % ring1Projected.length);
        const activeNode = ring1Projected[activeNodeIndex];
        if (activeNode) {
          ctx.beginPath();
          ctx.arc(activeNode.x, activeNode.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#00A3FF";
          ctx.shadowColor = "#00A3FF";
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="sakshima-3d-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="sakshima-3d-canvas" />
    </div>
  );
}
