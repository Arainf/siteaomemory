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

export default function Ambas() {
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

  // Define 8 image URLs for the Ambas component
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747764856/cookieboy_hhsxvb.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747764850/cookiegirl_symqwo.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747764855/candygirl_jw5ueg.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747764853/candyboy_rdbsaq.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747764852/smoothiegirl_eq1klk.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747764851/smoothieboy_o3orfx.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747764851/gummygirl_jzscfr.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747764850/gummyboy_rmerpj.webp",
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
          trigger: '.mobile-ambas-container',
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
        className="hidden md:grid h-[250vh] grid-cols-3 grid-rows-8 gap-1 relative" // Adjusted grid-rows for 8 images
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          SWEETAO Days 2024 Ambassadors
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Menu className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 8 Images (arranged in pairs) */}
        <div className="col-start-2 col-span-1 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]} // cookieboy
            alt="Cookie Boy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-3 col-span-1 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}  // cookiegirl
            alt="Cookie Girl"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-3 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]} // candygirl
            alt="Candy Girl"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 col-span-1 row-start-3 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]} // candyboy
            alt="Candy Boy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-1 row-start-5 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[4]} // smoothiegirl
            alt="Smoothie Girl"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-3 col-span-1 row-start-5 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[5]} // smoothieboy
            alt="Smoothie Boy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-7 row-span-2">
           <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[6]} // gummygirl
            alt="Gummy Girl"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-start-2 col-span-1 row-start-7 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[7]} // gummyboy
            alt="Gummy Boy"
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
              SWEETAO Days 2024 Ambassadors
            </h1>
            <p className="text-xl text-white leading-relaxed mb-8">
              Adding an extra layer of excitement and charm to the event, SWEETAO Days 2024 also proudly revealed its official ambassadors. These individuals embodied the "Very Sweet, Very Cutesy" spirit of the event, helping to spread the joy and magic throughout the campus.
            </p>
            <div className="text-xl text-white leading-relaxed grid grid-cols-2 gap-8">
                <div>
                    <h2 className="font-semibold mb-2">Cookie Ambassadors</h2>
                    <p>Cookie Crumbles and Sweet Smiles! Craving a classic? The cookies were baked to perfection, with a crispy exterior and a chewy, gooey center.</p>
                </div>
                <div>
                  <h2 className="font-semibold mb-2">Gummy Ambassadors</h2>
                  <p>Gummy Bears and Giggles Galore! Looking for a chewy treat? The gummies came in a variety of flavors and shapes, each one bursting with fruity flavor.</p>
                </div>
                <div>
                  <h2 className="font-semibold mb-2">Candy Ambassadors</h2>
                  <p>Candy Colors and Sugary Smiles! To indulge a sweet tooth, there was candy! From hard candies to chocolate bars, there was something for everyone!</p>
                </div>
                <div>
                  <h2 className="font-semibold mb-2">Smoothie Ambassadors</h2>
                  <p>Smoothie Sippin', Sweetness Drippin'! For a refreshing drink, the smoothies were made with fresh fruits and vegetables, blended to perfection for a healthy and delicious treat.</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-ambas-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          SWEETAO Days 2024 Ambassadors
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
                alt={`SWEETAO Ambassador ${index + 1}`}
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
              SWEETAO Days 2024 Ambassadors
            </h1>
            <p className="text-sm text-white leading-relaxed mb-6">
              Adding an extra layer of excitement and charm to the event, SWEETAO Days 2024 also proudly revealed its official ambassadors. These individuals embodied the "Very Sweet, Very Cutesy" spirit of the event, helping to spread the joy and magic throughout the campus.
            </p>
            <div className="text-sm text-white leading-relaxed space-y-4">
                <div>
                    <h2 className="font-semibold">Cookie Ambassadors</h2>
                    <p>Cookie Crumbles and Sweet Smiles! Craving a classic? The cookies were baked to perfection, with a crispy exterior and a chewy, gooey center.</p>
                </div>
                <div>
                  <h2 className="font-semibold">Gummy Ambassadors</h2>
                  <p>Gummy Bears and Giggles Galore! Looking for a chewy treat? The gummies came in a variety of flavors and shapes, each one bursting with fruity flavor.</p>
                </div>
                <div>
                  <h2 className="font-semibold">Candy Ambassadors</h2>
                  <p>Candy Colors and Sugary Smiles! To indulge a sweet tooth, there was candy! From hard candies to chocolate bars, there was something for everyone!</p>
                </div>
                <div>
                  <h2 className="font-semibold">Smoothie Ambassadors</h2>
                  <p>Smoothie Sippin', Sweetness Drippin'! For a refreshing drink, the smoothies were made with fresh fruits and vegetables, blended to perfection for a healthy and delicious treat.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
