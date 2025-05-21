"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import type { Memory } from "./memory-lane"

interface MemoryCardProps {
  memory: Memory
}

export function MemoryCard({ memory }: MemoryCardProps) {
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
    <div ref={containerRef} className="relative overflow-hidden bg-black/20 backdrop-blur-sm rounded-md h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={memory.src  || "/placeholder.svg?height=400&width=600"}
          alt={memory.alt}
          className="w-full h-full object-cover"
        />

        {/* Polaroid-style frame */}
        <div className="absolute inset-0 border-4 border-white/30 pointer-events-none" />

        {/* Memory details overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-black/70 flex items-end justify-start p-6 text-white">
          <div className="max-w-full">
            <h3 className="text-xl font-bold mb-1">{memory.alt}</h3>
            <p className="text-sm text-white/70 mb-3">{memory.date}</p>
            <p className="text-white/90">{memory.description}</p>
          </div>
        </div>
      </div>

      {/* Caption visible without hover */}
      <div className="p-4">
        <h4 className="text-lg font-medium">{memory.alt}</h4>
        <p className="text-sm text-white/70">{memory.date}</p>
      </div>
    </div>
  )
}
