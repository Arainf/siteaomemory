"use client"

import { useState } from 'react'
import { X, Menu } from 'lucide-react'

type EventProps = {
  title: string;
  description: string[];
  images: string[];
}

export default function EventTemplate({ title, description, images }: EventProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Split images into 4 rows
  const rowImages = [
    images.slice(0, Math.ceil(images.length / 4)),
    images.slice(Math.ceil(images.length / 4), Math.ceil(images.length / 2)),
    images.slice(Math.ceil(images.length / 2), Math.ceil(3 * images.length / 4)),
    images.slice(Math.ceil(3 * images.length / 4)),
  ]

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay)
  }

  return (
    <div className="relative min-h-[110vh] z-0">
      {/* Header */}
      <div className="relative z-0 flex justify-between items-center px-8 py-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-century font-extrabold text-white text-shadow-lg">
          {title}
        </h1>
        <button
          onClick={toggleOverlay}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors backdrop-blur-sm"
          aria-label="Toggle event details"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative mt-24 flex flex-col justify-center items-center z-10 ">
        {rowImages.map((images, index) => (
          <div
            key={index}
            className={`relative flex z-10 gap-4 py-4 w-[150vw] ${
              index % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'
            }`}
          >
            {/* First set of images */}
            {images.map((image, imageIndex) => (
              <img
                key={`${index}-${imageIndex}`}
                src={image}
                alt={`Event photo ${imageIndex + 1}`}
                className="h-40 w-60 object-cover rounded-lg z-10 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedImage(image)}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {images.map((image, imageIndex) => (
              <img
                key={`${index}-${imageIndex}-duplicate`}
                src={image}
                alt={`Event photo ${imageIndex + 1}`}
                className="h-40 w-60 object-cover rounded-lg z-10 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Overlays */}
      {(showOverlay || selectedImage) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-20" />
      )}

{showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto pointer-events-auto">
          <div className="w-full h-full flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-12 relative">
            <button
              onClick={toggleOverlay}
              className="absolute top-4 right-4 text-white border rounded-full p-2 hover:bg-white/20"
              aria-label="Close event details"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="max-w-4xl text-white">
              <div className="space-y-6 text-lg">
                {description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image View */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-30 flex items-center justify-center p-4 pointer-events-auto"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white border rounded-full p-2 hover:bg-white/20"
            aria-label="Close fullscreen image"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Selected event photo"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  )
} 