import { useState, useEffect, useRef } from "react";

// Smooth easing functions for buttery animations
const easing = {
    // Smooth exponential ease out - very fluid
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    // Smooth cubic ease in-out
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    // Super smooth sine ease
    easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    // Gentle elastic for subtle bounce
    gentleElastic: (t) => {
        const c4 = (2 * Math.PI) / 4.5;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
};

// Smooth interpolation helper
const lerp = (start, end, factor) => start + (end - start) * factor;

// Smooth angle interpolation (handles wrapping)
const lerpAngle = (start, end, factor) => {
    let diff = end - start;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return start + diff * factor;
};

// Spaceship and Meteor Animation Component
export const SpaceshipDodgingMeteors = () => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 350 });
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Observe theme changes
    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        
        checkTheme();
        
        // MutationObserver to watch for class changes on html element
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let lastTime = performance.now();
        
        // Stars array for background
        const stars = [];
        const starCount = 50;
        
        // Initialize stars
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                size: 0.5 + Math.random() * 2,
                twinkleSpeed: 0.5 + Math.random() * 2,
                twinkleOffset: Math.random() * Math.PI * 2,
                baseOpacity: 0.3 + Math.random() * 0.5
            });
        }
        
        // Spaceship state with velocity for smooth physics
        const spaceship = {
            x: dimensions.width / 2,
            y: dimensions.height / 2,
            vx: 0,
            vy: 0,
            targetX: dimensions.width / 2,
            targetY: dimensions.height / 2,
            width: 40,
            height: 50,
            angle: 0,
            targetAngle: 0,
            thrusterPhase: 0,
            thrusterIntensity: 0.5,
            // Trail history for smooth motion blur effect
            trail: []
        };

        // Meteors array
        const meteors = [];
        const meteorCount = 5;

        // Initialize meteors with staggered timing
        for (let i = 0; i < meteorCount; i++) {
            setTimeout(() => {
                if (meteors.length < meteorCount) {
                    meteors.push(createMeteor());
                }
            }, i * 400);
        }

        function createMeteor() {
            const side = Math.floor(Math.random() * 4);
            let x, y, vx, vy;
            const baseSpeed = 0.8 + Math.random() * 1.2;
            
            switch(side) {
                case 0: // top
                    x = Math.random() * dimensions.width;
                    y = -60;
                    vx = (Math.random() - 0.5) * baseSpeed * 0.5;
                    vy = baseSpeed;
                    break;
                case 1: // right
                    x = dimensions.width + 60;
                    y = Math.random() * dimensions.height;
                    vx = -baseSpeed;
                    vy = (Math.random() - 0.5) * baseSpeed * 0.5;
                    break;
                case 2: // bottom
                    x = Math.random() * dimensions.width;
                    y = dimensions.height + 60;
                    vx = (Math.random() - 0.5) * baseSpeed * 0.5;
                    vy = -baseSpeed;
                    break;
                default: // left
                    x = -60;
                    y = Math.random() * dimensions.height;
                    vx = baseSpeed;
                    vy = (Math.random() - 0.5) * baseSpeed * 0.5;
            }

            const radius = 12 + Math.random() * 20;
            
            // Pre-calculate meteor shape points for consistent rendering
            const shapePoints = [];
            const points = 10;
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const variance = 0.75 + Math.random() * 0.25;
                shapePoints.push({
                    angle,
                    radius: variance
                });
            }

            return {
                x, y, vx, vy,
                // Smooth velocity tracking
                smoothX: x,
                smoothY: y,
                radius,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                shapePoints,
                // Trail positions for smooth motion blur
                trail: [],
                trailMaxLength: 8,
                craters: Array.from({length: 2 + Math.floor(Math.random() * 3)}, () => ({
                    offsetX: (Math.random() - 0.5) * 0.5,
                    offsetY: (Math.random() - 0.5) * 0.5,
                    size: 0.12 + Math.random() * 0.15
                })),
                // Glow pulsation
                glowPhase: Math.random() * Math.PI * 2
            };
        }

        function drawMeteor(meteor, time) {
            // Draw smooth trail first (behind meteor)
            if (meteor.trail.length > 1) {
                const speed = Math.sqrt(meteor.vx * meteor.vx + meteor.vy * meteor.vy);
                const trailAngle = Math.atan2(-meteor.vy, -meteor.vx);
                
                for (let i = 0; i < meteor.trail.length - 1; i++) {
                    const t = i / meteor.trail.length;
                    const nextT = (i + 1) / meteor.trail.length;
                    const alpha = (1 - t) * 0.4;
                    const nextAlpha = (1 - nextT) * 0.4;
                    const width = meteor.radius * (1 - t * 0.7);
                    const nextWidth = meteor.radius * (1 - nextT * 0.7);
                    
                    const pos = meteor.trail[i];
                    const nextPos = meteor.trail[i + 1];
                    
                    // Create smooth gradient trail segment
                    const gradient = ctx.createLinearGradient(pos.x, pos.y, nextPos.x, nextPos.y);
                    gradient.addColorStop(0, `rgba(255, ${120 + t * 80}, ${50 + t * 50}, ${alpha})`);
                    gradient.addColorStop(1, `rgba(255, ${120 + nextT * 80}, ${50 + nextT * 50}, ${nextAlpha})`);
                    
                    ctx.beginPath();
                    ctx.moveTo(
                        pos.x + Math.cos(trailAngle + Math.PI/2) * width * 0.4,
                        pos.y + Math.sin(trailAngle + Math.PI/2) * width * 0.4
                    );
                    ctx.lineTo(
                        nextPos.x + Math.cos(trailAngle + Math.PI/2) * nextWidth * 0.4,
                        nextPos.y + Math.sin(trailAngle + Math.PI/2) * nextWidth * 0.4
                    );
                    ctx.lineTo(
                        nextPos.x + Math.cos(trailAngle - Math.PI/2) * nextWidth * 0.4,
                        nextPos.y + Math.sin(trailAngle - Math.PI/2) * nextWidth * 0.4
                    );
                    ctx.lineTo(
                        pos.x + Math.cos(trailAngle - Math.PI/2) * width * 0.4,
                        pos.y + Math.sin(trailAngle - Math.PI/2) * width * 0.4
                    );
                    ctx.closePath();
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }
            
            // Outer glow effect
            const glowPulse = 0.7 + Math.sin(meteor.glowPhase + time * 0.003) * 0.3;
            const outerGlow = ctx.createRadialGradient(
                meteor.smoothX, meteor.smoothY, meteor.radius * 0.5,
                meteor.smoothX, meteor.smoothY, meteor.radius * 2
            );
            outerGlow.addColorStop(0, `rgba(255, 100, 50, ${0.3 * glowPulse})`);
            outerGlow.addColorStop(0.5, `rgba(255, 80, 30, ${0.15 * glowPulse})`);
            outerGlow.addColorStop(1, 'rgba(255, 60, 20, 0)');
            
            ctx.beginPath();
            ctx.arc(meteor.smoothX, meteor.smoothY, meteor.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = outerGlow;
            ctx.fill();
            
            ctx.save();
            ctx.translate(meteor.smoothX, meteor.smoothY);
            ctx.rotate(meteor.rotation);

            // Main meteor body with smoother gradient
            const gradient = ctx.createRadialGradient(
                -meteor.radius * 0.25, -meteor.radius * 0.25, 0,
                0, 0, meteor.radius
            );
            gradient.addColorStop(0, '#A08060');
            gradient.addColorStop(0.3, '#8B7355');
            gradient.addColorStop(0.6, '#6B5344');
            gradient.addColorStop(1, '#4A3728');

            // Draw smooth meteor shape using pre-calculated points
            ctx.beginPath();
            meteor.shapePoints.forEach((point, i) => {
                const r = meteor.radius * point.radius;
                const px = Math.cos(point.angle) * r;
                const py = Math.sin(point.angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else {
                    // Use quadratic curves for smoother edges
                    const prevPoint = meteor.shapePoints[i - 1];
                    const prevR = meteor.radius * prevPoint.radius;
                    const prevPx = Math.cos(prevPoint.angle) * prevR;
                    const prevPy = Math.sin(prevPoint.angle) * prevR;
                    const cpx = (prevPx + px) / 2 + (Math.random() - 0.5) * 2;
                    const cpy = (prevPy + py) / 2 + (Math.random() - 0.5) * 2;
                    ctx.quadraticCurveTo(cpx, cpy, px, py);
                }
            });
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Subtle edge highlight
            ctx.strokeStyle = 'rgba(160, 140, 120, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw craters with softer edges
            meteor.craters.forEach(crater => {
                const craterX = crater.offsetX * meteor.radius;
                const craterY = crater.offsetY * meteor.radius;
                const craterSize = crater.size * meteor.radius;
                
                const craterGradient = ctx.createRadialGradient(
                    craterX - craterSize * 0.2, craterY - craterSize * 0.2, 0,
                    craterX, craterY, craterSize
                );
                craterGradient.addColorStop(0, '#3D2D1E');
                craterGradient.addColorStop(0.7, '#2D2118');
                craterGradient.addColorStop(1, '#4A3728');
                
                ctx.beginPath();
                ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
                ctx.fillStyle = craterGradient;
                ctx.fill();
            });

            ctx.restore();
        }

        function drawSpaceship(time) {
            // Draw rocket trail/exhaust history for motion blur effect
            if (spaceship.trail.length > 1) {
                for (let i = 0; i < spaceship.trail.length - 1; i++) {
                    const t = i / spaceship.trail.length;
                    const alpha = (1 - t) * 0.15;
                    const pos = spaceship.trail[i];
                    
                    ctx.save();
                    ctx.translate(pos.x, pos.y);
                    ctx.rotate(pos.angle);
                    ctx.globalAlpha = alpha;
                    
                    // Ghost ship silhouette
                    ctx.beginPath();
                    ctx.moveTo(0, -25);
                    ctx.bezierCurveTo(12, -15, 15, 5, 12, 20);
                    ctx.lineTo(-12, 20);
                    ctx.bezierCurveTo(-15, 5, -12, -15, 0, -25);
                    ctx.closePath();
                    ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
                    ctx.fill();
                    
                    ctx.restore();
                }
            }
            
            ctx.save();
            ctx.translate(spaceship.x, spaceship.y);
            ctx.rotate(spaceship.angle);

            // Smooth thruster animation
            spaceship.thrusterPhase += 0.15;
            const thrusterWave = Math.sin(spaceship.thrusterPhase);
            const thrusterWave2 = Math.sin(spaceship.thrusterPhase * 1.7 + 1);
            const flameLength = 18 + thrusterWave * 6 + thrusterWave2 * 4;
            const flameWidth = 8 + thrusterWave * 2;
            
            // Outer glow for thruster
            const thrusterGlow = ctx.createRadialGradient(0, 25, 0, 0, 25, 25);
            thrusterGlow.addColorStop(0, `rgba(0, 255, 255, ${0.4 + thrusterWave * 0.1})`);
            thrusterGlow.addColorStop(0.5, `rgba(0, 150, 255, ${0.2 + thrusterWave * 0.05})`);
            thrusterGlow.addColorStop(1, 'rgba(0, 100, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(0, 25, 25, 0, Math.PI * 2);
            ctx.fillStyle = thrusterGlow;
            ctx.fill();
            
            // Main thruster flame - smoother shape
            const flameGradient = ctx.createLinearGradient(0, 20, 0, 20 + flameLength);
            flameGradient.addColorStop(0, '#ffffff');
            flameGradient.addColorStop(0.1, '#00ffff');
            flameGradient.addColorStop(0.3, '#00ddff');
            flameGradient.addColorStop(0.5, '#00aaff');
            flameGradient.addColorStop(0.7, '#0077ff');
            flameGradient.addColorStop(1, 'rgba(0, 50, 200, 0)');
            
            ctx.beginPath();
            ctx.moveTo(-flameWidth, 20);
            ctx.bezierCurveTo(
                -flameWidth * 0.6, 20 + flameLength * 0.4,
                -flameWidth * 0.2, 20 + flameLength * 0.7,
                0, 20 + flameLength
            );
            ctx.bezierCurveTo(
                flameWidth * 0.2, 20 + flameLength * 0.7,
                flameWidth * 0.6, 20 + flameLength * 0.4,
                flameWidth, 20
            );
            ctx.closePath();
            ctx.fillStyle = flameGradient;
            ctx.fill();
            
            // Inner flame core
            const innerFlameLength = flameLength * 0.7;
            const innerGradient = ctx.createLinearGradient(0, 20, 0, 20 + innerFlameLength);
            innerGradient.addColorStop(0, '#ffffff');
            innerGradient.addColorStop(0.3, '#aaffff');
            innerGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
            
            ctx.beginPath();
            ctx.moveTo(-flameWidth * 0.5, 20);
            ctx.bezierCurveTo(
                -flameWidth * 0.3, 20 + innerFlameLength * 0.5,
                0, 20 + innerFlameLength * 0.8,
                0, 20 + innerFlameLength
            );
            ctx.bezierCurveTo(
                0, 20 + innerFlameLength * 0.8,
                flameWidth * 0.3, 20 + innerFlameLength * 0.5,
                flameWidth * 0.5, 20
            );
            ctx.closePath();
            ctx.fillStyle = innerGradient;
            ctx.fill();

            // Ship body - sleek rocket design with better gradients
            const bodyGradient = ctx.createLinearGradient(-15, 0, 15, 0);
            bodyGradient.addColorStop(0, '#1a1a2e');
            bodyGradient.addColorStop(0.2, '#2d2d44');
            bodyGradient.addColorStop(0.35, '#4a4e69');
            bodyGradient.addColorStop(0.5, '#9a8c98');
            bodyGradient.addColorStop(0.65, '#4a4e69');
            bodyGradient.addColorStop(0.8, '#2d2d44');
            bodyGradient.addColorStop(1, '#1a1a2e');

            // Main hull with smooth curves
            ctx.beginPath();
            ctx.moveTo(0, -25);
            ctx.bezierCurveTo(8, -20, 12, -10, 13, 0);
            ctx.bezierCurveTo(14, 10, 13, 18, 12, 20);
            ctx.lineTo(-12, 20);
            ctx.bezierCurveTo(-13, 18, -14, 10, -13, 0);
            ctx.bezierCurveTo(-12, -10, -8, -20, 0, -25);
            ctx.closePath();
            ctx.fillStyle = bodyGradient;
            ctx.fill();
            
            // Hull highlight
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Add subtle hull shine
            const shineGradient = ctx.createLinearGradient(-5, -20, 5, 10);
            shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
            shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
            shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.moveTo(-2, -22);
            ctx.bezierCurveTo(4, -15, 6, -5, 5, 10);
            ctx.lineTo(-2, 10);
            ctx.bezierCurveTo(-1, -5, 1, -15, -2, -22);
            ctx.closePath();
            ctx.fillStyle = shineGradient;
            ctx.fill();

            // Cockpit window with animated glow
            const windowPulse = 0.9 + Math.sin(time * 0.004) * 0.1;
            const windowGradient = ctx.createRadialGradient(0, -8, 0, 0, -8, 8);
            windowGradient.addColorStop(0, `rgba(200, 255, 255, ${windowPulse})`);
            windowGradient.addColorStop(0.3, '#67e8f9');
            windowGradient.addColorStop(0.6, '#22d3ee');
            windowGradient.addColorStop(1, '#0891b2');
            
            ctx.beginPath();
            ctx.ellipse(0, -8, 5, 7, 0, 0, Math.PI * 2);
            ctx.fillStyle = windowGradient;
            ctx.fill();
            
            // Window frame glow
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.7 + Math.sin(time * 0.003) * 0.3})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Window reflection
            ctx.beginPath();
            ctx.ellipse(-1.5, -10, 1.5, 2, -0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fill();

            // Wings with gradients
            const wingGradient = ctx.createLinearGradient(-25, 10, -12, 20);
            wingGradient.addColorStop(0, '#3d3d5c');
            wingGradient.addColorStop(1, '#4a4e69');
            
            // Left wing
            ctx.beginPath();
            ctx.moveTo(-12, 8);
            ctx.bezierCurveTo(-18, 12, -24, 18, -25, 22);
            ctx.lineTo(-20, 22);
            ctx.lineTo(-12, 17);
            ctx.closePath();
            ctx.fillStyle = wingGradient;
            ctx.fill();
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Right wing
            const wingGradient2 = ctx.createLinearGradient(25, 10, 12, 20);
            wingGradient2.addColorStop(0, '#3d3d5c');
            wingGradient2.addColorStop(1, '#4a4e69');
            
            ctx.beginPath();
            ctx.moveTo(12, 8);
            ctx.bezierCurveTo(18, 12, 24, 18, 25, 22);
            ctx.lineTo(20, 22);
            ctx.lineTo(12, 17);
            ctx.closePath();
            ctx.fillStyle = wingGradient2;
            ctx.fill();
            ctx.stroke();

            // Engine glow with pulsation
            const enginePulse = 0.8 + Math.sin(time * 0.01) * 0.2;
            ctx.beginPath();
            ctx.arc(0, 20, 6, 0, Math.PI * 2);
            const engineGlow = ctx.createRadialGradient(0, 20, 0, 0, 20, 8);
            engineGlow.addColorStop(0, `rgba(255, 255, 255, ${enginePulse})`);
            engineGlow.addColorStop(0.3, `rgba(0, 255, 255, ${enginePulse * 0.8})`);
            engineGlow.addColorStop(0.6, `rgba(0, 136, 255, ${enginePulse * 0.5})`);
            engineGlow.addColorStop(1, 'rgba(0, 68, 170, 0)');
            ctx.fillStyle = engineGlow;
            ctx.fill();

            ctx.restore();
        }

        function findSafePosition(time) {
            // Calculate danger from all meteors with smooth weighting
            let avoidX = 0;
            let avoidY = 0;
            let dangerLevel = 0;

            meteors.forEach(meteor => {
                const dx = meteor.smoothX - spaceship.x;
                const dy = meteor.smoothY - spaceship.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const dangerRadius = 140;
                
                if (dist < dangerRadius) {
                    // Smooth inverse distance weighting
                    const weight = Math.pow(1 - dist / dangerRadius, 2);
                    avoidX -= (dx / dist) * weight;
                    avoidY -= (dy / dist) * weight;
                    dangerLevel = Math.max(dangerLevel, weight);
                }
            });

            if (dangerLevel > 0.1) {
                // Normalize and apply avoidance
                const avoidMag = Math.sqrt(avoidX * avoidX + avoidY * avoidY) || 1;
                spaceship.targetX = spaceship.x + (avoidX / avoidMag) * 100 * dangerLevel;
                spaceship.targetY = spaceship.y + (avoidY / avoidMag) * 100 * dangerLevel;
                spaceship.thrusterIntensity = lerp(spaceship.thrusterIntensity, 1, 0.1);
            } else {
                // Smooth orbital/floating motion when safe
                const orbitTime = time * 0.0008;
                const breathTime = time * 0.0005;
                spaceship.targetX = dimensions.width / 2 + Math.sin(orbitTime) * 70 + Math.sin(orbitTime * 2.3) * 20;
                spaceship.targetY = dimensions.height / 2 + Math.cos(breathTime) * 50 + Math.cos(breathTime * 1.7) * 15;
                spaceship.thrusterIntensity = lerp(spaceship.thrusterIntensity, 0.5, 0.05);
            }
            
            // Keep within bounds with soft edges
            const margin = 50;
            const softMargin = 80;
            
            if (spaceship.targetX < margin) spaceship.targetX = lerp(spaceship.targetX, margin, 0.3);
            if (spaceship.targetX > dimensions.width - margin) spaceship.targetX = lerp(spaceship.targetX, dimensions.width - margin, 0.3);
            if (spaceship.targetY < margin) spaceship.targetY = lerp(spaceship.targetY, margin, 0.3);
            if (spaceship.targetY > dimensions.height - margin) spaceship.targetY = lerp(spaceship.targetY, dimensions.height - margin, 0.3);
        }

        function update(deltaTime, time) {
            const dt = Math.min(deltaTime / 16.67, 2); // Normalize to ~60fps, cap at 2x
            
            findSafePosition(time);
            
            // Smooth physics-based movement for spaceship
            const targetVx = (spaceship.targetX - spaceship.x) * 0.03;
            const targetVy = (spaceship.targetY - spaceship.y) * 0.03;
            
            // Smooth velocity interpolation (creates that buttery feel)
            spaceship.vx = lerp(spaceship.vx, targetVx, 0.08 * dt);
            spaceship.vy = lerp(spaceship.vy, targetVy, 0.08 * dt);
            
            // Apply velocity
            spaceship.x += spaceship.vx * dt;
            spaceship.y += spaceship.vy * dt;
            
            // Update trail for motion blur
            spaceship.trail.unshift({ x: spaceship.x, y: spaceship.y, angle: spaceship.angle });
            if (spaceship.trail.length > 6) spaceship.trail.pop();
            
            // Smooth angle interpolation
            const speed = Math.sqrt(spaceship.vx * spaceship.vx + spaceship.vy * spaceship.vy);
            if (speed > 0.3) {
                spaceship.targetAngle = Math.atan2(spaceship.vy, spaceship.vx) + Math.PI / 2;
            }
            spaceship.angle = lerpAngle(spaceship.angle, spaceship.targetAngle, 0.06 * dt);

            // Update meteors with smooth interpolation
            meteors.forEach((meteor, index) => {
                // Add slight floating motion to meteors for organic feel
                const floatX = Math.sin(time * 0.002 + index) * 0.1;
                const floatY = Math.cos(time * 0.0015 + index * 1.5) * 0.1;
                
                meteor.x += (meteor.vx + floatX) * dt;
                meteor.y += (meteor.vy + floatY) * dt;
                
                // Smooth position interpolation for rendering
                meteor.smoothX = lerp(meteor.smoothX, meteor.x, 0.15 * dt);
                meteor.smoothY = lerp(meteor.smoothY, meteor.y, 0.15 * dt);
                
                // Smooth rotation
                meteor.rotation += meteor.rotationSpeed * dt;
                
                // Update trail
                meteor.trail.unshift({ x: meteor.smoothX, y: meteor.smoothY });
                if (meteor.trail.length > meteor.trailMaxLength) meteor.trail.pop();

                // Reset meteor if out of bounds
                if (meteor.x < -120 || meteor.x > dimensions.width + 120 ||
                    meteor.y < -120 || meteor.y > dimensions.height + 120) {
                    meteors[index] = createMeteor();
                }
            });
        }

        function drawStars(time, isDark) {
            stars.forEach(star => {
                const twinkle = 0.5 + Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset) * 0.5;
                const alpha = star.baseOpacity * twinkle;
                
                // Different star colors for light vs dark theme
                let starColor;
                if (isDark) {
                    // White/blue stars for dark theme
                    starColor = `rgba(255, 255, 255, ${alpha})`;
                } else {
                    // Purple/violet stars for light theme
                    const purpleVariation = Math.sin(star.twinkleOffset) * 30;
                    starColor = `rgba(${120 + purpleVariation}, ${80 + purpleVariation * 0.5}, ${180 + purpleVariation * 0.3}, ${alpha * 0.9})`;
                }
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = starColor;
                ctx.fill();
                
                // Add glow to larger stars
                if (star.size > 1.2) {
                    const glowColor = isDark 
                        ? `rgba(200, 220, 255, ${alpha * 0.3})`
                        : `rgba(150, 100, 200, ${alpha * 0.4})`;
                    
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
                    const glow = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 2.5
                    );
                    glow.addColorStop(0, glowColor);
                    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    ctx.fillStyle = glow;
                    ctx.fill();
                }
            });
        }

        function draw(time, isDark) {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            // Draw stars background
            drawStars(time, isDark);

            // Draw meteors
            meteors.forEach(meteor => drawMeteor(meteor, time));

            // Draw spaceship
            drawSpaceship(time);
        }

        function animate(currentTime) {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            
            // Check current theme state
            const isDark = document.documentElement.classList.contains('dark');
            
            update(deltaTime, currentTime);
            draw(currentTime, isDark);
            animationFrameId = requestAnimationFrame(animate);
        }

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [dimensions]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const container = canvasRef.current?.parentElement;
            if (container) {
                setDimensions({
                    width: Math.min(400, container.clientWidth - 32),
                    height: 350
                });
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                className="rounded-lg"
                style={{ background: 'transparent' }}
            />
        </div>
    );
};
