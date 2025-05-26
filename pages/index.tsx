import type { NextPage } from "next";
import Head from "next/head";
// import { DraggablePhoto } from "../components/draggable-photo";
import React, { useState, useEffect, useRef } from "react";
import MemoryLane from "@/components/memory-lane";
import MusicPlayer from "@/components/MusicPlayer";
import MusicSelectionModal from "@/components/MusicSelectionModal";
// import { getRandomPhotos } from "@/utils/fetchRandom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Play } from "lucide-react";
import { calculateTotalHeight } from "@/utils/calculateHeight";

gsap.registerPlugin(ScrollToPlugin);

interface HomeProps {
  // draggablePhotos: any[];
}

// interface Dimensions {
//   centerX: number;
//   centerY: number;
// }

const Home: NextPage<HomeProps> = ({ /* draggablePhotos */ }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [musicType, setMusicType] = useState<'none' | 'default' | 'custom'>('none');
  const [customMusicFile, setCustomMusicFile] = useState<File | null>(null);
  const tourTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const startTour = (selectedMusicType: 'none' | 'default' | 'custom', file?: File) => {
    if (isTourActive) return;
    
    // Set music preferences
    setMusicType(selectedMusicType);
    if (file) {
      setCustomMusicFile(file);
    }
    
    setIsTourActive(true);
    setShowMusicModal(false);
    
    // Store tour state in localStorage
    localStorage.setItem('isTourActive', 'true');
    localStorage.setItem('musicType', selectedMusicType);

    // Scroll to top first
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: "power2.inOut",
      onComplete: () => {
        // Then start the automatic scrolling with slower duration
        tourTimeoutRef.current = setTimeout(() => {
          // Calculate the total height based on all event components
          const totalHeight = calculateTotalHeight();
          
          gsap.to(window, {
            duration: 360,
            scrollTo: totalHeight,
            ease: "none",
            onComplete: () => {
              setIsTourActive(false);
              localStorage.setItem('isTourActive', 'false');
            }
          });
        }, 3000);
      }
    });
  };

  const stopTour = () => {
    if (!isTourActive) return;
    setIsTourActive(false);
    localStorage.setItem('isTourActive', 'false');
    
    if (tourTimeoutRef.current) {
      clearTimeout(tourTimeoutRef.current);
    }
    gsap.killTweensOf(window);
  };

  const handleTourClick = () => {
    if (isTourActive) {
      stopTour();
    } else {
      setShowMusicModal(true);
    }
  };

  useEffect(() => {
    // Check if tour was active when page was closed
    const wasTourActive = localStorage.getItem('isTourActive') === 'true';
    const storedMusicType = localStorage.getItem('musicType') as 'none' | 'default' | 'custom';
    
    if (wasTourActive) {
      setMusicType(storedMusicType || 'none');
      startTour(storedMusicType || 'none');
    }

    return () => {
      if (tourTimeoutRef.current) {
        clearTimeout(tourTimeoutRef.current);
      }
      gsap.killTweensOf(window);
    };
  }, []);

  // const [dimensions, setDimensions] = useState<Dimensions>({ centerX: 500, centerY: 400 });

  // useEffect(() => {
  //   const updateDimensions = () => {
  //     setDimensions({
  //       centerX: window.innerWidth / 2,
  //       centerY: window.innerHeight / 2
  //     });
  //   };

  //   updateDimensions();
  //   window.addEventListener('resize', updateDimensions);

  //   return () => window.removeEventListener('resize', updateDimensions);
  // }, []);

  return (
    <>
      <Head>
        <title>SITEAO</title>
        <meta name="description" content="SITEAO Photo Library" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className="fixed inset-0 w-full h-full grid-background transform-none"/>
      <main className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-20">
        <div className="relative z-10 text-center">
          <div className="relative inline-block text-[60px] md:text-[85px] lg:text-[160px] font-horizon leading-none">
            <span className="absolute inset-0 text-white translate-y-2 md:translate-y-3 opacity-40">SITEAO</span>
            <span className="absolute inset-0 text-white translate-y-4 md:translate-y-6 opacity-30">SITEAO</span>
            <span className="relative text-white">SITEAO</span>
        </div>
          <p className="font-century font-bold text-base md:text-lg lg:text-3xl text-white mt-4">
            DOCUMENTATION FILES &#91;A. Y. 2024-25&#93;
          </p>
        </div>
      </main>
      
      <div className="relative z-0 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block text-[40px] md:text-[60px] lg:text-[160px] font-horizon leading-none">
            <span className="absolute inset-0 text-white translate-y-2 md:translate-y-3 opacity-40">MEMORY LANE</span>
            <span className="absolute inset-0 text-white translate-y-4 md:translate-y-6 opacity-30">MEMORY LANE</span>
            <span className="relative text-white">MEMORY LANE</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 flex items-start justify-center -mt-20 md:-mt-[15%] overflow-hidden memory-lane-container">
        <div className="w-full">
          <MemoryLane />
      </div>
      </div>

      {/* Tour Button */}
      <button
        onClick={handleTourClick}
        className="fixed bottom-4 left-4 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/70 transition-colors flex items-center gap-2 text-white"
      >
        <Play className="w-4 h-4" />
        <span>{isTourActive ? 'Stop Tour' : 'Start Tour'}</span>
      </button>

      {/* Music Player */}
      <MusicPlayer 
        musicType={musicType} 
        customFile={customMusicFile || undefined} 
        autoPlay={isTourActive}
      />

      {/* Music Selection Modal */}
      <MusicSelectionModal
        isOpen={showMusicModal}
        onClose={() => setShowMusicModal(false)}
        onSelect={startTour}
      />
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const draggablePhotos = await getRandomPhotos("ORSEM", 10);
//   return {
//     props: {
//       draggablePhotos,
//     },
//   };
// };

export default Home;