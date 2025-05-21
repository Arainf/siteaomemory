"use client"

import { useState, useRef, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Flippable Card Component
type FlippableCardProps = {
  member: {
    name: string
    role: string
    imageUrl: string
    category: string
    academicYear?: string
    honorific?: string
  }
  cardRef: (node: HTMLDivElement | null) => void
  index: number
}

const FlippableCard = ({ member, cardRef, index }: FlippableCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardInnerRef = useRef<HTMLDivElement>(null)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Adjust font size for longer role titles
  const getRoleFontSize = (role: string) => {
    if (role.length > 25) return "text-lg md:text-xl"
    if (role.length > 15) return "text-xl md:text-2xl"
    return "text-2xl md:text-3xl"
  }

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-sm h-[450px] cursor-pointer"
      onClick={handleFlip}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardInnerRef}
        className={`relative w-full h-full transition-all duration-700 ease-out ${
          isFlipped ? "rotate-y-180" : "rotate-x-12"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateX(12deg)",
        }}
      >
        {/* Card Back (Initially Visible) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl shadow-xl 
                     bg-gradient-to-br from-orange-500 to-orange-600 
                     border-4 border-orange-400 flex items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative inline-block text-[40px] font-horizon leading-none text-center">
              <span className="absolute inset-0 text-white translate-y-1 opacity-40">SITEAO</span>
              <span className="absolute inset-0 text-white translate-y-2 opacity-30">SITEAO</span>
              <span className="relative text-white">SITEAO</span>
            </div>
            <div className="w-16 h-1 rounded-full bg-white/30"></div>
            <p className="text-white/70 text-sm font-horizon uppercase tracking-wider">{member.role}</p>
          </div>
        </div>

        {/* Card Front (Initially Hidden) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Full image background */}
          <div className="absolute inset-0">
            <Image
              src={member.imageUrl || "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747794227/Untitled_design_4_a68hxj.png"}
              alt={member.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Border */}
          <div className="absolute inset-0 border-4 border-orange-300 rounded-2xl"></div>

          {/* Text overlay at bottom */}
          <div className="absolute justify-start items-start flex flex-col bottom-0 left-0 right-0 p-6 z-10">
            {/* Role title with dynamic font size */}
            <h2
              className={`${getRoleFontSize(member.role)} font-horizon font-bold text-white uppercase tracking-wider`}
            >
              {member.role}
            </h2>

            {/* Name with honorific */}
            <h3 className="text-xl font-century text-white">
              {member.honorific} {member.name}
            </h3>

            {/* Academic Year */}
            <p className="text-white/90 text-sm">{member.academicYear}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Define the team members data
const teamMembers = [
  {
    name: "Franchesca Bernardo",
    honorific: "Hon.",
    role: "Governor",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747792616/1_xu5hgd.webp",
    category: "leadership",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Sitti Alyssa Tingkahan",
    honorific: "",
    role: "Vice Governor",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747792619/2_aften3.webp",
    category: "leadership",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Adrian Rainier Fabian",
    honorific: "",
    role: "Tech and Documentation Head",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747793149/Untitled_design_3_kt0le8.png",
    category: "head",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "John Wyne Quilicon",
    honorific: "",
    role: "Public Relations Head",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747792600/6_bqhadc.webp",
    category: "head",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Al Dave Cedric Tundag",
    honorific: "",
    role: "Tech and Documentation SubHead",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747792625/4_wy98dt.webp",
    category: "subhead",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "John Yeshua Manzon",
    honorific: "",
    role: "Member",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747792597/5_gl3blg.webp",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Ysabel Danielle Atienza",
    honorific: "",
    role: "Member",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747792613/7_b7hagx.webp",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Christian Benedict Dela Torre",
    honorific: "",
    role: "Member",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747792601/8_cufnaa.webp",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Robi Danganan",
    honorific: "",
    role: "Member",
    imageUrl: "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747792610/9_fljidf.webp",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Gionne Niño Dimaculangan",
    honorific: "",
    role: "Member",
    imageUrl: "",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Mikee Semil",
    honorific: "",
    role: "Member",
    imageUrl: "",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Nathanielle Dae Aquino",
    honorific: "",
    role: "Member",
    imageUrl: "",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Zedrick Eleazar Wadja",
    honorific: "",
    role: "Member",
    imageUrl: "",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
  {
    name: "Lesbert Almazan",
    honorific: "",
    role: "Member",
    imageUrl: "",
    category: "member",
    academicYear: "A.Y. 24-25",
  },
]

function AboutUs() {
  const sectionRef = useRef(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const addToCardRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation for cards
      cardRefs.current.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 50,
          rotateX: 12, // Start with cards tilted down
        })

        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Head>
        <title>About Us - SITEAO</title>
        <meta name="description" content="Meet the team behind the SITEAO website" />
        <style>{`
          /* Fix for 3D transforms */
          [style*="transform-style: preserve-3d"] {
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
          }
          
          [style*="backface-visibility: hidden"] {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          
          .rotate-x-12 {
            transform: rotateX(12deg);
          }
        `}</style>
      </Head>

      <div className="absolute inset-0 h-screen grid-background" />

      <main ref={sectionRef} className="flex min-h-screen flex-col items-center justify-center p-8 pt-20 relative z-10">
        <div className="relative z-50 inline-block text-[85px] lg:text-[160px] font-horizon leading-none mb-12">
          <span className="absolute inset-0 text-white translate-y-3 opacity-40">ABOUT US</span>
          <span className="absolute inset-0 text-white translate-y-6 opacity-30">ABOUT US</span>
          <span className="relative text-white">ABOUT US</span>
        </div>

        <div className="w-full max-w-6xl mx-auto space-y-20">
          {/* Governor | Vice Governor */}
          <section className="text-center">
            <h2 className="text-4xl font-century font-extrabold text-white mb-8 relative inline-block">
              <span className="relative z-10">Leadership</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
              {teamMembers
                .filter((member) => member.category === "leadership")
                .map((member, index) => (
                  <FlippableCard key={index} member={member} cardRef={addToCardRefs} index={index} />
                ))}
            </div>
          </section>

          {/* Tech and Documentation Head | Public Relations Head */}
          <section className="text-center">
            <h2 className="text-4xl font-century font-extrabold text-white mb-8 relative inline-block">
              <span className="relative z-10">Heads</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
              {teamMembers
                .filter((member) => member.category === "head")
                .map((member, index) => (
                  <FlippableCard key={index} member={member} cardRef={addToCardRefs} index={index} />
                ))}
            </div>
          </section>

          {/* Tech and Documentation SubHead */}
          <section className="text-center">
            <h2 className="text-4xl font-century font-extrabold text-white mb-8 relative inline-block">
              <span className="relative z-10">Sub-Heads</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500 rounded-full"></span>
            </h2>
            <div className="flex justify-center">
              {teamMembers
                .filter((member) => member.category === "subhead")
                .map((member, index) => (
                  <FlippableCard key={index} member={member} cardRef={addToCardRefs} index={index} />
                ))}
            </div>
          </section>

          {/* Members */}
          <section className="text-center">
            <h2 className="text-4xl font-century font-extrabold text-white mb-8 relative inline-block">
              <span className="relative z-10">Members</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {teamMembers
                .filter((member) => member.category === "member")
                .map((member, index) => (
                  <FlippableCard key={index} member={member} cardRef={addToCardRefs} index={index + 10} />
                ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default AboutUs
