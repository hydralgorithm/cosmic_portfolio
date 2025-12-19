import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto-play on mount with quiet volume
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.15; // Quiet background music (15%)
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
        {/* Cosmic Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-pink-400/20 blur-xl rounded-full animate-pulse"></div>
        
        {/* Main Player Container */}
        <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2 px-3 py-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="white" />
              ) : (
                <Play className="w-5 h-5 text-white" fill="white" />
              )}
            </button>

            {/* Music Note Animation */}
            {isPlaying && (
              <div className="flex gap-1 px-1">
                <span className="w-1 h-4 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full animate-[wave_0.6s_ease-in-out_infinite]"></span>
                <span className="w-1 h-4 bg-gradient-to-t from-blue-500 to-pink-500 rounded-full animate-[wave_0.6s_ease-in-out_0.1s_infinite]"></span>
                <span className="w-1 h-4 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-[wave_0.6s_ease-in-out_0.2s_infinite]"></span>
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
        <source src="/background-music.mp3" type="audio/mpeg" />
        <source src="/background-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
