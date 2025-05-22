import React, { useRef, useState } from "react";
import styled from "styled-components";
import DynamicCardList from "../components/ServiceCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { BlobBackground } from "../styles/BlobBackground";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  // background-color: #fff4c9;
  box-shadow: 0 -8px 24px -8px rgba(0, 0, 0, 0.15);
`;

const Section = styled.section`
  padding: 5rem;
  height: 100vh;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ServicesContainer = styled.div`
  height: 100%;
  width: 100%;
  gap: 2rem;
  position: relative;
`;

const PageTitle = styled.h1`
  position: absolute;
  top: 5%;
  left: 4%;
  display: flex;

  @media (max-width: 1200px) {
    position: relative;
    top: 5%;
    left: 7%;
  }

  span {
    font-family: "Korto-bold", sans-serif;
    font-weight: 700;
    font-size: clamp(2.5rem, 5vw, 5.5rem);
    display: inline-block;
    transform-origin: center;
    margin: 0 2rem;
    font-size: 7rem;
    transform: scale(2);
  }
`;

const ServicesContent = styled.div`
  width: 60%;
  position: absolute;
  left: 4%;
  bottom: 50%;

  @media (max-width: 1200px) {
    width: 60%;
    position: absolute;
    left: 4%;
    bottom: 50%;
  }
`;

// const ServiceMoto = styled.h1`
//   font-size: clamp(2.5rem, 4vw, 4.5rem);
//   font-family: "Korto-bold", sans-serif;
//   font-weight: 700;
//   line-height: 1.2;
//   max-width: 70%;

//   @media (max-width: 1200px) {
//     max-width: 100%;
//     text-align: center;
//   }
// `;

// const CardWrapper = styled.div`
//   position: absolute;
//   right: -6%;
//   top: 15%;
//   width: 50%;
//   height: 100vh;
//   perspective: 1000px;

//   @media (max-width: 1200px) {
//     position: relative;
//     right: 0;
//     width: 90%;
//     margin: 0 auto;
//     height: 60vh;
//   }
// `;

const ServiceButton = styled.button`
  background: transparent;
  font-family: "Gilroy-medium", sans-serif;
  border: 1.5px solid #000;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  width: fit-content;
  overflow: hidden;
  margin-bottom: 2vh;
`;

const ServiceMoto = styled.h1`
  font-size: 4.5rem;
  font-family: "Korto-bold", sans-serif;
  font-weight: 700;
  line-height: 1.2;
  max-width: 65%;
  white-space: pre-line;

  @media (max-width: 1200px) {
    font-size: 3.3rem;
    max-width: 65%;
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  right: -6%;
  top: 15%;
  width: 50%;
  height: 100vh;
  perspective: 1000px;

  @media (max-width: 1200px) {
    right: -3%;
    margin: 0 auto;
    height: 60vh;
  }
`;

const CardsContainer = styled.div`
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
`;

const serviceContentData = [
  {
    button: "Strategy & consulting",
    moto: `Turn ideas into Businesses`,
  },
  {
    button: "Branding & Design",
    moto: "Make your brand look awesome.",
  },
  {
    button: "Marketing & Visibility",
    moto: "Get your brand\nnoticed.",
  },
  {
    button: "Operations & Compliance",
    moto: "Take your Business online - Fast.",
  },
  {
    button: "Operations & Compliance",
    moto: "Get rid of that backend mess.",
  },
];

export const Services = () => {
  const ServiceContentRef = useRef(null);
  const CardRef = useRef(null);
  const ContainerRef = useRef(null);
  const pageTitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ContainerRef.current,
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

    const cards = gsap.utils.toArray(CardRef.current.children);
    const contents = gsap.utils.toArray(ServiceContentRef.current.children);

    // Initial setup
    gsap.set(cards.slice(1), {
      x: 0,
      y: 0,
      z: 0,
      //   opacity: 0,
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ContainerRef.current,
        scroller: "body",
        scrub: 1,
        start: "top 70%",
        end: "top 10%",
        // markers: true,
      },
    });

    tl2
      .from(
        ServiceContentRef.current,
        {
          opacity: 0,
          x: -300,
          ease: "power1.inOut",
        },
        "anim"
      )
      .from(
        CardRef.current,
        {
          x: 300,
          opacity: 0,
          ease: "power1.inOut",
        },
        "anim"
      );

    // Create scroll-triggered timeline
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ContainerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        markers: false,
      },
    });

    // Animate each card
    cards.forEach((card, i) => {
      const nextCard = cards[i + 1];
      const content = contents[i];
      const nextContent = contents[i + 1];
      const sections = card.querySelectorAll(".section-item");
      const imageGroup = card.querySelector(".image-group");
      const nextSections = nextCard
        ? nextCard.querySelectorAll(".section-item")
        : null;
      const nextImageGroup = nextCard
        ? nextCard.querySelector(".image-group")
        : null;

      if (nextCard) {
        // Current card animation
        sections.forEach((section, sIndex) => {
          tl3.to(
            section,
            {
              y: -50 * (sIndex + 1),
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
            },
            `card${i}`
          );
        });

        tl3.to(
          card,
          {
            // x: -600,
            y: -500,
            z: -500,
            duration: 2,
            scale: 0.3,
            ease: "expo.inOut",
          },
          `card${i}+=0.5`
        );

        tl3.to(
          imageGroup,
          {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          `card${i}+=0.3`
        );

        tl3.to(
          content,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          `card${i}`
        );

        // Next card animation
        tl3.fromTo(
          nextCard,
          {
            // x: 600,
            y: 500,
            z: 500,
          },
          {
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
            ease: "expo.inOut",
          },
          `card${i}-=0.1`
        );

        if (nextImageGroup) {
          tl3.fromTo(
            nextImageGroup,
            {
              y: 200,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.inOut",
            },
            `card${i}+=1`
          );
        }

        // Animate next card sections
        if (nextSections) {
          nextSections.forEach((section, sIndex) => {
            tl3.fromTo(
              section,
              {
                y: 50,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
              },
              `card${i}+=${0.5 + sIndex * 0.2}`
            );
          });
        }

        tl3.fromTo(
          nextContent,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          `card${i}+=0.5`
        );
      }
    });

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
    <>
      <Container ref={ContainerRef}>
        {/* <BlobBackground /> */}
        <Section>
          <ServicesContainer>
            <PageTitle ref={pageTitleRef}>
              <span>S</span>
              <span>e</span>
              <span>r</span>
              <span>v</span>
              <span>i</span>
              <span>c</span>
              <span>e</span>
              <span>s</span>
            </PageTitle>
            <ServicesContent ref={ServiceContentRef}>
              {serviceContentData.map((content, index) => (
                <div
                  style={{
                    position: "absolute",
                    // top: "50%",
                    // left: "5%",
                    // //   transform: "translate(0,-50%)",
                  }}
                  key={index}
                >
                  <ServiceButton>{content.button}</ServiceButton>
                  <ServiceMoto>{content.moto}</ServiceMoto>
                </div>
              ))}
            </ServicesContent>

            <CardWrapper>
              <CardsContainer>
                <DynamicCardList ref={CardRef} />
              </CardsContainer>
            </CardWrapper>
          </ServicesContainer>
        </Section>
      </Container>
    </>
  );
};
