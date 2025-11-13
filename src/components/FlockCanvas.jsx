// components/FlockCanvas.jsx
import React, { useRef } from "react";
import { useFlock } from "@/hooks/useFlock.js";

export default function FlockCanvas(props) {
    const canvasRef = useRef(null);
    useFlock(canvasRef, props);
    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            aria-hidden="true"
        />
    );
}
