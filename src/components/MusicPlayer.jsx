import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const audioRef = useRef(null);

  // Music sources for each theme
  const darkThemeMusic = '/sounds/background-music-dark.mp3';
  const lightThemeMusic = '/sounds/background-music-light.mp3';

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
    };

    // Initial check
    checkTheme();

    // Watch for class changes on html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Switch music when theme changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      
      // Update source
      audioRef.current.src = isDarkTheme ? darkThemeMusic : lightThemeMusic;
      audioRef.current.load();
      audioRef.current.volume = 0.15; // Ensure same volume for both themes
      
      // Start light theme music from 3 seconds
      if (!isDarkTheme) {
        audioRef.current.currentTime = 3;
      }
      
      // Resume playing if it was playing
      if (wasPlaying) {
        audioRef.current.play().catch(err => console.log('Resume failed:', err));
      }
    }
  }, [isDarkTheme]);

  useEffect(() => {
    // Auto-play on mount with quiet volume
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.15; // Quiet background music (15%)
          audioRef.current.src = isDarkTheme ? darkThemeMusic : lightThemeMusic;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Autoplay prevented, waiting for user interaction');
        
        // If autoplay is blocked, play on first user interaction
        const startOnInteraction = async () => {
          try {
            if (audioRef.current && !isPlaying) {
              await audioRef.current.play();
              setIsPlaying(true);
              // Remove listeners after successful play
              document.removeEventListener('click', startOnInteraction);
              document.removeEventListener('keydown', startOnInteraction);
              document.removeEventListener('touchstart', startOnInteraction);
            }
          } catch (err) {
            console.log('Play failed:', err);
          }
        };
        
        document.addEventListener('click', startOnInteraction, { once: true });
        document.addEventListener('keydown', startOnInteraction, { once: true });
        document.addEventListener('touchstart', startOnInteraction, { once: true });
      }
    };
    
    playAudio();
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Play error:', error);
        }
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Floating Music Player */}
      <div className="group relative">
        {/* Cosmic Glow Effect - Changes with theme */}
        <div className={`absolute inset-0 blur-xl rounded-full animate-pulse transition-colors duration-500 ${
          isDarkTheme 
            ? 'bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-pink-400/20' 
            : 'bg-gradient-to-r from-violet-400/30 via-purple-400/30 to-fuchsia-400/30'
        }`}></div>
        
        {/* Main Player Container - Theme adaptive */}
        <div className={`relative backdrop-blur-md border rounded-full shadow-2xl transition-all duration-500 hover:scale-105 ${
          isDarkTheme
            ? 'bg-black/20 border-white/20'
            : 'bg-white/70 border-purple-200/50 shadow-purple-200/30'
        }`}>
          <div className="flex items-center gap-2 px-3 py-3">
            {/* Play/Pause Button - Theme adaptive */}
            <button
              onClick={togglePlay}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 shadow-lg ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:shadow-purple-500/50'
                  : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 hover:shadow-purple-500/50'
              }`}
              aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="white" />
              ) : (
                <Play className="w-5 h-5 text-white" fill="white" />
              )}
            </button>

            {/* Music Note Animation - Theme adaptive */}
            {isPlaying && (
              <div className="flex gap-1 px-1">
                <span className={`w-1 h-4 rounded-full animate-[wave_0.6s_ease-in-out_infinite] transition-colors duration-500 ${
                  isDarkTheme
                    ? 'bg-gradient-to-t from-purple-500 to-blue-500'
                    : 'bg-gradient-to-t from-violet-500 to-purple-400'
                }`}></span>
                <span className={`w-1 h-4 rounded-full animate-[wave_0.6s_ease-in-out_0.1s_infinite] transition-colors duration-500 ${
                  isDarkTheme
                    ? 'bg-gradient-to-t from-blue-500 to-pink-500'
                    : 'bg-gradient-to-t from-purple-500 to-fuchsia-400'
                }`}></span>
                <span className={`w-1 h-4 rounded-full animate-[wave_0.6s_ease-in-out_0.2s_infinite] transition-colors duration-500 ${
                  isDarkTheme
                    ? 'bg-gradient-to-t from-pink-500 to-purple-500'
                    : 'bg-gradient-to-t from-fuchsia-400 to-violet-500'
                }`}></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
