import { useEffect, useState } from "react";

export const StarBackground =  () => {
    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    // Listen for theme changes
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkTheme(isDark);
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        generateStars();
        generateMeteors();

        const handleResize = () => {
            generateStars();
        };

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const generateStars = () => {
        const numberOfStars = Math.floor(
            (window.innerWidth * window.innerHeight) / 10000
        );

        const newStars = [];

        for (let i = 0; i < numberOfStars; i++) {
            newStars.push({
                id:i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animationDuration: Math.random() * 4 + 2,
            });
        }

        setStars(newStars);
    };

    const generateMeteors = () => {
        const numberOfMeteors = 4
        const newMeteors = [];

        for (let i = 0; i < numberOfMeteors; i++) {
            newMeteors.push({
                id:i,
                size: Math.random() * 2 + 1,
                x: Math.random() * 100,
                y: Math.random() * 20,
                delay: Math.random() * 15,
                animationDuration: Math.random() * 3 + 3,
            });
        }

        setMeteors(newMeteors);
    };


    // Light theme star colors
    const lightStarColors = [
        'bg-violet-400',
        'bg-purple-400',
        'bg-fuchsia-400',
        'bg-indigo-300',
        'bg-purple-300',
    ];

    return ( 
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <div 
                    key={star.id} 
                    className={`animate-pulse-subtle absolute rounded-full transition-colors duration-500 ${
                        isDarkTheme 
                            ? 'star-dark' 
                            : `star-light ${lightStarColors[star.id % lightStarColors.length]}`
                    }`}
                    style={{
                        width: star.size + "px",
                        height: star.size + "px",
                        left: star.x + "%",
                        top: star.y + "%",
                        opacity: isDarkTheme ? star.opacity : star.opacity * 0.7,
                        animationDuration: star.animationDuration + "s",
                    }}
                />
            ))}

            {meteors.map((meteor) => (
                <div 
                    key={meteor.id} 
                    className={`animate-meteor absolute rounded-full transition-colors duration-500 ${
                        isDarkTheme ? 'meteor-dark' : 'meteor-light'
                    }`}
                    style={{
                        width: meteor.size * 50 + "px",
                        height: meteor.size + "px",
                        left: meteor.x + "%",
                        top: meteor.y + "%",
                        animationDelay: meteor.delay,
                        animationDuration: meteor.animationDuration + "s",
                    }}
                />
            ))}
        </div>
    );
};
