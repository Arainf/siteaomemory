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

export default function Iggy() {
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

  // Define 3 image URLs for the Iggy component
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747789263/DAY_2_tjcgqf.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747789384/DAY_2_3_bccxmm.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747789386/DAY_2_2_aa8lvz.webp",
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
          trigger: '.mobile-iggy-container',
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
        className="hidden md:grid h-[120vh] grid-cols-3 grid-rows-3 gap-1 relative" // Adjusted height and grid-rows for 3 images
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          Ignatian Leaders: SITEAO's Griffins Shine at IGGY Camp '25
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Menu className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 3 Images */}
        <div className="col-start-2 col-span-1 row-start-1 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="IGGY Camp photo 1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-3 col-span-1 row-start-1 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="IGGY Camp photo 2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-3 row-start-2 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="IGGY Camp photo 3"
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
              Ignatian Leaders: SITEAO's Griffins Shine at IGGY Camp '25
            </h1>
            <p className="text-xl text-white leading-relaxed">
              From February 22-23, 2025, a select group of SITEAO leaders from various organizations and sub-organizations gathered for the impactful two-day IGGY Camp: Ignatian Leadership Camp 2025. Held at the serene Silsilah Retreat House in Sinunuc, Zamboanga City, this immersive experience brought together the brightest minds within the Science, Information Technology, and Engineering Academic Organization.
              <br />
              <br />
              The camp proved to be a truly transformative event, deeply fostering leadership skills, camaraderie, and the distinctive Ignatian spirit among participants. By emphasizing purposeful leadership and service, IGGY Camp empowered these emerging leaders, equipping them with the tools and inspiration to shape a future defined by passion and driven action within SITEAO and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-iggy-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          Ignatian Leaders: SITEAO's Griffins Shine at IGGY Camp '25
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
                alt={`IGGY Camp photo ${index + 1}`}
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
              <X className="text-6 w-6 text-white" />
            </button>
            <h1 className="text-3xl font-century font-extrabold text-white mb-6">
              Ignatian Leaders: SITEAO's Griffins Shine at IGGY Camp '25
            </h1>
            <p className="text-sm text-white leading-relaxed">
              From February 22-23, 2025, a select group of SITEAO leaders from various organizations and sub-organizations gathered for the impactful two-day IGGY Camp: Ignatian Leadership Camp 2025. Held at the serene Silsilah Retreat House in Sinunuc, Zamboanga City, this immersive experience brought together the brightest minds within the Science, Information Technology, and Engineering Academic Organization.
              <br />
              <br />
              The camp proved to be a truly transformative event, deeply fostering leadership skills, camaraderie, and the distinctive Ignatian spirit among participants. By emphasizing purposeful leadership and service, IGGY Camp empowered these emerging leaders, equipping them with the tools and inspiration to shape a future defined by passion and driven action within SITEAO and beyond.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

