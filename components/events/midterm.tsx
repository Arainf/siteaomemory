"use client"

import { useEffect, useRef, useState, useMemo, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Folder, X, Menu } from 'lucide-react'
import Link from 'next/link'
import ImageWithFallback from '@/utils/fallback'
import type { RefCallback } from "react";

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

export default function Midterm() {
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

  // Define 6 image URLs for the Justice component
  const imageUrls = useMemo(() => [
   "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747783586/487415126_1095753275899821_4627578885515188959_n_cyyejj.webp",
 
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747783586/487330572_1095753565899792_8125498633126978021_n_skjd62.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747783586/487860812_1095753575899791_6956334948195076804_n_ytkjgq.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747783586/487855173_1095753295899819_626968629963566298_n_pubkys.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747783586/487300494_1095753315899817_1691930503240921159_n_ftckrp.webp",
       "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747783586/487536069_1095753229233159_2996525652134069542_n_rvrkfz.webp",
    
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
            opacity: 1,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.2,
          },
          '-=0.5'
        )

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.mobile-justice-container', // Keep as .mobile-justice-container to avoid class duplication issues if both components are on the same page.
          start: 'top 80%',
          end: 'bottom center',
          toggleActions: 'play none none none',
        },
      })

      mobileTl.from('.mobile-title', { // Keep as .mobile-title
        y: -40,
        opacity: 0,
        duration: 1,
      })
        .from(
          '.mobile-image-wrapper', // Keep as .mobile-image-wrapper
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
        className="hidden md:grid h-[200vh] grid-cols-3 grid-rows-5 gap-1 relative" // Adjusted grid-rows for 6 images
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          "DI BALENG WALANG "Goodluck, my GRIFFIN", BASTA MAY FREE TOKEN AKO SA SITEAO!!"
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Menu className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 6 Images */}
        <div className="col-start-2 col-span-2 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="SITEAO token distribution photo 1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-2 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="SITEAO token distribution photo 2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-2 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="SITEAO token distribution photo 3"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-4 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]}
            alt="SITEAO token distribution photo 4"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-2 row-start-4 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[4]}
            alt="SITEAO token distribution photo 5"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-5 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[5]}
            alt="SITEAO token distribution photo 6"
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
              "DI BALENG WALANG "Goodluck, my GRIFFIN", BASTA MAY FREE TOKEN AKO SA SITEAO!!"
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Midterm exam week is notoriously stressful, but the Science, Information Technology, and Engineering Academic Organization (SITEAO) found a truly "sweet" way to ease the pressure for its members. In a heartwarming display of support, SITEAO recently showered its Griffins with free tokens during the demanding exam period, capturing adorable moments that underscored the power of kindness.
              <br />
              <br />
              These thoughtful gestures served as a timely reminder that even amidst the most challenging academic times, a little bit of care and appreciation can make a world of difference. The images of students receiving their tokens, accompanied by bright smiles, perfectly encapsulated the positive impact of SITEAO's initiative. It wasn't just about the token itself, but the message it carried: "We're here for you."
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-justice-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          "DI BALENG WALANG "Goodluck, my GRIFFIN", BASTA MAY FREE TOKEN AKO SA SITEAO!!"
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
                alt={`SITEAO token distribution photo ${index + 1}`}
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
              "DI BALENG WALANG "Goodluck, my GRIFFIN", BASTA MAY FREE TOKEN AKO SA SITEAO!!"
            </h1>
            <p className="text-sm text-white leading-relaxed">
              Midterm exam week is notoriously stressful, but the Science, Information Technology, and Engineering Academic Organization (SITEAO) found a truly "sweet" way to ease the pressure for its members. In a heartwarming display of support, SITEAO recently showered its Griffins with free tokens during the demanding exam period, capturing adorable moments that underscored the power of kindness.
              <br />
              <br />
              These thoughtful gestures served as a timely reminder that even amidst the most challenging academic times, a little bit of care and appreciation can make a world of difference. The images of students receiving their tokens, accompanied by bright smiles, perfectly encapsulated the positive impact of SITEAO's initiative. It wasn't just about the token itself, but the message it carried: "We're here for you."
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

