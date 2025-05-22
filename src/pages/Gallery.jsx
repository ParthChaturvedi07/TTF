import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import leftHand from "../assets/images/lefthand.png";
import rightHand from "../assets/images/righthand.png";
import sampleimg from "../assets/images/sampleimage.avif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = styled.div`
  // background-color: #fff4c9;
  min-height: 170vh;
  // background: gray;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageTitle = styled.h1`
  position: absolute;
  z-index: 100;
  top: 2%;
  display: flex;
  span {
    font-family: "Korto-bold", sans-serif;
    font-weight: 700;
    font-size: 7rem;
    display: inline-block;
    transform-origin: center;
    margin: 0 2rem;
    transform: scale(2);
  }
`;

const HandsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 7%;
  z-index: 2;
`;

const LeftHand = styled.img`
  position: absolute;
  left: 0;
  width: 50%;
`;

const RightHand = styled.img`
  position: absolute;
  right: 0;
  width: 50%;
`;

const PolaroidContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 7%;
  left: 0;
`;

const Polaroid = styled.div`
  position: absolute;
  width: 18vw;
  height: 40vh;
  background: white;
  padding: 15px 15px 40px 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: ${(props) => props.rotation || "rotate(0deg)"};
  z-index: ${(props) => props.zIndex || 1};
  cursor: pointer;
  will-change: transform;
  transition: box-shadow 0.3s ease;

  &:hover {
    z-index: 10;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 30vh;
    object-fit: cover;
  }
`;

export const Gallery = () => {
  const galleryRef = useRef(null);
  const containerRef = useRef(null);
  const polaroidRefs = useRef([]);
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);
  const pageTitleRef = useRef(null);

  const polaroids = [
    {
      img: sampleimg,
      rotation: "rotate(-5deg)",
      zIndex: 3,
      top: "15%",
      left: "5%",
    },
    {
      img: sampleimg,
      rotation: "rotate(8deg)",
      zIndex: 4,
      top: "5%",
      right: "5%",
    },
    {
      img: sampleimg,
      rotation: "rotate(10deg)",
      zIndex: 2,
      top: "5%",
      left: "27%",
    },
    {
      img: sampleimg,
      rotation: "rotate(-12deg)",
      zIndex: 1,
      top: "13%",
      right: "30%",
    },
    {
      img: sampleimg,
      rotation: "rotate(5deg)",
      zIndex: 1,
      bottom: "25%",
      left: "7%",
    },
    {
      img: sampleimg,
      rotation: "rotate(8deg)",
      zIndex: 1,
      bottom: "25%",
      right: "25%",
    },
    {
      img: sampleimg,
      rotation: "rotate(-10deg)",
      zIndex: 4,
      bottom: "10%",
      left: "34%",
    },
    {
      img: sampleimg,
      rotation: "rotate(12deg)",
      zIndex: 2,
      bottom: "27%",
      right: "2%",
    },
    // Add more polaroids as needed
  ];

  useEffect(() => {
    let rafId;
    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const smoothingFactor = 0.15;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updatePolaroidTransforms = () => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      const rect = gallery.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Smooth mouse movement
      previousMouse.x = lerp(
        previousMouse.x,
        mouse.x - centerX,
        smoothingFactor
      );
      previousMouse.y = lerp(
        previousMouse.y,
        mouse.y - centerY,
        smoothingFactor
      );

      polaroidRefs.current.forEach((el, index) => {
        if (!el) return;

        const baseSpeed = 0.02;
        const layerDepth = 1 - index * 0.1;
        const speed = baseSpeed * layerDepth;

        const rotationSpeed = 0.008 * layerDepth;
        const baseRotation = polaroids[index].rotation?.match(/-?\d+/)[0] || 0;

        const offsetX = previousMouse.x * speed;
        const offsetY = previousMouse.y * speed;
        const rotationOffset = previousMouse.x * rotationSpeed;

        const transform = `
          rotate(${parseFloat(baseRotation) + rotationOffset}deg)
          translate3d(${-offsetX}px, ${-offsetY}px, 0)
          scale(${el.matches(":hover") ? 1.05 : 1})
        `;

        el.style.transform = transform;
      });

      rafId = requestAnimationFrame(updatePolaroidTransforms);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updatePolaroidTransforms);
      }
    };

    const handleMouseLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };

    const gallery = galleryRef.current;
    if (gallery) {
      gallery.addEventListener("mousemove", handleMouseMove);
      gallery.addEventListener("mouseleave", handleMouseLeave);

      // Start the animation loop
      rafId = requestAnimationFrame(updatePolaroidTransforms);

      return () => {
        gallery.removeEventListener("mousemove", handleMouseMove);
        gallery.removeEventListener("mouseleave", handleMouseLeave);
        cancelAnimationFrame(rafId);
      };
    }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current,
        scroller: "body",
        start: "top: 70%",
        end: "top 30%",
        // markers: true,
        scrub: 1.2,
      },
    });

    const spans = pageTitleRef.current.querySelectorAll("span");

    tl.to(spans, {
      scale: 1,
      margin: "0rem",
      duration: 3,
      stagger: 0.5,
      ease: "expo.out",
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current,
        scroller: "body",
        start: "top 20%",
        end: "top -40%",
        scrub: 1.2,
        // markers: true,
      },
    });

    tl2
      .fromTo(
        leftHandRef.current,
        {
          x: "-800",
          y: 100,
          rotate: -15,
          scale: 0.95,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          ease: "power2.inOut",
        },
        "cheers"
      )
      .fromTo(
        rightHandRef.current,
        {
          x: "800",
          y: 100,
          rotate: 15,
          scale: 0.95,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          ease: "power2.inOut",
        },
        "cheers"
      )
      .to(
        [leftHandRef.current, rightHandRef.current],
        {
          x: (i) => (i === 0 ? -10 : 10),
          y: -5,
          rotate: (i) => (i === 0 ? -3 : 3),
          duration: 0.15,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1,
        },
        "clink"
      );

    // 🔁 Add resize listener for ScrollTrigger refresh
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    // 🧹 Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <GallerySection ref={galleryRef}>
      <PageTitle ref={pageTitleRef}>
        <span>O</span>
        <span>u</span>
        <span>r</span>
        <span>&nbsp;</span>
        <span>G</span>
        <span>a</span>
        <span>l</span>
        <span>l</span>
        <span>e</span>
        <span>r</span>
        <span>y</span>
      </PageTitle>
      <HandsContainer>
        <LeftHand
          ref={leftHandRef}
          src={leftHand}
          alt="Left hand with coffee"
        />
        <RightHand
          ref={rightHandRef}
          src={rightHand}
          alt="Right hand with pastry"
        />
      </HandsContainer>
      <PolaroidContainer ref={containerRef}>
        {polaroids.map((polaroid, index) => (
          <Polaroid
            key={index}
            rotation={polaroid.rotation}
            ref={(el) => (polaroidRefs.current[index] = el)}
            zIndex={polaroid.zIndex}
            style={{
              top: polaroid.top,
              left: polaroid.left,
              right: polaroid.right,
              bottom: polaroid.bottom,
            }}
          >
            <img src={polaroid.img} alt="" />
          </Polaroid>
        ))}
      </PolaroidContainer>
    </GallerySection>
  );
};
