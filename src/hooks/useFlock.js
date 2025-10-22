import { useEffect, useRef } from "react";
import { Bird, Predator } from "../lib/flock";

export default function UseFlock(canvasRef, { birdCount = 100, predatorCount = 3 } = {}){

    // UI state (for labels/inputs, not used by RAF loop directly)
      const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      const [isMouseMoving, setIsMouseMoving] = useState(false);
    
      // Refs used by the animation loop (so the loop doesn't re-create on state change)
      const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      const movingRef = useRef(false);
      const predRef = useRef([])
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
    
      //pred birds
      useEffect(() => {
        const plist = [];
        for (let i = 0; i < 3; i++) {
          plist.push(new Pred(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
        }
        predRef.current = plist;
      }, []);

}



// TODO FINISH COMPARTMENTALIZING