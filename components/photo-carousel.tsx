"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import gsap from "gsap"

interface Photo {
  id: number
  src: string
  alt: string
}

interface PhotoCarouselProps {
  photos: Photo[]
}

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize slide refs
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, photos.length)
  }, [photos.length])

  // Handle next/previous navigation
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length
    animateSlide(currentIndex, nextIndex, 1)
    setCurrentIndex(nextIndex)
  }

  const handlePrevious = () => {
    const nextIndex = (currentIndex - 1 + photos.length) % photos.length
    animateSlide(currentIndex, nextIndex, -1)
    setCurrentIndex(nextIndex)
  }

  // Animate slide transition
  const animateSlide = (current: number, next: number, direction: number) => {
    if (!slideRefs.current[current] || !slideRefs.current[next]) return

    // Reset the next slide position
    gsap.set(slideRefs.current[next], {
      x: direction * 1000,
      opacity: 0,
      zIndex: 1,
    })

    // Animate current slide out
    gsap.to(slideRefs.current[current], {
      x: -direction * 1000,
      opacity: 0,
      zIndex: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })

    // Animate next slide in
    gsap.to(slideRefs.current[next], {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    })
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      handleNext()
    }, 5000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [autoplay, currentIndex])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            ref={(el) => (slideRefs.current[index] = el)}
            className="absolute inset-0"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const direction = index > currentIndex ? 1 : -1
                animateSlide(currentIndex, index, direction)
                setCurrentIndex(index)
              }}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
