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

function End() {
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

  // Define 1 image URL for the End component
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747789963/IDLE_SCREEN_oezsxr.webp",
  ], [])

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
          trigger: '.mobile-end-container',
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
        className="hidden md:grid h-[100vh] grid-cols-3 grid-rows-1 relative place-items-center" // Centered grid item
      >
        {/* Marquee 1: Positioned at the top middle of the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] bg-yellow-400 py-1 overflow-hidden whitespace-nowrap z-50">
          <div className="animate-marquee inline-block text-black font-bold uppercase text-sm tracking-widest">
            {Array.from({ length: 20 }).map((_, i) => (
              <span className="mx-4 font-bold font-horizon" key={i}>
                Under Construction
              </span>
            ))}
          </div>
        </div>

        {/* Marquee 2: Positioned at the middle of the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] bg-yellow-400 rotate-12 py-1 overflow-hidden whitespace-nowrap z-30">
          <div className="animate-marquee inline-block text-black font-bold uppercase text-sm tracking-widest">
            {Array.from({ length: 20 }).map((_, i) => (
              <span className="mx-4 font-bold font-horizon" key={i}>
                ⋅ Coming Soon ⋅
              </span>
            ))}
          </div>
        </div>

   

        {/* Desktop Grid Item Layout for 1 Image (centered) */}
        <div className="col-start-1 col-span-3 row-span-3 row-start-1 blur-xl"> {/* This span ensures it covers the whole grid area */}
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="End screen image"
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
              THANK YOU FOR VISITING!
            </h1>
            <p className="text-xl text-white leading-relaxed">
              We appreciate you taking the time to explore our page.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-end-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative ">
        {/* Marquee 1 for mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] w-full bg-yellow-400 py-1 overflow-hidden whitespace-nowrap z-40">
          <div className="animate-marquee inline-block text-black font-bold uppercase text-sm tracking-widest">
            {Array.from({ length: 20 }).map((_, i) => (
              <span className="mx-4 font-bold font-horizon" key={i}>
                Under Construction
              </span>
            ))}
          </div>
        </div>

        {/* Marquee 2 for mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] bg-yellow-400 rotate-12 py-1 overflow-hidden whitespace-nowrap z-30">
          <div className="animate-marquee inline-block text-black font-bold uppercase text-sm tracking-widest">
            {Array.from({ length: 20 }).map((_, i) => (
              <span className="mx-4 font-bold font-horizon" key={i}>
                ⋅ Coming Soon ⋅
              </span>
            ))}
          </div>
        </div>



        <div className="w-full max-w-md space-y-6 blur-xl ">
          <div
            className="mobile-image-wrapper relative p-1 bg-white rounded shadow-md mx-auto"
            style={{ transform: `rotate(0deg)` }} // No tilt for single image for simplicity
          >
            <MemoizedImage
              addRef={addToImageRefs}
              src={imageUrls[0]}
              alt="End screen image"
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>
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
              <X className="text-6 w-6 text-white" />
            </button>
            <h1 className="text-3xl font-century font-extrabold text-white mb-6">
              THANK YOU FOR VISITING!
            </h1>
            <p className="text-sm text-white leading-relaxed">
              We appreciate you taking the time to explore our page.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default End;