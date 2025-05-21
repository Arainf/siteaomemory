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

export default function Induction() {
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

  // Define 12 image URLs for the Induction component
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677502/groop_0_02_ohkzhw.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677501/evenmore_08_udthiz.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677501/groop_0_01_vajidz.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677491/img_10_eurvqc.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677491/img_4_sva5rf.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677490/img_7_pp4lsu.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677490/img_8_qrlrxc.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677490/img_13_dhhshc.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677490/img_6_gdcozx.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677492/img_3_pcyfjh.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677491/img_5_kwqtpa.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747677490/img_9_folhez.webp",
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
          trigger: '.mobile-induction-container',
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
        className="hidden md:grid h-[300vh] grid-cols-3 grid-rows-10 gap-1 relative"
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          SITEAO INDUCTION 2024-2025
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Menu className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 12 Images (Non-overlapping) */}
        <div className="col-start-2 col-span-2 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="Induction photo 1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-2 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="Induction photo 2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-2 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="Induction photo 3"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-4 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]}
            alt="Induction photo 4"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-2 row-start-4 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[4]}
            alt="Induction photo 5"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-5 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[5]}
            alt="Induction photo 6"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-1 row-start-6 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[6]}
            alt="Induction photo 7"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-3 col-span-1 row-start-6 row-span-3">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[7]}
            alt="Induction photo 8"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-2 row-start-7 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[8]}
            alt="Induction photo 9"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-9 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[9]}
            alt="Induction photo 10"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-2 row-start-9 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[10]}
            alt="Induction photo 11"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-10 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[11]}
            alt="Induction photo 12"
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
              New Leaders Take the Helm: SITEAO Inducts 2024-2025 Officers
            </h1>
            <p className="text-xl text-white leading-relaxed">
              On August 24, 2024, at the bustling Multi-Purpose Covered Court 2, the Science Information Technology and Engineering Academic Organization (SITEAO) officially ushered in its new leadership for the Academic Year 2024-2025 with a formal Induction of Officers.
              <br />
              <br />
              The ceremony saw the incoming team take their oaths, led by the esteemed SITEAO Governor Franchesca Bernardo, Vice Governor Sitti Tingkahan, and dedicated Moderator Mr. Daniel Hernandez. This moment marked a significant transition, as these individuals stepped forward to embrace the responsibilities of guiding one of the university's key academic organizations.
              <br />
              <br />
              The induction serves as a powerful reminder of the commitment these officers have made to their fellow students. The community extends its well wishes, hoping that "all of the newly appointed officers continue to serve with passion, humility, and dedication, in service to our student body." This core principle of service is paramount to the spirit of SITEAO and its mission to foster academic excellence and student development.
              <br />
              <br />
              As they begin their term, the newly inducted officers embody the inspiring motto: "Mata sa Langit, Paa sa Lupa!" – a call to remain grounded and humble while always aiming high in their aspirations and efforts for the SITEAO community. With this new leadership at the helm, the academic year promises to be a period of growth, innovation, and continued success for all Griffins.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-induction-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          SITEAO INDUCTION 2024-2025
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
                alt={`Induction photo ${index + 1}`}
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
              New Leaders Take the Helm: SITEAO Inducts 2024-2025 Officers
            </h1>
            <p className="text-sm text-white leading-relaxed">
              On August 24, 2024, at the bustling Multi-Purpose Covered Court 2, the Science Information Technology and Engineering Academic Organization (SITEAO) officially ushered in its new leadership for the Academic Year 2024-2025 with a formal Induction of Officers.
              <br />
              <br />
              The ceremony saw the incoming team take their oaths, led by the esteemed SITEAO Governor Franchesca Bernardo, Vice Governor Sitti Tingkahan, and dedicated Moderator Mr. Daniel Hernandez. This moment marked a significant transition, as these individuals stepped forward to embrace the responsibilities of guiding one of the university's key academic organizations.
              <br />
              <br />
              The induction serves as a powerful reminder of the commitment these officers have made to their fellow students. The community extends its well wishes, hoping that "all of the newly appointed officers continue to serve with passion, humility, and dedication, in service to our student body." This core principle of service is paramount to the spirit of SITEAO and its mission to foster academic excellence and student development.
              <br />
              <br />
              As they begin their term, the newly inducted officers embody the inspiring motto: "Mata sa Langit, Paa sa Lupa!" – a call to remain grounded and humble while always aiming high in their aspirations and efforts for the SITEAO community. With this new leadership at the helm, the academic year promises to be a period of growth, innovation, and continued success for all Griffins.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
