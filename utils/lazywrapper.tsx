"use client"
import { useEffect, useRef, useState } from "react"

interface LazyRenderProps {
  children: React.ReactNode
  rootMargin?: string
}

export default function LazyRender({ children, rootMargin = "200px" }: LazyRenderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return <div ref={ref}>{isVisible ? children : null}</div>
}
