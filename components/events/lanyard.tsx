"use client"

import { useEffect, useRef, useState, useMemo, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Folder, X } from 'lucide-react'
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

function Lanyard() {
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

  // Define 6 image URLs for the Lanyard component
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747758248/img_11_mezt2k.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747758248/img_13_ged0bg.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747759462/IMG_9841_fomql6.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747758247/img_9_tubsub.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747758247/img_6_qd6vvw.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747758247/img_7_azczb0.webp",
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
          trigger: '.mobile-lanyard-container',
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
        className="hidden md:grid h-[175vh] grid-cols-3 grid-rows-4 gap-1 relative"
      >
        <div
          ref={titleRef}
          // Title at grid 1,1
          className="col-start-1 col-span-1 row-start-1 row-span-1 flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white relative sm:max-w-[32ch]"
        >
          SITEAO MERCH 2024: LANYARDS
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Folder className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 6 Images (filling the 3x4 grid) */}
        {/* Row 1 - Remaining cells after title */}
        <div className="col-start-2 col-span-2 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="Lanyard photo 1"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Row 2 */}
        <div className="col-start-1 col-span-1 row-start-2 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="Lanyard photo 2"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-3 col-span-1 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]}
            alt="Lanyard photo 3"
            className="h-full w-full object-cover"
          />
        </div>

          <div className="col-start-1 col-span-1 row-start-3 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="Lanyard photo 3"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Row 3 */}
        <div className="col-start-1 col-span-1 row-start-3 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="Lanyard photo 4"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 col-span-1 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[4]}
            alt="Lanyard photo 5"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Row 4 */}
        <div className="col-start-2 col-span-2 row-start-4 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src="https://res.cloudinary.com/dxjspzyrh/image/upload/v1747759462/IMG_9839_eiulbo.webp"
            alt="Lanyard photo 6"
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
              First Look: Fresh SITEAO Merch Lands with Roaring Success!
            </h1>
            <p className="text-xl text-white leading-relaxed">
              The halls are now a bit more colorful, and the spirit of the **Science Information Technology and Engineering Academic Organization (SITEAO)** is shining brighter than ever! The highly anticipated **SITEAO Merch 2024** has officially made its debut, with the iconic **Griffin lanyards** being the first to grace the necks of enthusiastic members.
              <br />
              <br />
              It's a moment of pride and collective identity for the Griffins who were quick to cop early and show off their new gear. These lanyards aren't just accessories; they're a symbol of belonging, a visible sign of commitment to SITEAO's vibrant community and its pursuit of excellence in science, information technology, and engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-lanyard-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          SITEAO MERCH 2024: LANYARDS
          <button
            onClick={toggleOverlay}
            className='mt-4 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Folder className="h-6 w-6 text-white" />
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
                alt={`Lanyard photo ${index + 1}`}
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
            <h1 className="text-4xl font-century font-extrabold text-white mb-6">
              First Look: Fresh SITEAO Merch Lands with Roaring Success!
            </h1>
            <p className="text-base text-white leading-relaxed">
              The halls are now a bit more colorful, and the spirit of the **Science Information Technology and Engineering Academic Organization (SITEAO)** is shining brighter than ever! The highly anticipated **SITEAO Merch 2024** has officially made its debut, with the iconic **Griffin lanyards** being the first to grace the necks of enthusiastic members.
              <br />
              <br />
              It's a moment of pride and collective identity for the Griffins who were quick to cop early and show off their new gear. These lanyards aren't just accessories; they're a symbol of belonging, a visible sign of commitment to SITEAO's vibrant community and its pursuit of excellence in science, information technology, and engineering.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lanyard;