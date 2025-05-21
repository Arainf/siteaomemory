"use client"

import { useEffect, useRef, useState, useMemo, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Folder, X } from 'lucide-react' // Added X for the close button
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

function Genass() {
  const sectionRef = useRef(null)
  const titleRef = useRef()
  const imageRefs = useRef([])
  const desktopOverlayRef = useRef(null) // Added for desktop overlay
  const mobileOverlayRef = useRef(null) // Added for mobile overlay
  const [isOverlayVisible, setIsOverlayVisible] = useState(false) // Added state for overlay visibility

  imageRefs.current = []

  const toggleOverlay = () => {
    const overlayRef = window.innerWidth >= 768 ? desktopOverlayRef : mobileOverlayRef
    if (overlayRef.current) {
      if (!isOverlayVisible) {
        // Fade in the overlay
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          display: "flex",
        })
      } else {
        // Fade out the overlay
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

  // Generate random tilt between -5 and 5 degrees for mobile images
  const getRandomTilt = () => {
    return (Math.random() * 10 - 5).toFixed(2)
  }

  // Define your array of 12 image URLs
  const imageUrls = useMemo(() => [
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674902/bonus_02_po2tzs.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674900/15_lajvfn.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674901/bonus_01_uox5s7.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674901/bonus_03_phodcy.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674901/bonus_c51coo.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674901/18_u6g1sa.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674900/bonus_06_bxgzgq.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674901/01_sxw3p2.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674900/13_wrgorr.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674900/03_urfdxr.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674900/07_ubeoiw.webp`,
    `https://res.cloudinary.com/dxjspzyrh/image/upload/v1747674900/11_d0nlas.webp`,
  ], [])

  // Create an array of random tilts for each image, based on the fixed imageUrls length
  const imageTilts = useMemo(() => imageUrls.map(() => getRandomTilt()), [imageUrls]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop animation
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

      // Mobile animation
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.mobile-gallery-container',
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

      // Initialize overlays as hidden
      gsap.set(desktopOverlayRef.current, { opacity: 0, display: "none" })
      gsap.set(mobileOverlayRef.current, { opacity: 0, display: "none" })

    }, sectionRef) // Context scope for GSAP

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Desktop Layout (hidden on mobile) */}
      <div
        ref={sectionRef}
        // h-[400vh] provides enough scroll space for the animations
        // grid-rows-12 gives us 12 equal vertical sections to place images
        className="hidden md:grid h-[300vh] grid-cols-3 grid-rows-10 gap-1 relative"
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          SITEAO GENERAL ASSEMBLY 2024 - 2025
          {/* Hamburger menu button for desktop layout - positioned absolutely */}
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Folder className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 12 Images (Non-overlapping) */}
        {/*
          Each image div uses col-start, col-span, row-start, and row-span
          to define its exact position and size in the 3-column, 12-row grid.
          Ensure no two images occupy the same grid cells.
        */}

        {/* Image 1: Top Right, Spanning 2 columns and 2 rows */}
        <div className="col-start-2 col-span-2 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="General Assembly photo 1"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 2: Middle Left, Spanning 1 column and 2 rows */}
        <div className="col-start-1 col-span-1 row-start-2 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="General Assembly photo 2"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 3: Middle Right, Spanning 2 columns and 1 row (starts below Image 1, in line with Image 2) */}
        <div className="col-start-2 col-span-2 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="General Assembly photo 3"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 4: Bottom Left, Spanning 1 column and 1 row */}
        <div className="col-start-1 col-span-1 row-start-4 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]}
            alt="General Assembly photo 4"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 5: Center, Spanning 2 columns and 2 rows */}
        <div className="col-start-2 col-span-2 row-start-4 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[4]}
            alt="General Assembly photo 5"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 6: Left Middle, Spanning 1 column and 2 rows */}
        <div className="col-start-1 col-span-1 row-start-5 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[5]}
            alt="General Assembly photo 6"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 7: Bottom Center, Spanning 1 column and 1 row */}
        <div className="col-start-2 col-span-1 row-start-6 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[6]}
            alt="General Assembly photo 7"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 8: Right Middle, Spanning 1 column and 3 rows */}
        <div className="col-start-3 col-span-1 row-start-6 row-span-3">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[7]}
            alt="General Assembly photo 8"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 9: Left Bottom, Spanning 2 columns and 2 rows */}
        <div className="col-start-1 col-span-2 row-start-7 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[8]}
            alt="General Assembly photo 9"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 10: Top Right in next section, Spanning 1 column and 1 row */}
        <div className="col-start-1 col-span-1 row-start-9 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[9]}
            alt="General Assembly photo 10"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 11: Mid-right in next section, Spanning 2 columns and 2 rows */}
        <div className="col-start-2 col-span-2 row-start-9 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[10]}
            alt="General Assembly photo 11"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Image 12: Bottom Left, Spanning 1 column and 2 rows */}
        <div className="col-start-1 col-span-1 row-start-10 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[11]}
            alt="General Assembly photo 12"
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
              SITEAO Kicks Off New Year with Enthusiastic General Assembly
            </h1>
            <p className="text-xl text-white leading-relaxed">
              The Science Information Technology and Engineering Academic Organization (SITEAO) roared into its new academic year with a highly successful General Assembly held on August 24, 2024, at the vibrant Multi-Purpose Covered Court 2. The event was a lively affair, bringing together new and returning members for an afternoon of introductions, community building, and celebratory fun.
              <br />
              <br />
              A key highlight of the assembly was the official introduction of the new SITEAO officers for the 2024-2025 term. These dedicated student leaders are set to guide the organization through another year of academic excellence, innovative projects, and engaging events. Their passion and commitment were evident as they greeted the enthusiastic attendees, ready to embark on their roles.
              <br />
              <br />
              The atmosphere was electric, further amplified by an exciting raffle that kept spirits high and added an element of surprise and delight. This engaging segment was a crowd favorite, reinforcing the fun and camaraderie that defines the SITEAO community.
              <br />
              <br />
              SITEAO extended heartfelt gratitude to everyone who contributed to the event's success, especially the "fellow Griffins" whose energy and participation truly made the assembly a memorable one. Special recognition was also given to Ms. Via Espejo, President of El Consejo Atenista, and Mr. Daniel Hernandez, SITEAO moderator, for their invaluable support, which is crucial to the organization's thriving activities.
              <br />
              <br />
              The success of the raffle was also made possible by the incredible generosity of several sub-organizations. SITEAO gave a big shout-out to:
            <br />
				<br/>
					ADZU Institute of Civil Engineering Students
              <br />
				  Ateneo&apos;s Informatics & Computing Guild
              <br />
				  Ateneo Biological Society
              <br />ADZU Biomedical Engineering Society
            </p>
            <p className="text-xl text-white leading-relaxed mt-4">
              Their contributions not only enhanced the event but also showcased the strong inter-organizational spirit within the university. The SITEAO General Assembly truly set a high bar for the year ahead, promising a dynamic and engaging experience for all its members.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-gallery-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        {/* Title at the top */}
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          SITEAO GENERAL ASSEMBLY 2024 - 2025
          {/* Hamburger menu button for mobile layout */}
          <button
            onClick={toggleOverlay}
            className='mt-4 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Folder className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Images with white borders and random tilt */}
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
                alt={`General Assembly photo ${index + 1}`}
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
            <h1 className="text-2xl font-century font-extrabold text-white mb-6">
              SITEAO Kicks Off New Year with Enthusiastic General Assembly
            </h1>
            <p className="text-xs text-white leading-relaxed">
              The Science Information Technology and Engineering Academic Organization (SITEAO) roared into its new academic year with a highly successful General Assembly held on August 24, 2024, at the vibrant Multi-Purpose Covered Court 2. The event was a lively affair, bringing together new and returning members for an afternoon of introductions, community building, and celebratory fun.
              <br />
              <br />
              A key highlight of the assembly was the official introduction of the new SITEAO officers for the 2024-2025 term. These dedicated student leaders are set to guide the organization through another year of academic excellence, innovative projects, and engaging events. Their passion and commitment were evident as they greeted the enthusiastic attendees, ready to embark on their roles.
              <br />
              <br />
              The atmosphere was electric, further amplified by an exciting raffle that kept spirits high and added an element of surprise and delight. This engaging segment was a crowd favorite, reinforcing the fun and camaraderie that defines the SITEAO community.
              <br />
              <br />
              SITEAO extended heartfelt gratitude to everyone who contributed to the event's success, especially the "fellow Griffins" whose energy and participation truly made the assembly a memorable one. Special recognition was also given to Ms. Via Espejo, President of El Consejo Atenista, and Mr. Daniel Hernandez, SITEAO moderator, for their invaluable support, which is crucial to the organization's thriving activities.
              <br />
              <br />
              The success of the raffle was also made possible by the incredible generosity of several sub-organizations. SITEAO gave a big shout-out to:
               <br/>
					<br />
					ADZU Institute of Civil Engineering Students
              <br />
				  Ateneo&apos;s Informatics & Computing Guild
              <br />
				  Ateneo Biological Society
              <br />ADZU Biomedical Engineering Society
            </p>
            <p className="text-xs text-white leading-relaxed mt-4">
              Their contributions not only enhanced the event but also showcased the strong inter-organizational spirit within the university. The SITEAO General Assembly truly set a high bar for the year ahead, promising a dynamic and engaging experience for all its members.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Genass