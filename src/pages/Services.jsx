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
  // position: relative;
  // background-color: #fff4c9;
  box-shadow: 0 -8px 24px -8px rgba(0, 0, 0, 0.15);
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ServicesContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  // background-color: blue;
`;

const ServicesContent = styled.div`
  position: absolute;
  width: 60%;
  left: 4%;
  top: 47%;

  // @media (max-width: 1200px) {
  //   width: 80%;
  //   left: 7%;
  //   top: 45%;
  // }

  // @media (max-width: 900px) {
  //   width: 90%;
  //   left: 5%;
  //   top: 43%;
  // }
  // @media (max-width: 768px) {
  //   width: 100%;
  //   left: 0;
  //   top: 40%;
  //   position: relative;
  // }

  // @media (max-width: 600px) {
  //   width: 100%;
  //   left: 0;
  //   width: 60%;
  //   top: 30%;
  //   position: relative;
  //   padding: 0 1rem;
  // }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 70%;
    left: 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    left: 0;
    top: 15%;
  }
`;

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

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    margin-left: 18vw;

    &.last-two {
      margin-left: 14vw;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.3rem 1.2rem;
  }
`;

const ServiceMoto = styled.h1`
  font-size: 9.5vh;
  font-family: "Korto-bold", sans-serif;
  font-weight: 700;
  line-height: 1.2;
  max-width: 70%;
  white-space: pre-line;

  @media (max-width: 1200px) {
    font-size: 8vh;
    max-width: 72%;
  }
  @media (max-width: 900px) {
    font-size: 7vh;
    max-width: 75%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 6vh;
    max-width: 71%;
  }

  @media (max-width: 480px) {
    font-size: 4.5vh;
    max-width: 100%;
    text-align: center;
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 3%;
  width: 50%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: gray;

  @media (min-width: 481px) and (max-width: 768px) {
    right: 0;
    bottom: 3%;
  }

  @media (max-width: 480px) {
    right: 0vh;
    bottom: -15%;
    width: 100%;
  }
`;

// const CardsContainer = styled.div`
//   position: relative;
//   // top: 18%;
//   // right: -26%;
//   height: 100%;
//   width: 100%;
//   // background-color: pink;
// `;

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

  useGSAP(() => {
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
      <Container id="services" ref={ContainerRef}>
        {/* <BlobBackground /> */}

        <ServicesContainer>
          <ServicesContent ref={ServiceContentRef}>
            {serviceContentData.map((content, index) => (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transition: "opacity 0.5s ease",
                }}
                key={index}
              >
                <ServiceButton
                  className={`service-btn${
                    index >= serviceContentData.length - 2 ? " last-two" : ""
                  }`}
                >
                  {content.button}
                </ServiceButton>
                <ServiceMoto>{content.moto}</ServiceMoto>
              </div>
            ))}
          </ServicesContent>

          <CardWrapper>
            {/* <CardsContainer> */}
            <DynamicCardList ref={CardRef} />
            {/* </CardsContainer> */}
          </CardWrapper>
        </ServicesContainer>
      </Container>
    </>
  );
};
