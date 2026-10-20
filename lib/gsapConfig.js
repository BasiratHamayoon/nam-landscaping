export const GSAP_EASE = {
  smooth: "power2.out",
  bounce: "bounce.out",
  elastic: "elastic.out(1, 0.3)",
  back: "back.out(1.7)",
  expo: "expo.out",
  circ: "circ.out",
  power3: "power3.out",
  power4: "power4.inOut",
  custom: "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1",
}

export const ANIMATION_CONFIG = {
  hero: {
    duration: 1.4,
    stagger: 0.15,
    ease: GSAP_EASE.power3,
  },
  section: {
    duration: 1,
    stagger: 0.1,
    ease: GSAP_EASE.smooth,
  },
  card: {
    duration: 0.8,
    stagger: 0.12,
    ease: GSAP_EASE.back,
  },
  text: {
    duration: 1.2,
    stagger: 0.03,
    ease: GSAP_EASE.power3,
  },
  image: {
    duration: 1.5,
    ease: GSAP_EASE.expo,
  },
  navbar: {
    duration: 0.6,
    ease: GSAP_EASE.smooth,
  },
}

export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 85%",
  end: "bottom 15%",
  toggleActions: "play none none reverse",
}

export const PARALLAX_CONFIG = {
  slow: { speed: 0.3 },
  medium: { speed: 0.5 },
  fast: { speed: 0.8 },
}