"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface MemorablePhotoProps {
  src: string
  alt: string
  message: string
}

export function MemorablePhoto({ src, alt, message }: MemorablePhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return

    // Set initial state
    gsap.set(overlayRef.current, { opacity: 0 })

    // Create hover animation
    const enterAnimation = () => {
      gsap.to(containerRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const leaveAnimation = () => {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    // Add event listeners
    containerRef.current.addEventListener("mouseenter", enterAnimation)
    containerRef.current.addEventListener("mouseleave", leaveAnimation)

    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mouseenter", enterAnimation)
        containerRef.current.removeEventListener("mouseleave", leaveAnimation)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative rounded-xl h-80 w-80 overflow-hidden bg-black/20 backdrop-blur-sm p-4">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />

        {/* Polaroid-style frame */}
        <div className="absolute inset-0 border-8 border-white opacity-30 pointer-events-none" />

        {/* Message overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-black/60 flex items-end justify-center p-6 text-white">
          <div className="max-w-2xl text-center">
            <h3 className="text-xl font-bold mb-2">Our Most Memorable Moment</h3>
            <p className="text-white/90">{message}</p>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <p className="text-white font-medium">Hover over the image to read the story behind this special moment</p>
      </div>
    </div>
  )
}
