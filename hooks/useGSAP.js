"use client"
import { useEffect, useRef, useCallback } from "react"

export function useGSAP(animationCallback, dependencies = []) {
  const elementRef = useRef(null)
  const contextRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (elementRef.current) {
        contextRef.current = gsap.context(() => {
          animationCallback(gsap, ScrollTrigger, elementRef.current)
        }, elementRef)
      }
    }

    loadGSAP()

    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  }, dependencies)

  return elementRef
}

export function useGSAPTimeline(config = {}) {
  const timelineRef = useRef(null)

  const createTimeline = useCallback(async (options = {}) => {
    const { gsap } = await import("gsap")
    timelineRef.current = gsap.timeline({ ...config, ...options })
    return timelineRef.current
  }, [])

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  return { timeline: timelineRef, createTimeline }
}