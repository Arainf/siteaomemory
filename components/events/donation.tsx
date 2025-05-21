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

export default function Donation() {
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

  // Define 4 image URLs for the Donation component
  const imageUrls = useMemo(() => [
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747767006/19_kpuyr7.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747767008/20_oix3pi.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747767009/17_zdaysd.webp",
    "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747767004/18_rdcsr8.webp",
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
          trigger: '.mobile-donation-container',
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
        className="hidden md:grid h-[100vh] grid-cols-3 grid-rows-3 gap-1 relative" // Adjusted grid-rows for 4 images
      >
        <div
          ref={titleRef}
          className="flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
        >
          Sweet Hearts, Helping Hands: SITEAO's "Sweet Donation" Drive Aids Zamboanga Flood Victims
          <button
            onClick={toggleOverlay}
            className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'
            aria-label="Toggle information overlay"
          >
            <Menu className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Desktop Grid Item Layouts for 4 Images */}
        <div className="col-start-2 col-span-2 row-start-1 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[0]}
            alt="Donation drive photo 1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-1 col-span-1 row-start-2 row-span-2">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[1]}
            alt="Donation drive photo 2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-3 col-span-1 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[2]}
            alt="Donation drive photo 3"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-start-2 col-span-1 row-start-3 row-span-1">
          <MemoizedImage
            addRef={addToImageRefs}
            src={imageUrls[3]}
            alt="Donation drive photo 4"
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
            <h1 className="text-2xl font-century font-extrabold text-white mb-8">
              Sweet Hearts, Helping Hands: SITEAO's "Sweet Donation" Drive Aids Zamboanga Flood Victims
            </h1>
            <p className="text-md text-white leading-relaxed">
              In a remarkable pivot from party planning to community service, the Science, Information Technology, and Engineering Academic Organization (SITEAO) recently transformed a cancelled event into a powerful act of compassion. When "A Sweet Meet: The SITEAO Acquaintance Party" had to be called off, the SITEAO community didn't miss a beat, instead launching a "Sweet Donation Drive" to extend crucial support to those affected by recent heavy rains in Zamboanga City.
              <br />
              <br />
              The food packs, originally prepared to fuel a night of fun and camaraderie, found a new, vital purpose. They were swiftly redirected and distributed to the families and individuals most impacted by the calamity. This quick and selfless response highlighted the organization's deep commitment to its community beyond academic pursuits.
              <br />
              <br />
              The success of the donation drive was a testament to the power of collaboration. SITEAO worked hand-in-hand with the Executive Council, SITEAO moderators, and representatives from the Vinta organization spearheaded by Ms. Nina Torres. Local government and youth leaders also played a pivotal role, with contributions from Brgy. Putik SK Chairperson Aldrich Chiong, Brgy. Tumaga, represented by Kap. Janet Lim, and Kabataan Partylist Cong. Raoul Manuel, whose support was invaluable.
              <br />
              <br />
              Together, these collective efforts led to a significant impact: SITEAO successfully provided a total of 200 food packs to the affected residents of Barangay Putik and Barangay Tumaga. This direct aid offered immediate relief to those grappling with the aftermath of the heavy rains.
              <br />
              <br />
              SITEAO expressed deep appreciation for the efforts of all the organizations involved, noting that their participation greatly enhanced its initiatives. These included SITEAO, Ateneo Communicators, VINTA, SINAG-AdZU, and Kabataan Partylist - Zamboanga City. Furthermore, a special thanks was extended to Alavar Seafood Restaurant for their generous support, proving that even in times of adversity, community spirit and generosity shine brightest.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="mobile-donation-container flex flex-col items-center pt-8 pb-16 px-4 md:hidden relative">
        <div
          className="mobile-title text-center my-8 text-4xl font-century font-extrabold text-white max-w-sm flex flex-col items-center"
        >
          Sweet Hearts, Helping Hands: SITEAO's "Sweet Donation" Drive Aids Zamboanga Flood Victims
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
                alt={`Donation drive photo ${index + 1}`}
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
            <h1 className="text-1xl font-century font-extrabold text-white mb-6">
              Sweet Hearts, Helping Hands: SITEAO's "Sweet Donation" Drive Aids Zamboanga Flood Victims
            </h1>
            <p className="text-xs text-white leading-relaxed">
              In a remarkable pivot from party planning to community service, the Science, Information Technology, and Engineering Academic Organization (SITEAO) recently transformed a cancelled event into a powerful act of compassion. When "A Sweet Meet: The SITEAO Acquaintance Party" had to be called off, the SITEAO community didn't miss a beat, instead launching a "Sweet Donation Drive" to extend crucial support to those affected by recent heavy rains in Zamboanga City.
              <br />
              <br />
              The food packs, originally prepared to fuel a night of fun and camaraderie, found a new, vital purpose. They were swiftly redirected and distributed to the families and individuals most impacted by the calamity. This quick and selfless response highlighted the organization's deep commitment to its community beyond academic pursuits.
              <br />
              <br />
              The success of the donation drive was a testament to the power of collaboration. SITEAO worked hand-in-hand with the Executive Council, SITEAO moderators, and representatives from the Vinta organization spearheaded by Ms. Nina Torres. Local government and youth leaders also played a pivotal role, with contributions from Brgy. Putik SK Chairperson Aldrich Chiong, Brgy. Tumaga, represented by Kap. Janet Lim, and Kabataan Partylist Cong. Raoul Manuel, whose support was invaluable.
              <br />
              <br />
              Together, these collective efforts led to a significant impact: SITEAO successfully provided a total of 200 food packs to the affected residents of Barangay Putik and Barangay Tumaga. This direct aid offered immediate relief to those grappling with the aftermath of the heavy rains.
              <br />
              <br />
              SITEAO expressed deep appreciation for the efforts of all the organizations involved, noting that their participation greatly enhanced its initiatives. These included SITEAO, Ateneo Communicators, VINTA, SINAG-AdZU, and Kabataan Partylist - Zamboanga City. Furthermore, a special thanks was extended to Alavar Seafood Restaurant for their generous support, proving that even in times of adversity, community spirit and generosity shine brightest.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

