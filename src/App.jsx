import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import GlobalStyles from "./styles/GlobalStyles";
import { Navbar } from "./components/Navbar";
import { Hero } from "./pages/Hero";
import { Stats } from "./pages/Stats";
import { Services } from "./pages/Services";
import { Testimonials } from "./pages/Testimonials";
import { Faqs } from "./pages/Faqs";
import { Contact } from "./pages/Contact";
import { Clients } from "./pages/Clients";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Process } from "./pages/Process";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smooth: true,
      normalizeWheel: true,
      smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const handleResize = () => {
      ScrollTrigger.refresh(); // <== this is important
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      <GlobalStyles />
      <Loader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <Stats />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Services />
            <Process />
            <Testimonials />
            <Clients />
            <Faqs />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};
