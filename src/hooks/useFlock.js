// hooks/useFlock.js
import { useEffect, useRef } from "react";
import { Bird, Predator } from "@/lib/flock.js";

export function useFlock(canvasRef, { birdCount = 100, predatorCount = 3 } = {}) {
    const birdsRef = useRef([]);
    const predatorsRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const movingRef = useRef(false);
    const mouseTimeoutRef = useRef(null);
    const lastTimeRef = useRef(typeof performance !== "undefined" ? performance.now() : 0);
    const ctxRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: true });
        ctxRef.current = ctx;

        const init = () => {
            birdsRef.current = Array.from({ length: birdCount }, () =>
                new Bird(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
            );
            predatorsRef.current = Array.from({ length: predatorCount }, () =>
                new Predator(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
            );
            mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        };

        const resize = () => {
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            const w = Math.floor(window.innerWidth);
            const h = Math.floor(window.innerHeight);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const onMove = e => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            movingRef.current = true;
            if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
            mouseTimeoutRef.current = setTimeout(() => { movingRef.current = false; }, 300);
        };

        init();
        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);

        let reqId;
        const gridSize = 20;
        const glowRadius = 100;

        const animate = () => {
            reqId = requestAnimationFrame(animate);

            const now = performance.now();
            let dt = (now - lastTimeRef.current) / 16.6667;
            lastTimeRef.current = now;
            dt = Math.min(2, Math.max(0.25, dt));

            const t = ctx.getTransform();
            const w = canvas.width / (t.a || 1);
            const h = canvas.height / (t.d || 1);

            ctx.clearRect(0, 0, w, h);

            // grid glow
            const { x: mx, y: my } = mouseRef.current;
            for (let x = 0; x < w; x += gridSize) {
                for (let y = 0; y < h; y += gridSize) {
                    const dx = mx - x, dy = my - y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < glowRadius) {
                        const k = 1 - dist / glowRadius;
                        ctx.fillStyle = `rgba(255,255,255,${k * 0.6})`;
                        ctx.fillRect(x - 1, y - 1, 2, 2);
                    } else {
                        ctx.fillStyle = "rgba(255,208,0,0.25)";
                        ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
                    }
                }
            }

            for (const b of birdsRef.current) {
                b.update(mouseRef.current, movingRef.current, birdsRef.current, predatorsRef.current, w, h, dt);
                b.draw(ctx);
            }
            for (const p of predatorsRef.current) {
                p.update(w, h, dt, birdsRef.current);
                p.draw(ctx);
            }
        };

        lastTimeRef.current = performance.now();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
            if (reqId) cancelAnimationFrame(reqId);
        };
    }, [canvasRef, birdCount, predatorCount]);
}
