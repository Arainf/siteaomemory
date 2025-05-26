import { useState, useEffect, useRef } from 'react';
import { Music2, Pause, Play } from 'lucide-react';

interface MusicPlayerProps {
  customFile?: File;
  musicType: 'none' | 'default' | 'custom';
  autoPlay?: boolean;
}

const MusicPlayer = ({ customFile, musicType, autoPlay = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (musicType === 'none') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setAudio(null);
      setIsPlaying(false);
      return;
    }

    let newAudio: HTMLAudioElement;
    
    if (musicType === 'custom' && customFile) {
      // Create object URL for custom file
      const objectUrl = URL.createObjectURL(customFile);
      newAudio = new Audio(objectUrl);
      
      // Cleanup object URL when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(objectUrl);
        newAudio.pause();
      };
    } else if (musicType === 'default') {
      newAudio = new Audio('/assets/music/Multo - Cup of Joe (Official Lyric Video) [Rht8rS4cR1s].f234.mp4');
    }

    if (newAudio) {
      newAudio.loop = true;
      audioRef.current = newAudio;
      setAudio(newAudio);

      // If autoPlay is true, start playing immediately
      if (autoPlay) {
        newAudio.play().catch(() => {
          setIsPlaying(false);
          localStorage.setItem('isPlaying', 'false');
        });
        setIsPlaying(true);
        localStorage.setItem('isPlaying', 'true');
      } else {
        // Otherwise, load playing state from localStorage
        const storedIsPlaying = localStorage.getItem('isPlaying') === 'true';
        setIsPlaying(storedIsPlaying);

        if (storedIsPlaying) {
          newAudio.play().catch(() => {
            setIsPlaying(false);
            localStorage.setItem('isPlaying', 'false');
          });
        }
      }
    }

    return () => {
      if (newAudio) {
        newAudio.pause();
        newAudio.currentTime = 0;
      }
    };
  }, [musicType, customFile, autoPlay]);

  const togglePlay = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        setIsPlaying(false);
        localStorage.setItem('isPlaying', 'false');
        return;
      });
    }
    setIsPlaying(!isPlaying);
    localStorage.setItem('isPlaying', (!isPlaying).toString());
  };

  if (musicType === 'none') return null;

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-4 right-4 z-50 bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-colors group"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <Music2 className="w-6 h-6 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
      {isPlaying ? (
        <Pause className="w-4 h-4 text-white absolute bottom-1 right-1" />
      ) : (
        <Play className="w-4 h-4 text-white absolute bottom-1 right-1" />
      )}
    </button>
  );
};

export default MusicPlayer; 