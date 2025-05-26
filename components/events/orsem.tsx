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

export default function Orsem() {
  const sectionRef = useRef(null)
  const titleRef = useRef()
  const imageRefs = useRef([])
  const textRef = useRef() // This ref seems unused in the original 'Orsem' component, kept for consistency with 'Compono' template
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

  // Generate random tilt between -5 and 5 degrees
  const getRandomTilt = () => {
    return (Math.random() * 10 - 5).toFixed(2)
  }

  // Create an array of random tilts for each image
  const imageTilts = useMemo(() => {
    return Array(18).fill(null).map(() => getRandomTilt())
  }, [])

  // All image URLs in order
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747669930/_MG_5105_wckdzt.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672275/_MG_5148_nlqo0h.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672338/_MG_5154_fxwb4h.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672386/_MG_5162_ijvnps.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672456/_MG_5180_b5lrwt.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672584/_MG_5284_w8q68a.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672677/_MG_5288_vytxof.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672733/_MG_5301_ygo8se.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672802/_MG_5332_rzw1se.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672887/_MG_5370_o7lwbl.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747672980/IMG_0008_qxxctq.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747673140/IMG_0065_s4kvjk.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747673347/IMG_4177_miv6j7.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747673359/IMG_4241_iz9baz.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747673335/IMG_4156_z4aa2l.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747673384/IMG_4270_wk7tky.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747673189/IMG_0104_zcwe2e.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747673216/IMG_0120_toxtvs.webp"
  ], [])


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
            opacity: 1,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.2,
          },
          '-=0.5'
        )
        // textRef animation was removed as it's not present in the new layout for desktop
        // .from(textRef.current, { 
        //   y: 30,
        //   opacity: 0,
        //   duration: 1,
        // })

      // Mobile animation
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.mobile-orsem-container',
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
          '.mobile-image-container',
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
        className="hidden md:grid h-[400vh] grid-cols-3 grid-rows-12 gap-1 relative" // Added relative for overlay positioning
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          Sitio de SITEAO OrSem 2024
          <button
            onClick={toggleOverlay}
            className="absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300"
            aria-label="Toggle information overlay"
          >
            <Folder className='h-6 w-6 text-white' />
          </button>
        </div>

        <div className="col-start-2 col-span-2 row-span-2 row-start-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="photoleft"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 col-span-2 row-span-2  row-start-3">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 row-start-2 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-3 row-start-3 row-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-3 row-start-4 row-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[4]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 row-start-5 row-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[5]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 row-start-6 row-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[6]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 row-start-5 row-span-2 col-span-2 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[7]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 row-start-7 row-span-1 col-span-2 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[8]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-3 row-start-7 row-span-2 col-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[9]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 row-start-8 row-span-1 col-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[10]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 row-start-8 row-span-1 col-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[11]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 row-start-9 row-span-3 col-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[12]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 row-start-9 row-span-1 col-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[13]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-3 row-start-9 row-span-2 col-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[14]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 row-start-10 row-span-1 col-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[15]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 row-start-12 row-span-1 col-span-1 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[16]}
            alt="photoRight"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 row-start-11 row-span-2 col-span-2 ">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[17]}
            alt="photoRight"
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
              Full Steam Ahead: SITEAO+ Welcomes Freshies to a "Viaje Para Na Ateneo"!
            </h1>
            <p className="text-xl text-white leading-relaxed">
              The call has gone out: "SAKAY NA, FRESHIES! SITIO SITEAO!" — a vibrant invitation for incoming students to hop aboard and embark on an exciting journey into university life. As OrSem 2024: Viaje Para Na Ateneo kicks off, the Science Information Technology and Engineering Academic Organization (SITEAO) stands ready, buzzing with excitement to be a pivotal part of every freshie's adventure.
              <br />
              <br />
              This isn't just about starting college; it's about diving headfirst into a world brimming with innovation, discovery, and growth. SITEAO is poised to be more than just an academic organization; it aims to be a guiding light, illuminating "new opportunities and experiences that will light your path to success!" For students passionate about the dynamic fields of science, information technology, and engineering, SITEAO promises a vibrant hub of learning, collaboration, and unforgettable memories.
              <br />
              <br />
              As the Ateneo community opens its arms to a new batch of bright minds, SITEAO encourages all freshies to seize this moment. "Discover what the Science Information Technology and Engineering Academic Organization has to offer," they urge, inviting newcomers to explore the myriad possibilities and join them in crafting "unforgettable memories."
              <br />
              <br />
              So, for all the freshies ready to embrace their "Viaje Para Na Ateneo," keep an eye out for SITEAO. Your journey through the academic landscape is just beginning, and with organizations like SITEAO leading the way, it promises to be nothing short of extraordinary. Stay tuned, as the campus continues to unveil more amazing organizations ready to enrich your college experience!
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-orsem-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative"> {/* Added relative for overlay positioning */}
        {/* Title at the top */}
        <div
          ref={titleRef}
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          Sitio de SITEAO OrSem 2024
          {/* Hamburger menu button for mobile layout */}
          <button
            onClick={toggleOverlay}
            className="mt-4 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300"
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
              className="mobile-image-container relative p-1 bg-white rounded shadow-md mx-auto"
              style={{ transform: `rotate(${imageTilts[index]}deg)` }}
            >
              <MemoizedImage
                addRef={addToImageRefs}
                src={url}
                alt={`SITEAO OrSem 2024 photo ${index + 1}`}
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
              Full Steam Ahead: SITEAO+ Welcomes Freshies to a "Viaje Para Na Ateneo"!
            </h1>
            <p className=" text-white text-sm leading-relaxed">
              The call has gone out: "SAKAY NA, FRESHIES! SITIO SITEAO!" — a vibrant invitation for incoming students to hop aboard and embark on an exciting journey into university life. As OrSem 2024: Viaje Para Na Ateneo kicks off, the Science Information Technology and Engineering Academic Organization (SITEAO) stands ready, buzzing with excitement to be a pivotal part of every freshie's adventure.
              <br />
              <br />
              This isn't just about starting college; it's about diving headfirst into a world brimming with innovation, discovery, and growth. SITEAO is poised to be more than just an academic organization; it aims to be a guiding light, illuminating "new opportunities and experiences that will light your path to success!" For students passionate about the dynamic fields of science, information technology, and engineering, SITEAO promises a vibrant hub of learning, collaboration, and unforgettable memories.
              <br />
              <br />
              As the Ateneo community opens its arms to a new batch of bright minds, SITEAO encourages all freshies to seize this moment. "Discover what the Science Information Technology and Engineering Academic Organization has to offer," they urge, inviting newcomers to explore the myriad possibilities and join them in crafting "unforgettable memories."
              <br />
              <br />
              So, for all the freshies ready to embrace their "Viaje Para Na Ateneo," keep an eye out for SITEAO. Your journey through the academic landscape is just beginning, and with organizations like SITEAO leading the way, it promises to be nothing short of extraordinary. Stay tuned, as the campus continues to unveil more amazing organizations ready to enrich your college experience!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
