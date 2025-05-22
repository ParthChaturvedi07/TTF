import React, { useEffect } from "react";
import ellipse from "./assets/icons/ellipse.svg";
import Lenis from "@studio-freight/lenis";
import GlobalStyles from "./styles/GlobalStyles";
import { Navbar } from "./components/Navbar";
import { Hero } from "./pages/Hero";
import { Stats } from "./pages/Stats";
import { Services } from "./pages/Services";
import { Testimonials } from "./pages/Testimonials";
import { Gallery } from "./pages/Gallery";
import { Faqs } from "./pages/Faqs";
import { Contact } from "./pages/Contact";
import { Clients } from "./pages/Clients"; // If you use later
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Process } from "./pages/Process";
import { Footer } from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export const App = () => {
  useEffect(() => {
    // Initialize Lenis with optimal settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smooth: true,
      normalizeWheel: true,
      smoothTouch: false, // Better mobile performance
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

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Make lenis available globally for debugging
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // useEffect(() => {
  //   const coords = { x: 0, y: 0 };
  //   const circles = document.querySelectorAll(".circle");

  //   circles.forEach(function (circle, index) {
  //     circle.x = 0;
  //     circle.y = 0;
  //   });

  //   window.addEventListener("mousemove", function (e) {
  //     coords.x = e.clientX;
  //     coords.y = e.clientY;
  //   });

  //   function animateCircles() {
  //     let x = coords.x;
  //     let y = coords.y;

  //     circles.forEach(function (circle, index) {
  //       circle.style.left = x - 12 + "px";
  //       circle.style.top = y - 12 + "px";

  //       circle.style.scale = (circles.length - index) / circles.length;

  //       circle.x = x;
  //       circle.y = y;

  //       const nextCircle = circles[index + 1] || circles[0];
  //       x += (nextCircle.x - x) * 0.3;
  //       y += (nextCircle.y - y) * 0.3;
  //     });

  //     requestAnimationFrame(animateCircles);
  //   }

  //   animateCircles();
  // }, []);

  return (
    <div>
      {/* <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div> */}
      <div className="blur-center">
        <img src={ellipse} alt="" />
      </div>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Stats />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Services />
        <Process />
        <Testimonials />
        <Clients />
        {/* <Gallery /> */}
        <Faqs />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};
