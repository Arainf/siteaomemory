import { useState } from 'react'

function ImageWithFallback({ src, alt, className, addRef }) {
   const [loaded, setLoaded] = useState(false)

   return (
      <div className={`relative w-full h-full ${className}`}>
         {!loaded && (
            <div className="absolute inset-0 bg-gray-800 h-full w-full flex items-center justify-center text-white font-horizon text-xl z-0">
               SITEAO
            </div>
         )}
         <img
            loading="lazy"
            ref={addRef}
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover z-10 ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
         />
      </div>
   )
}

export default ImageWithFallback
