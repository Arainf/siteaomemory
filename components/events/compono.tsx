"use client"

import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Menu, X } from "lucide-react"
import ImageWithFallback from "@/utils/fallback"
import { useEffect, useRef, useState, useMemo, memo } from "react"
import gsap from "gsap"
import type { RefCallback } from "react"

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

export default function Compono() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const sectionRef = useRef(null)
  const titleRef = useRef()
  const imageRefs = useRef([])
  const textRef = useRef()
  const desktopOverlayRef = useRef(null)
  const mobileOverlayRef = useRef(null)
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

  // Generate random tilt between -5 and 5 degrees
  const getRandomTilt = () => {
    return (Math.random() * 10 - 5).toFixed(2)
  }

  // Create an array of random tilts for each image
  const imageTilts = useMemo(() => {
    return Array(7)
      .fill(null)
      .map(() => getRandomTilt())
  }, [])

  // Memoize image URLs to prevent unnecessary re-renders
  const imageUrls = useMemo(
    () => [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747669741/IMG_4553_uevguv.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747669739/10_kykb5c.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747669766/IMG_4610_pv932q.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747669739/13_ecyiby.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747669768/IMG_7185_qw2jqn.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747669768/IMG_7157_edahxi.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747669769/1_gpttms.webp",
    ],
    [],
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop animation
      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none none",
        },
      })

      desktopTl
        .from(titleRef.current, {
          y: -60,
          opacity: 1,
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
          "-=0.5",
        )
        .from(textRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
        })

      // Mobile animation
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none none",
        },
      })

      mobileTl
        .from(titleRef.current, {
          y: -40,
          opacity: 1,
          duration: 1,
        })
        .from(
          ".mobile-image-container",
          {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
          },
          "-=0.5",
        )

      // Initialize overlays as hidden
      gsap.set(desktopOverlayRef.current, { opacity: 0, display: "none" })
      gsap.set(mobileOverlayRef.current, { opacity: 0, display: "none" })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Desktop Layout (hidden on mobile) */}
      <div ref={sectionRef} className="hidden md:block h-[150vh] relative">
        {/* Main grid layout */}
        <div className="grid grid-cols-3 grid-rows-6 gap-1 h-full">
          <div
            ref={titleRef}
            className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
          >
            COMPONO: A Preparation to Better Service Capacity Training
            {/* Hamburger menu button for desktop layout - positioned absolutely */}
            
				<button
            onClick={toggleOverlay}
            className="absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300"
            aria-label="Toggle information overlay"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
          </div>

          <div className="col-start-2 col-span-2 row-start-1">
            <MemoizedImage
              addRef={addToImageRefs}
              src={imageUrls[0]}
              alt="photoleft"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-start-3 row-span-2 row-start-2">
            <MemoizedImage
              addRef={addToImageRefs}
              src={imageUrls[1]}
              alt="photomiddle"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-start-1 col-span-2 row-span-3 row-start-2">
            <MemoizedImage
              addRef={addToImageRefs}
              src={imageUrls[2]}
              alt="photoRight"
              className="h-full w-full object-cover"
            />
          </div>
          <div ref={textRef} className="col-start-3 row-start-4 row-span-2">
            <MemoizedImage
              addRef={addToImageRefs}
              src={imageUrls[3]}
              alt="photoRight"
              className="h-full w-full object-cover"
            />
          </div>
          <div ref={textRef} className="col-start-1 row-start-5 row-span-2">
            <MemoizedImage
              addRef={addToImageRefs}
              src={imageUrls[4]}
              alt="photoRight"
              className="h-full w-full object-cover"
            />
          </div>
          <div ref={textRef} className="col-start-2 row-start-5 row-span-2">
            <MemoizedImage
              addRef={addToImageRefs}
              src={imageUrls[5]}
              alt="photoRight"
              className="h-full w-full object-cover"
            />
          </div>
          <div ref={textRef} className="col-start-3 row-start-6 row-span-1">
            <MemoizedImage
              addRef={addToImageRefs}
              src={imageUrls[6]}
              alt="photoRight"
              className="h-full w-full object-cover"
            />
          </div>
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
              SITEAO Leaders Gear Up at COMPONO Capacity Training
            </h1>
            <p className="text-xl text-white leading-relaxed">
              On June 15, 2024, the Executive Council of the Science, Information Technology and Engineering Academic
              Organization (SITEAO) took a significant step in preparing for their upcoming term by participating in
              COMPONO: A Preparation to Better Service Capacity Training. This crucial program was jointly organized by
              the ECA - OVP and the Board of College Governors, demonstrating a collaborative commitment to developing
              strong student leadership.
              <br />
              <br />
              The training was specifically designed to equip officers from various academic organizations across the
              university with the essential skills and knowledge needed to become highly effective student leaders. For
              SITEAO's executive council, it was an invaluable opportunity to refine their leadership capabilities,
              enhance their understanding of service, and prepare to guide their organization with greater purpose and
              efficiency in the coming academic year.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        {/* Title at the top */}
        <div
          ref={titleRef}
          className="text-center my-8 text-3xl opacity-100 font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          COMPONO: A Preparation to Better Service Capacity Training
          {/* Hamburger menu button for mobile layout */}
          <button
            onClick={toggleOverlay}
            className="mt-4 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300"
            aria-label="Toggle information overlay"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Images with white borders and random tilt */}
        <div className="w-full max-w-md space-y-6 mt-12">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="mobile-image-container relative p-1 bg-white rounded shadow-md mx-auto"
              style={{ transform: `rotate(${imageTilts[index]}deg)` }}
            >
              <MemoizedImage
                addRef={addToImageRefs}
                src={url}
                alt={`COMPONO event photo ${index + 1}`}
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
              SITEAO Leaders Gear Up at COMPONO Capacity Training
            </h1>
            <p className="text-base text-white leading-relaxed">
              On June 15, 2024, the Executive Council of the Science, Information Technology and Engineering Academic
              Organization (SITEAO) took a significant step in preparing for their upcoming term by participating in
              COMPONO: A Preparation to Better Service Capacity Training. This crucial program was jointly organized by
              the ECA - OVP and the Board of College Governors, demonstrating a collaborative commitment to developing
              strong student leadership.
              <br />
              <br />
              The training was specifically designed to equip officers from various academic organizations across the
              university with the essential skills and knowledge needed to become highly effective student leaders. For
              SITEAO's executive council, it was an invaluable opportunity to refine their leadership capabilities,
              enhance their understanding of service, and prepare to guide their organization with greater purpose and
              efficiency in the coming academic year.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

