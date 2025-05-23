import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import styled from "styled-components";
import hero_video from "../assets/videos/Cinematic Coffee B Roll - Sony A7S III + 16-35mm F4.mp4";
import sparkle from "../assets/icons/sparkle.svg";
import { WhoAreWe } from "./WhoAreWe";
import sampleImage from "../assets/images/sampleimage.avif";
import sampleImage2 from "../assets/images/sampleimg2.png";
import sampleImage3 from "../assets/images/sampleimage3.png";
import sampleImage4 from "../assets/images/sampleimage4.png";
// import sampleImage5 from "../assets/images/sampleimage5.png";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 10rem;

  .hero-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    opacity: 0;
    width: 0;
    height: 12vh;
    object-fit: cover;
    pointer-events: none;
    z-index: 1;
  }

  div.hero-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    z-index: 3;
  }

  .image-trail {
    position: absolute;
    border-radius: 10px;
    inset: 0;
    width: 130px;
    height: 150px;
    object-fit: cover;
    pointer-events: none;
    opacity: 0;
  }
`;

const HeadingTop = styled.div`
  border-radius: 34px;
  background: #fff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  padding: 0.7rem 1.2rem;
  position: relative;
  transition: scale 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);

    img {
      animation: sparkleMove 0.5s ease-in-out;
    }
  }

  h3 {
    font-family: "Gilroy-medium", sans-serif;
    font-weight: 500;
    opacity: 71%;
    cursor: pointer;
  }

  img {
    position: absolute;
    right: 3%;
    top: 20%;
  }

  @keyframes sparkleMove {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(3px, -3px) rotate(10deg);
    }
    50% {
      transform: translate(-2px, 2px) rotate(-5deg);
    }
    75% {
      transform: translate(2px, -2px) rotate(5deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
`;

const Heading = styled.h1`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  line-height: 0.2;

  div {
    font-family: "Korto-bold", sans-serif;
    font-size: 4.3rem;
    line-height: 1.05;
    font-weight: 700;
    position: relative;
  }

  span {
    color: #fcb731;
    display: flex;
    gap: 2.2vh;
    font-weight: 900;
  }
`;

const Subheading = styled.p`
  div {
    font-family: "Gilroy-medium", san-serif;
    font-size: 1.25rem;
    color: #8a8a8a;
  }
  max-width: 53vw;
  text-align: center;
  margin-top: 1.2rem;
`;

const CTAButton = styled.button`
  background: #fcb731;
  position: relative;
  overflow: hidden;
  border: none;
  padding: 1rem 2rem;
  font-family: "Gilroy-semibold", san-serif;
  font-size: 1rem;
  border-radius: 999px;
  cursor: pointer;
  color: #ffffff;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.16);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    border-radius: inherit;
    scale: 0;
    z-index: -1;
    background-color: #fff;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover::before {
    scale: 3;
  }

  &:hover {
    color: #000;
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
  }

  &:active {
    scale: 1;
  }
`;

const WhoAreWeContainer = styled.section`
  position: absolute;
  opacity: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const Hero = () => {
  const HeadingTopRef = useRef(null);
  const HeadingRef = useRef(null);
  const WrapperRef = useRef(null);
  const Resta = useRef(null);
  const Urant = useRef(null);
  const ctaButtonRef = useRef(null);
  const HeroVideo = useRef(null);
  const WhoAreWeRef = useRef(null);
  const WhoHeadingRef = useRef(null);
  const WhoParaRef = useRef(null);
  const WhoCalloutRef = useRef(null);

  useGSAP(() => {
    const images = [
      sampleImage,
      sampleImage2,
      sampleImage3,
      sampleImage4,
    ];

    let currentImageIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let distanceThreshold = 180;

    window.addEventListener("mousemove", (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > distanceThreshold) {
        createTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });

    function createTrail(x, y) {
      const img = document.createElement("img");
      img.classList.add("image-trail");
      img.src = images[currentImageIndex];
      WrapperRef.current.appendChild(img);

      currentImageIndex = (currentImageIndex + 1) % images.length;

      gsap.set(img, {
        x: x,
        y: y,
        scale: 0,
        opacity: 0,
        // rotation: gsap.utils.random(-20, -20),
      });

      gsap.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(img, {
        scale: 0.2,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.in",
        onComplete: () => {
          img.remove();
        },
      });
    }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    let spliting = SplitText.create(".title", {
      type: "words",
    });

    let splited = SplitText.create(".para", {
      type: "words",
    });

    tl.fromTo(
      HeadingTopRef.current,
      {
        y: -800,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "reveal"
    )
      .from(
        spliting.words,
        {
          y: 200,
          opacity: 0,
          autoAlpha: 0,
          ease: "power1.inOut",
          stagger: {
            amount: 0.5,
            from: "center",
          },
          duration: 0.8,
        },
        "reveal"
      )
      .from(
        splited.words,
        {
          x: -50,
          opacity: 0,
          autoAlpha: 0,
          ease: "power1.inOut",
          stagger: {
            amount: 0.5,
            from: "end",
          },
          duration: 0.8,
        },
        "reveal"
      )
      .fromTo(
        ctaButtonRef.current,
        {
          y: 800,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "reveal"
      );

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: WrapperRef.current,
        scroller: "body",
        start: "top top",
        end: "bottom top",
        // markers: true,
        pin: true,
        scrub: 1,
      },
    });

    let split = SplitText.create(".text", {
      type: "words",
      smartWrap: true,
    });

    tl2
      .fromTo(
        [
          HeadingTopRef.current,
          HeadingRef.current,
          WrapperRef.current.querySelector("p"),
          WrapperRef.current.querySelector("button"),
        ],
        { opacity: 1 },
        { opacity: 0, duration: 0.3 },
        "start"
      )

      .to(
        HeroVideo.current,
        {
          opacity: 1,
          // left: "25%",
          width: "100%",
          height: "100%",
          duration: 0.4,
        },
        "start+=0.1"
      )
      .to(
        HeroVideo.current,
        {
          left: "17%",
          width: "35%",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "abc"
      )
      .to(
        WhoAreWeRef.current,
        {
          right: 0,
          duration: 0.6,
          // delay: 1,
          opacity: 1,
          ease: "power2.inOut",
        },
        "abc"
      )
      .from(
        split.words,
        {
          x: "100%", // Slide in from the left
          opacity: 0, // Fade in
          duration: 0.6,
          ease: "power2.out",
          stagger: {
            amount: 0.5,
            from: "left",
          },
        },
        "abc+=0.2"
      )
      .from(
        WhoParaRef.current,
        {
          x: "100%",
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "abc+=0.3"
      )
      .from(
        WhoCalloutRef.current,
        {
          x: "500%",
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "start+=0.6"
      );

    // Trigger tl only on initial load and if scroll is near top
    const handleLoad = () => {
      const scrollY = window.scrollY;
      const isFirstVisit = !sessionStorage.getItem("visited");
      sessionStorage.setItem("visited", "true");

      if (scrollY < 50 && isFirstVisit) {
        tl.play();
      } else {
        tl.progress(1);
      }

      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    // 🔁 Add resize listener for ScrollTrigger refresh
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      const triggers = ScrollTrigger.getAll().filter(
        (t) => t.trigger === WrapperRef.current
      );
      triggers.forEach((trigger) => trigger.kill());
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <Wrapper ref={WrapperRef}>
      {/* <AnimationContainer>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </AnimationContainer> */}

      <div className="hero-content">
        <HeadingTop ref={HeadingTopRef}>
          <h3>Helping Restaurants Grow since 2014</h3>
          <img src={sparkle} alt="" />
        </HeadingTop>

        <Heading className="title" ref={HeadingRef}>
          <div className="1">Are you ready to </div> <br />
          <div className="2">make your restaurant</div>
          <br />
          <span>meh to money ?</span>
        </Heading>
        <Subheading className="para">
          We help restaurants, cloud kitchens, and food brands grow by improving
          menus, fixing operations, and running marketing that brings real
          results.
        </Subheading>
        <CTAButton ref={ctaButtonRef}>Start my growth journey</CTAButton>
      </div>

      <video
        className="hero-video"
        ref={HeroVideo}
        src={hero_video}
        autoPlay
        muted
        loop
      />

      <WhoAreWeContainer ref={WhoAreWeRef}>
        <WhoAreWe
          headingRef={WhoHeadingRef}
          paraRef={WhoParaRef}
          calloutRef={WhoCalloutRef}
        />
      </WhoAreWeContainer>
    </Wrapper>
  );
};
