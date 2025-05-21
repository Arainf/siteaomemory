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

export default function Atfest() {
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

  // Define 14 image URLs for the Atfest component
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787655/DSC_9348_j1snqm.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787656/DSC_9728_mnnpdm.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787657/csit_portrait-17_a4omjg.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747785983/20241213_0076_n2rl0m.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747786029/20241213_0133_f6g871.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747786339/20241213_0852_nkkuda.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747786362/20241213_0871_cdy6lw.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747786402/20241213_0929_zmej6f.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747786412/20241213_0937_yov9ij.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747786459/20241213_1017_ll88rk.webp",
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
          trigger: '.mobile-atfest-container',
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
        className="hidden md:grid h-[350vh] grid-cols-3 grid-rows-10 gap-1 relative" // Adjusted grid-rows for 14 images
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          Unity in Mission: SITEAO Griffins Shine at Ateneo Fiesta 2024
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Menu className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 14 Images */}
        <div className="col-start-2 col-span-2 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="Atfest photo 1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-2 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="Atfest photo 2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-2 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="Atfest photo 3"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-4 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]}
            alt="Atfest photo 4"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-2 row-start-4 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[4]}
            alt="Atfest photo 5"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-5 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[5]}
            alt="Atfest photo 6"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 col-span-1 row-start-6 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[6]}
            alt="Atfest photo 7"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-3 col-span-1 row-start-6 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[7]}
            alt="Atfest photo 8"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 col-span-1 row-start-7 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[8]}
            alt="Atfest photo 9"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 col-span-2 row-start-8 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[9]}
            alt="Atfest photo 10"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 col-span-1 row-start-9 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[10]}
            alt="Atfest photo 11"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 col-span-2 row-start-10 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[11]}
            alt="Atfest photo 12"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-1 col-span-1 row-start-10 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[12]}
            alt="Atfest photo 13"
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
              Unity in Mission: SITEAO Griffins Shine at Ateneo Fiesta 2024
            </h1>
            <p className="text-xl text-white leading-relaxed">
              The spirit of unity and shared purpose resonated deeply at Ateneo Fiesta 2024, held from December 9-11, 2024. Under the inspiring banner, "𝐈-𝐈𝐬𝐚𝐧𝐠 𝐌𝐢𝐬𝐲𝐨𝐧, 𝐈-𝐈𝐬𝐚𝐧𝐠 𝐃𝐚𝐚𝐧 – 𝐌𝐚𝐠𝐤𝐚𝐤𝐚𝐬𝐚𝐦𝐚 𝐭𝐚𝐲𝐨, 𝐖𝐚𝐥𝐚𝐧𝐠 𝐈𝐰𝐚𝐧𝐚𝐧!" the SITEAO Griffins made a truly strong and memorable showing.
              <br />
              <br />
              Throughout the three-day fiesta, SITEAO members actively participated, contributing their unique talents and embodying the core values of the Ateneo community. SITEAO’s presence at Ateneo Fiesta 2024 underscored how the organization seamlessly integrates its technical pursuits with a broader commitment to service and communal solidarity. The Griffins' participation highlighted their holistic development, showcasing that they are not just skilled individuals but also engaged members of a larger family, walking together towards a common goal.
              <br />
              <br />
              The success of SITEAO's involvement in this year's Ateneo Fiesta served as a powerful testament to their collective strength and dedication, reinforcing the message that in unity, there is indeed strength and no one is left behind.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-atfest-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          Unity in Mission: SITEAO Griffins Shine at Ateneo Fiesta 2024
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
                alt={`Atfest photo ${index + 1}`}
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
              Unity in Mission: SITEAO Griffins Shine at Ateneo Fiesta 2024
            </h1>
            <p className="text-sm text-white leading-relaxed">
              The spirit of unity and shared purpose resonated deeply at Ateneo Fiesta 2024, held from December 9-11, 2024. Under the inspiring banner, "𝐈-𝐈𝐬𝐚𝐧𝐠 𝐌𝐢𝐬𝐲𝐨𝐧, 𝐈-𝐈𝐬𝐚𝐧𝐠 𝐃𝐚𝐚𝐧 – 𝐌𝐚𝐠𝐤𝐚𝐤𝐚𝐬𝐚𝐦𝐚 𝐭𝐚𝐲𝐨, 𝐖𝐚𝐥𝐚𝐧𝐠 𝐈𝐰𝐚𝐧𝐚𝐧!" the SITEAO Griffins made a truly strong and memorable showing.
              <br />
              <br />
              Throughout the three-day fiesta, SITEAO members actively participated, contributing their unique talents and embodying the core values of the Ateneo community. SITEAO’s presence at Ateneo Fiesta 2024 underscored how the organization seamlessly integrates its technical pursuits with a broader commitment to service and communal solidarity. The Griffins' participation highlighted their holistic development, showcasing that they are not just skilled individuals but also engaged members of a larger family, walking together towards a common goal.
              <br />
              <br />
              The success of SITEAO's involvement in this year's Ateneo Fiesta served as a powerful testament to their collective strength and dedication, reinforcing the message that in unity, there is indeed strength and no one is left behind.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

