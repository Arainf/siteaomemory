"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import SimpleModal from "./SimpleModal"

interface DraggablePhotoProps {
  photo: {
    id: number
    src: string
    alt: string
    rotation: number
  }
  initialPosition: {
    x: number
    y: number
  }
}

export function DraggablePhoto({ photo, initialPosition }: DraggablePhotoProps) {
  const photoRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Register the Draggable plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(Draggable)

      if (photoRef.current) {
        // Set initial position and rotation
        gsap.set(photoRef.current, {
          x: initialPosition.x,
          y: initialPosition.y,
          rotation: photo.rotation,
        })

        // Make the element draggable
        const draggable = Draggable.create(photoRef.current, {
          type: "x,y",
          bounds: document.body,
          edgeResistance: 0.65,
          onDragStart: () => {
            gsap.to(photoRef.current, {
              scale: 1,
              zIndex: 50,
              duration: 0.2,
            })
          },
          onDragEnd: () => {
            gsap.to(photoRef.current, {
              scale: 1,
              zIndex: 10,
              duration: 0.2,
            })
          },
        })

        return () => {
          // Clean up
          draggable[0].kill()
        }
      }
    }
  }, [initialPosition, photo.rotation])

  return (
    <>
      <div
        ref={photoRef}
        className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
        style={{ zIndex: 10 }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-black/10 rounded-lg transform translate-x-1 translate-y-1" />
          <div className="bg-white/90 p-1 rounded-sm shadow-lg">
            <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-50 h-36 object-cover rounded" />
          </div>
        </div>
      </div>
    </>
  )
}
