import { useEffect, useState, useRef } from "react";

export const CursorEffect = () => {
    const [trail, setTrail] = useState([]);
    const [isTouchDevice, setIsTouchDevice] = useState(true);
    const mousePos = useRef({ x: 0, y: 0 });
    const trailPoints = useRef([]);
    const animationRef = useRef(null);
    const isMoving = useRef(false);
    const lastMoveTime = useRef(Date.now());

    // Check if touch device
    useEffect(() => {
        const checkDevice = () => {
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const isSmallScreen = window.innerWidth < 768;
            setIsTouchDevice(hasTouch && hasCoarsePointer || isSmallScreen);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Animation loop for smooth trail
    useEffect(() => {
        if (isTouchDevice) return;

        const maxPoints = 50;
        const fadeSpeed = 0.02;

        const animate = () => {
            const now = Date.now();
            const timeSinceMove = now - lastMoveTime.current;

            // Add new point if mouse is moving
            if (isMoving.current) {
                trailPoints.current.unshift({
                    x: mousePos.current.x,
                    y: mousePos.current.y,
                    opacity: 1,
                });

                // Limit trail length
                if (trailPoints.current.length > maxPoints) {
                    trailPoints.current = trailPoints.current.slice(0, maxPoints);
                }
            }

            // Fade out points (faster when not moving)
            const currentFadeSpeed = timeSinceMove > 100 ? fadeSpeed * 2.5 : fadeSpeed;
            trailPoints.current = trailPoints.current
                .map((point, index) => ({
                    ...point,
                    opacity: point.opacity - currentFadeSpeed - (index * 0.001),
                }))
                .filter((point) => point.opacity > 0);

            setTrail([...trailPoints.current]);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isTouchDevice]);

    // Track mouse movement
    useEffect(() => {
        if (isTouchDevice) return;

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            isMoving.current = true;
            lastMoveTime.current = Date.now();

            // Reset moving flag after a short delay
            setTimeout(() => {
                isMoving.current = false;
            }, 30);
        };

        const handleMouseLeave = () => {
            isMoving.current = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isTouchDevice]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    // Generate flame shape path
    const generateFlamePath = () => {
        if (trail.length < 3) return null;

        // Smooth the points using Catmull-Rom interpolation
        const smoothedPoints = [];
        for (let i = 0; i < trail.length; i++) {
            smoothedPoints.push(trail[i]);
            
            // Add interpolated points between each pair
            if (i < trail.length - 1) {
                const p0 = trail[Math.max(0, i - 1)];
                const p1 = trail[i];
                const p2 = trail[i + 1];
                const p3 = trail[Math.min(trail.length - 1, i + 2)];
                
                for (let t = 0.33; t < 1; t += 0.33) {
                    const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t);
                    const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t);
                    const opacity = p1.opacity + (p2.opacity - p1.opacity) * t;
                    smoothedPoints.push({ x, y, opacity });
                }
            }
        }

        // Create ribbon shape with varying width
        const leftEdge = [];
        const rightEdge = [];
        
        for (let i = 0; i < smoothedPoints.length; i++) {
            const point = smoothedPoints[i];
            const progress = i / smoothedPoints.length;
            
            // Width tapers from thick to thin (flame shape)
            const width = Math.max(8 * (1 - progress * 0.95), 0.5);
            
            // Calculate perpendicular direction
            let dx, dy;
            if (i < smoothedPoints.length - 1) {
                dx = smoothedPoints[i + 1].x - point.x;
                dy = smoothedPoints[i + 1].y - point.y;
            } else {
                dx = point.x - smoothedPoints[i - 1].x;
                dy = point.y - smoothedPoints[i - 1].y;
            }
            
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;
            
            leftEdge.push({
                x: point.x + nx * width,
                y: point.y + ny * width,
            });
            rightEdge.push({
                x: point.x - nx * width,
                y: point.y - ny * width,
            });
        }

        // Build the path with rounded head
        const firstLeft = leftEdge[0];
        const firstRight = rightEdge[0];
        const headPoint = smoothedPoints[0];
        
        // Start with rounded head (semicircle at the front)
        let path = `M ${firstLeft.x} ${firstLeft.y}`;
        
        // Rounded cap at head using arc
        const headRadius = Math.sqrt(
            Math.pow(firstLeft.x - headPoint.x, 2) + 
            Math.pow(firstLeft.y - headPoint.y, 2)
        );
        path += ` A ${headRadius} ${headRadius} 0 0 1 ${firstRight.x} ${firstRight.y}`;
        
        // Right edge (forward toward tail)
        for (let i = 1; i < rightEdge.length; i++) {
            path += ` L ${rightEdge[i].x} ${rightEdge[i].y}`;
        }
        
        // Tip (pointed/rounded at tail)
        const lastLeft = leftEdge[leftEdge.length - 1];
        const lastRight = rightEdge[rightEdge.length - 1];
        const lastPoint = smoothedPoints[smoothedPoints.length - 1];
        path += ` Q ${lastPoint.x} ${lastPoint.y} ${lastLeft.x} ${lastLeft.y}`;
        
        // Left edge (backward toward head)
        for (let i = leftEdge.length - 2; i >= 0; i--) {
            path += ` L ${leftEdge[i].x} ${leftEdge[i].y}`;
        }
        
        path += ' Z';
        
        return path;
    };

    const flamePath = generateFlamePath();

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            <svg className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="flameGradient" gradientUnits="userSpaceOnUse"
                        x1={trail[0]?.x || 0} y1={trail[0]?.y || 0}
                        x2={trail[trail.length - 1]?.x || 0} y2={trail[trail.length - 1]?.y || 0}>
                        <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
                        <stop offset="30%" stopColor="#a78bfa" stopOpacity="0.7" />
                        <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                    <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <radialGradient id="cursorGlow">
                        <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Flame trail */}
                {flamePath && (
                    <path
                        d={flamePath}
                        fill="url(#flameGradient)"
                        filter="url(#flameGlow)"
                        opacity={trail[0]?.opacity || 0}
                    />
                )}

                {/* Persistent glow circle at cursor */}
                <circle
                    cx={mousePos.current.x}
                    cy={mousePos.current.y}
                    r={8}
                    fill="url(#cursorGlow)"
                    filter="url(#flameGlow)"
                />
            </svg>
        </div>
    );
};

// Catmull-Rom interpolation for smooth curves
function catmullRom(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (
        2 * p1 +
        (-p0 + p2) * t +
        (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
        (-p0 + 3 * p1 - 3 * p2 + p3) * t3
    );
}
