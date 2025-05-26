import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100%;
  padding: 3vh 10vh;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  background: #fffbea;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  transform: translateX(${(props) => (props.isExiting ? "-100%" : "0")});
  transition: transform 2s cubic-bezier(0.76, 0, 0.24, 1);

  @media (max-width: 481px) {
    padding: 2vh 4vh;
  }
`;

const LoadingText = styled.div`
  height: 25vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  h1 {
    width: 100%;
    position: absolute;
    overflow: hidden; /* ✨ Add this to clip incoming spans */

    span {
      display: inline-block; /* ✨ Needed for vertical transforms to apply properly */
      font-family: "Korto-Bold", sans-serif;
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      color: #000;
      opacity: 0.4;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 40px;
  background: #fcb731;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 1vh;
  position: relative;
  transform-origin: left;

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scaleX(calc(1 / var(--progress-scale)));
    color: #fff;
    font-family: "Korto-Bold", sans-serif;
    font-size: 3vh;
    z-index: 2;
    transform-origin: center;
  }
`;

export const Loader = ({ onComplete }) => {
  const LoaderContainerRef = useRef(null);
  const loadingtextRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);
  const [percentage, setPercentage] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  useGSAP(() => {
    const headlines = loadingtextRef.current.querySelectorAll("h1");
    const progressBar = progressBarRef.current;
    const masterTl = gsap.timeline();

    // Add a small delay before starting the animation
    // masterTl.to({}, { duration: 0.5 });

    headlines.forEach((h1, i) => {
      const spans = h1.querySelectorAll("span");
      const cycleTl = gsap.timeline();

      // Start with headline hidden
      gsap.set(h1, { opacity: 0, y: 100 });
      gsap.set(spans, { y: 50, opacity: 0 });

      // Show headline container
      cycleTl.to(h1, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Animate spans in
      cycleTl.to(spans, {
        y: 0,
        opacity: 0.6,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Hold
      cycleTl.to({}, { duration: 0.6 });

      // Animate spans out
      cycleTl.to(spans, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.in",
      });

      // Hide headline container
      cycleTl.to(h1, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Progress bar animation
      cycleTl.to(
        progressBar,
        {
          scaleX: 1 - (i + 1) / headlines.length,
          duration: 3,
          ease: "power1.inOut",
          onUpdate: () => {
            const currentScale = gsap.getProperty(progressBar, "scaleX");
            progressBar.style.setProperty("--progress-scale", currentScale);
            const currentPercentage = Math.round(currentScale * 100);
            setPercentage(currentPercentage);
          },
        },
        0
      );

      masterTl.add(cycleTl);
    });

    masterTl.call(() => {
      setIsExiting(true);
      // Wait for exit animation to complete before calling onComplete
      setTimeout(() => {
        onComplete?.();
      }, 1000); // Match the exit transition duration
    });

    // const tl2 = gsap.timeline();

    // tl2.to(LoaderContainerRef.current, {
    //   x: -1700,
    //   duration: 2,
    //   delay: 7,
    //   ease: "power2.out",
    // });

    return () => masterTl.kill();
  }, [onComplete]);

  return (
    <LoaderContainer ref={LoaderContainerRef} isExiting={isExiting}>
      <ProgressBar ref={progressBarRef}>
        <span ref={progressTextRef}>{percentage}%</span>
      </ProgressBar>
      <LoadingText ref={loadingtextRef}>
        <h1>
          <span>We turn your restaurant</span>
          <br />
          <span>into a brand people crave</span>
        </h1>
        <h1>
          <span>We help you grow, scale,</span>
          <br />
          <span>and own your zone</span>
        </h1>
        <h1>
          <span>We make your brand</span>
          <br />
          <span>impossible to ignore</span>
        </h1>
      </LoadingText>
    </LoaderContainer>
  );
};
