"use client"

import { useEffect, useRef, useState, useMemo, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Folder, X, Menu } from 'lucide-react'
import Link from 'next/link'
import ImageWithFallback from '@/utils/fallback'
import type { RefCallback } from 'react'

gsap.registerPlugin(ScrollTrigger)

type MemoizedImageProps = {
  src?: string;
  alt: string;
  className?: string;
  addRef?: RefCallback<HTMLImageElement>;
};

const MemoizedImage = memo(({ src, alt, className, addRef }: MemoizedImageProps) => {
  return (
    <ImageWithFallback
      addRef={addRef}
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
    />
  );
});

MemoizedImage.displayName = "MemoizedImage"

export default function Olympics() {
  const sectionRef = useRef(null)
  const titleRef = useRef()
  const imageRefs = useRef([])
  const desktopOverlayRef = useRef(null)
  const mobileOverlayRef = useRef(null)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  imageRefs.current = []

  const toggleOverlay = () => {
    const overlayRef = window.innerWidth >= 768 ? desktopOverlayRef : mobileOverlayRef
    if (overlayRef.current) {
      if (!isOverlayVisible) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          display: "flex",
        })
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(overlayRef.current, { display: "none" })
          },
        })
      }
    }
    setIsOverlayVisible(!isOverlayVisible)
  }

  const addToImageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el)
    }
  }

  const getRandomTilt = () => {
    return (Math.random() * 10 - 5).toFixed(2)
  }

  // Define 8 image URLs for the Olympics component
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785465/onind-021_w08p5b.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785465/SITEAO_SWEETOlympics_Highlights_Frame_2_o6wclm.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785466/DSC_6669_nhav7j.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785466/_DSC6273_bkjlx7.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785466/SITEAO_SWEETOlympics_Highlights_Frame_3_mcz254.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785467/_DSC6348_vuovvh.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785467/SITEAO_SWEETOlympics_Highlights_Frame_1_p9dl0z.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785467/onind-133_h1xxx5.webp",
  ], [])

  const imageTilts = useMemo(() => imageUrls.map(() => getRandomTilt()), [imageUrls]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom center',
          toggleActions: 'play none none none',
        },
      })

      desktopTl.from(titleRef.current, {
        y: -60,
        opacity: 0,
        duration: 1,
      })
        .from(
          imageRefs.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.2,
          },
          '-=0.5'
        )

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.mobile-olympics-container',
          start: 'top 80%',
          end: 'bottom center',
          toggleActions: 'play none none none',
        },
      })

      mobileTl.from('.mobile-title', {
        y: -40,
        opacity: 0,
        duration: 1,
      })
        .from(
          '.mobile-image-wrapper',
          {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
          },
          '-=0.5'
        )

      gsap.set(desktopOverlayRef.current, { opacity: 0, display: "none" })
      gsap.set(mobileOverlayRef.current, { opacity: 0, display: "none" })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Desktop Layout (hidden on mobile) */}
      <div
        ref={sectionRef}
        className="hidden md:grid h-[240vh] grid-cols-3 grid-rows-7 gap-1 relative" // Adjusted grid-rows for 8 images
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          Griffin Spirit Shines Bright at SWEETAOlympics 2024!
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Menu className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 8 Images */}
        <div className="col-start-2 col-span-2 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="SWEETAOlympics photo 1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-2 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="SWEETAOlympics photo 2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-1 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="SWEETAOlympics photo 3"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-3 col-span-1 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]}
            alt="SWEETAOlympics photo 4"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-2 row-start-4 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[4]}
            alt="SWEETAOlympics photo 5"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-4 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[5]}
            alt="SWEETAOlympics photo 6"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-3 col-span-1 row-start-6 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[6]}
            alt="SWEETAOlympics photo 7"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-2 row-start-6 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[7]}
            alt="SWEETAOlympics photo 8"
            className="h-full w-full object-cover"
          />
        </div>


        {/* Overlay for desktop */}
        <div
          ref={desktopOverlayRef}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm z-20 flex-col items-center justify-center p-8 overflow-auto"
          style={{ display: "none" }}
        >
          <div className="max-w-4xl mx-auto text-center relative">
            <button
              onClick={toggleOverlay}
              className="absolute -top-4 -right-4 border rounded-full p-2 hover:bg-white/20 hover:ease-in-out duration-300"
              aria-label="Close information overlay"
            >
              <X className="text-white h-6 w-6" />
            </button>
            <h1 className="text-6xl font-century font-extrabold text-white mb-8">
              Griffin Spirit Shines Bright at SWEETAOlympics 2024!
            </h1>
            <p className="text-xl text-white leading-relaxed">
              The arena was buzzing with energy, echoing with cheers and the palpable spirit of unity as SWEETAOlympics 2024 drew to a close. Captured in a series of dynamic shots, including "AWARDING SHOTS PART 18, last na jud!" the essence of the SWEETAOlympics was evident in every frame. From the fierce competition to the shared laughter and supportive gestures, the event perfectly encapsulated the strong bonds within the Science, Information Technology, and Engineering Academic Organization (SITEAO). Participants didn't just compete; they celebrated each other's efforts, embodying the core values of cooperation and respect.
              <br />
              <br />
              As the final awards were handed out and the last cheers faded, a clear message emerged: "That's a wrap, AtFest is waving!" SWEETAOlympics 2024 successfully brought together the SITEAO community for a memorable celebration of athletic prowess and collective identity, leaving behind a legacy of spirited competition and enduring friendships.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-olympics-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          Griffin Spirit Shines Bright at SWEETAOlympics 2024!
          <button
            onClick={toggleOverlay}
            className='mt-4 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="w-full max-w-md space-y-6">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="mobile-image-wrapper relative p-1 bg-white rounded shadow-md mx-auto"
              style={{ transform: `rotate(${imageTilts[index]}deg)` }}
            >
              <MemoizedImage
                addRef={addToImageRefs}
                src={url}
                alt={`SWEETAOlympics photo ${index + 1}`}
                className="w-full h-48 sm:h-64 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay for mobile */}
        <div
          ref={mobileOverlayRef}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex-col items-center justify-center p-4 overflow-auto"
          style={{ display: "none" }}
        >
          <div className="max-w-md mx-auto text-center pt-12 pb-20 relative">
            <button
              onClick={toggleOverlay}
              className="absolute top-0 right-0 border rounded-full p-2 hover:bg-white/20 hover:ease-in-out duration-300"
              aria-label="Close information overlay"
            >
              <X className="text-white h-6 w-6" />
            </button>
            <h1 className="text-3xl font-century font-extrabold text-white mb-6">
              Griffin Spirit Shines Bright at SWEETAOlympics 2024!
            </h1>
            <p className="text-sm text-white leading-relaxed">
              The arena was buzzing with energy, echoing with cheers and the palpable spirit of unity as SWEETAOlympics 2024 drew to a close. Captured in a series of dynamic shots, including "AWARDING SHOTS PART 18, last na jud!" the essence of the SWEETAOlympics was evident in every frame. From the fierce competition to the shared laughter and supportive gestures, the event perfectly encapsulated the strong bonds within the Science, Information Technology, and Engineering Academic Organization (SITEAO). Participants didn't just compete; they celebrated each other's efforts, embodying the core values of cooperation and respect.
              <br />
              <br />
              As the final awards were handed out and the last cheers faded, a clear message emerged: "That's a wrap, AtFest is waving!" SWEETAOlympics 2024 successfully brought together the SITEAO community for a memorable celebration of athletic prowess and collective identity, leaving behind a legacy of spirited competition and enduring friendships.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

