import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Folder } from 'lucide-react'
import Link from 'next/link'
import ImageWithFallback from '@/utils/fallback'

gsap.registerPlugin(ScrollTrigger)

function DynamicGallery({ title, folderName, linkUrl, layoutStyle = "mixed" }) {
   const [images, setImages] = useState([])
   const [loading, setLoading] = useState(true)
   const sectionRef = useRef(null)
   const titleRef = useRef(null)
   const imageRefs = useRef([])
   const textRef = useRef(null)
   imageRefs.current = []

   const addToImageRefs = (el) => {
      if (el && !imageRefs.current.includes(el)) {
         imageRefs.current.push(el)
      }
   }

   // Function to fetch images from Cloudinary
   const fetchImagesFromCloudinary = async () => {
      try {
         setLoading(true)
         const response = await fetch(`/api/cloudinary?folder=${folderName}`)
         
         if (!response.ok) {
            throw new Error('Failed to fetch images')
         }
         
         const data = await response.json()
         setImages(data)
      } catch (error) {
         console.error('Error fetching images:', error)
      } finally {
         setLoading(false)
      }
   }

   // Generate a layout pattern based on chosen style
   const generateLayout = (imageCount) => {
      // Define layout patterns from each component style
      const layoutPatterns = {
         // Orsem-inspired layout pattern
         orsem: [
            { colStart: 2, rowStart: 1, colSpan: 2, rowSpan: 2 },
            { colStart: 1, rowStart: 3, colSpan: 2, rowSpan: 2 },
            { colStart: 1, rowStart: 2, colSpan: 1, rowSpan: 1 },
            { colStart: 3, rowStart: 3, colSpan: 1, rowSpan: 1 },
            { colStart: 3, rowStart: 4, colSpan: 1, rowSpan: 1 },
            { colStart: 1, rowStart: 5, colSpan: 1, rowSpan: 1 },
            { colStart: 1, rowStart: 6, colSpan: 1, rowSpan: 1 },
            { colStart: 2, rowStart: 5, colSpan: 2, rowSpan: 2 },
            { colStart: 1, rowStart: 7, colSpan: 2, rowSpan: 1 },
            { colStart: 3, rowStart: 7, colSpan: 1, rowSpan: 2 },
            { colStart: 1, rowStart: 8, colSpan: 1, rowSpan: 1 },
            { colStart: 2, rowStart: 8, colSpan: 1, rowSpan: 1 },
            { colStart: 1, rowStart: 9, colSpan: 1, rowSpan: 3 },
            { colStart: 2, rowStart: 9, colSpan: 1, rowSpan: 1 },
            { colStart: 3, rowStart: 9, colSpan: 1, rowSpan: 2 },
            { colStart: 2, rowStart: 10, colSpan: 1, rowSpan: 1 },
            { colStart: 1, rowStart: 12, colSpan: 1, rowSpan: 1 },
            { colStart: 2, rowStart: 11, colSpan: 2, rowSpan: 2 },
         ],
         
         // Compono-inspired layout pattern
         compono: [
            { colStart: 2, rowStart: 1, colSpan: 2, rowSpan: 1 },
            { colStart: 3, rowStart: 2, colSpan: 1, rowSpan: 2 },
            { colStart: 1, rowStart: 2, colSpan: 2, rowSpan: 3 },
            { colStart: 3, rowStart: 4, colSpan: 1, rowSpan: 2 },
            { colStart: 1, rowStart: 5, colSpan: 1, rowSpan: 2 },
            { colStart: 2, rowStart: 5, colSpan: 1, rowSpan: 2 },
            { colStart: 3, rowStart: 6, colSpan: 1, rowSpan: 1 },
         ],
         
         // Siteaoplus-inspired layout pattern
         siteaoplus: [
            { colStart: 2, rowStart: 1, colSpan: 2, rowSpan: 2 },
            { colStart: 2, rowStart: 3, colSpan: 2, rowSpan: 2 },
            { colStart: 1, rowStart: 2, colSpan: 1, rowSpan: 2 },
            { colStart: 1, rowStart: 4, colSpan: 1, rowSpan: 1 },
            { colStart: 1, rowStart: 5, colSpan: 2, rowSpan: 2 },
            { colStart: 3, rowStart: 5, colSpan: 1, rowSpan: 1 },
            { colStart: 3, rowStart: 6, colSpan: 1, rowSpan: 2 },
            { colStart: 2, rowStart: 7, colSpan: 1, rowSpan: 1 },
            { colStart: 1, rowStart: 7, colSpan: 1, rowSpan: 2 },
            { colStart: 2, rowStart: 8, colSpan: 2, rowSpan: 1 },
         ]
      }
      
      // Create a mixed pattern by combining all patterns
      const mixedPatterns = [
         ...layoutPatterns.orsem,
         ...layoutPatterns.compono,
         ...layoutPatterns.siteaoplus
      ]
      
      // Remove duplicates by converting to a string representation of each cell position
      const uniquePatterns = Array.from(
         new Map(
            mixedPatterns.map(pattern => [
               `${pattern.colStart},${pattern.rowStart},${pattern.colSpan},${pattern.rowSpan}`,
               pattern
            ])
         ).values()
      )
      
      // Select which pattern set to use
      let selectedPatterns
      switch (layoutStyle) {
         case "orsem":
            selectedPatterns = layoutPatterns.orsem
            break
         case "compono":
            selectedPatterns = layoutPatterns.compono
            break
         case "siteaoplus":
            selectedPatterns = layoutPatterns.siteaoplus
            break
         case "mixed":
         default:
            selectedPatterns = uniquePatterns
      }
      
      // For additional images beyond our predefined patterns, create more layouts
      // by shifting down the grid
      const completeLayout = []
      
      // Track cells that are already occupied to avoid overlaps
      const occupiedCells = new Set(['1,1']) // Reserve top-left for title
      
      // First add our predefined layouts (as many as we need)
      for (let i = 0; i < Math.min(imageCount, selectedPatterns.length); i++) {
         const pattern = selectedPatterns[i]
         
         // Add this layout to our final layout array
         completeLayout.push({
            index: i,
            ...pattern
         })
         
         // Mark these cells as occupied
         for (let r = 0; r < pattern.rowSpan; r++) {
            for (let c = 0; c < pattern.colSpan; c++) {
               const cellKey = `${pattern.colStart + c},${pattern.rowStart + r}`
               occupiedCells.add(cellKey)
            }
         }
      }
      
      // If we need additional layouts beyond our predefined patterns
      if (imageCount > selectedPatterns.length) {
         // Find the maximum row already used
         let maxRowUsed = 1
         selectedPatterns.forEach(pattern => {
            const rowEnd = pattern.rowStart + pattern.rowSpan - 1
            maxRowUsed = Math.max(maxRowUsed, rowEnd)
         })
         
         let currentRow = maxRowUsed + 1 // Start after our predefined layouts
         let currentCol = 1
         let imageIndex = selectedPatterns.length
         
         // Create interesting patterns for additional images
         // Use a strategy inspired by all three components
         while (imageIndex < imageCount) {
            // Choose a pattern type for variety
            const patternType = imageIndex % 5
            let colSpan = 1
            let rowSpan = 1
             
            // Create different layout patterns based on position
            switch (patternType) {
               case 0: // Large horizontal
                  colSpan = Math.min(3, 3 - currentCol + 1)
                  rowSpan = 1
                  break
               case 1: // Tall vertical
                  colSpan = 1
                  rowSpan = 2
                  break
               case 2: // Medium square
                  colSpan = Math.min(2, 3 - currentCol + 1)
                  rowSpan = Math.min(2, 3 - currentCol + 1)
                  break
               case 3: // Medium horizontal
                  colSpan = Math.min(2, 3 - currentCol + 1)
                  rowSpan = 1
                  break
               default: // Standard
                  colSpan = 1
                  rowSpan = 1
            }
            
            // Make sure we don't exceed grid boundaries
            if (currentCol + colSpan - 1 > 3) {
               currentCol = 1
               currentRow++
            }
            
            // Add this layout
            completeLayout.push({
               index: imageIndex,
               colStart: currentCol,
               rowStart: currentRow,
               colSpan,
               rowSpan
            })
            
            // Move to next cell
            currentCol += colSpan
            if (currentCol > 3) {
               currentCol = 1
               currentRow++
            }
            
            imageIndex++
         }
      }
      
      return completeLayout
   }

   useEffect(() => {
      fetchImagesFromCloudinary()
   }, [folderName])

   useEffect(() => {
      if (loading || images.length === 0) return

      const ctx = gsap.context(() => {
         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: sectionRef.current,
               start: 'top 80%',
               end: 'bottom center',
               toggleActions: 'play none none none',
            },
         })

         tl.from(titleRef.current, {
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
            .from(textRef.current, {
               y: 30,
               opacity: 0,
               duration: 1,
            })
      }, sectionRef)

      return () => ctx.revert()
   }, [loading, images.length])

   // Calculate maximum rows needed based on layout
   const calculateMaxRows = () => {
      if (!layout || layout.length === 0) return 12;
      
      let maxRowEnd = 1; // Start with at least 1 row for the title
      layout.forEach(item => {
         const rowEnd = item.rowStart-1 + item.rowSpan;
         maxRowEnd = Math.max(maxRowEnd, rowEnd);
      });
      
      return maxRowEnd;
   }

   // Calculate appropriate height based on the layout style
   const calculateGridHeight = () => {
      switch (layoutStyle) {
         case "orsem":
            return "h-[400vh]"; // Matches Orsem's height
         case "compono":
            return "h-[150vh]"; // Matches Compono's height
         case "siteaoplus":
            return "h-[250vh]"; // Matches Siteaoplus's height
         case "mixed":
         default:
            // Dynamic height based on content
            const maxRows = calculateMaxRows();
            return maxRows <= 8 ? "h-[250vh]" : maxRows <= 12 ? "h-[300vh]" : "h-[400vh]";
      }
   }

   // Generate layout when images are loaded
   const layout = !loading && images.length > 0 ? generateLayout(images.length) : []

   if (loading) {
      return (
         <div className="flex h-screen items-center justify-center">
            <div className="text-xl">Loading gallery...</div>
         </div>
      )
   }

   return (
      <div
         ref={sectionRef}
         className={`grid grid-cols-3 gap-1 ${calculateGridHeight()}`}
         style={{ 
            gridTemplateRows: `repeat(${calculateMaxRows()}, minmax(25vh, 1fr))`,
         }}
      >
         <div
            ref={titleRef}
            className="col-start-1 row-start-1 flex max-w-[40ch] flex-col gap-2 items-center justify-center font-century text-3xl lg:text-5xl font-extrabold text-white sm:max-w-[32ch] relative"
         >
            {title}
            {linkUrl && (
               <Link href={linkUrl} className='absolute h-15 w-15 bottom-0 right-0 m-3 border rounded-full p-2 hover:bg-black hover:ease-in-out duration-300'>
                  <Folder />
               </Link>
            )}
         </div>
         {/* Render one image per cell, looping images if not enough to fill all cells */}
         {layout.map((cell, i) => {
            if (images.length === 0) return null;
            const image = images[i % images.length];
            const { colStart, rowStart, colSpan, rowSpan } = cell;
            return (
               <div 
                  key={`${cell.colStart}-${cell.rowStart}-${image.public_id}`}
                  style={{
                     gridColumn: `${colStart} / span ${colSpan}`,
                     gridRow: `${rowStart} / span ${rowSpan}`,
                  }}
               >
                  <ImageWithFallback
                     addRef={addToImageRefs}
                     src={image.secure_url}
                     alt={`Gallery image ${(i % images.length) + 1}`}
                     className="h-full w-full object-cover"
                  />
               </div>
            );
         })}
         {/* Hidden ref element for animation */}
         <div ref={textRef} className="hidden"></div>
      </div>
   )
}

export default DynamicGallery