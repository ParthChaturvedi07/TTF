import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem 2rem;
  // background-color: #fff4c9;
  overflow-x: hidden;
`;

const PageTitle = styled.h1`
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

  @media (max-width: 480px) {
    span {
      font-size: 5rem;
    }
  }
`;

const ProcessList = styled.div`
  height: 500px;
  position: relative;
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 480px) {
    margin-bottom: 0;
  }
`;

const ProcessCard = styled.div`
  width: 465px;
  height: 468px;
  opacity: ${(props) => (props.className === "act" ? 1 : 0.51)};
  box-shadow: ${(props) =>
    props.className === "act"
      ? "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
      : "none"};

  position: absolute;
  left: 50%;
  margin-left: -230px;
  background: #ffffff;
  padding: 2.3rem;
  border-radius: 32px;
  transition: transform 1s, opacity 1s, box-shadow 0.3s ease;

  ${(props) => {
    switch (props.className) {
      case "prev":
        return "transform: translateX(-520px) scale(0.85);";
      case "next":
        return "transform: translateX(520px) scale(0.85);";
      case "hide":
        return "transform: translateX(-1040px) scale(0.85); opacity: 0;";
      case "new-next":
        return "transform: translateX(1040px) scale(0.85); opacity: 0;";
      case "act":
        return "transform: translateX(0) scale(1);";
      default:
        return "";
    }
  }}

  @media (max-width: 480px) {
    width: 328px;
    height: 328px;
    left: 72%;
    padding: 1.5rem;
  }
`;

const CardContent = styled.div`
  background: #fffbea;
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1),
    0px 0px 8px 0px rgba(0, 0, 0, 0.19);
  margin-top: 2rem;
  height: calc(100% - 120px);

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const CardNumber = styled.div`
  font-family: "Korto-medium", sans-serif;
  font-size: 2.5rem;
  color: #000;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.9rem;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.19);
  background: #fffbea;
  border-radius: 36px;
  padding: 0.15rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${(props) => (props.active ? props.onProgress + "%" : "0%")};
  height: 100%;
  background: #fad60b;
  border-radius: 999px;
`;

const CardTitle = styled.h2`
  font-family: "Korto-bold", sans-serif;
  font-size: 2.8rem;
  color: #000;
  margin-bottom: 1rem;
  line-height: 1;

  @media (max-width: 480px) {
    font-size: 1.9rem;
    margin-bottom: 0.5rem;
  }
`;

const CardDescription = styled.p`
  font-family: "Gilroy-medium", sans-serif;
  font-size: 1.1rem;
  color: #000;
  opacity: 0.8;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 0.99rem;
    line-height: 1.1;
  }
`;

const ProcessFooter = styled.div`
  width: 100%;
  padding: 2vh 5vh;
  max-width: 910px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  border-radius: 54px;

  @media (max-width: 480px) {
    padding: 1vh 3vh;
    gap: 1rem;
  }
`;

const FooterText = styled.p`
  font-family: "Gilroy-medium", sans-serif;
  text-align: left;
  line-height: 120%;
  font-size: 1.15rem;
  color: #000;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const BookButton = styled.button`
  background: #fcb731;
  min-width: 25vw;
  border: none;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.16);
  border-radius: 999px;
  padding: 1.18rem 2.25rem;
  font-family: "Gilroy-semibold", sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: #fff;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 150px;
    height: 150px;
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

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.6rem 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.3rem 1rem;
  }
`;

const processData = [
  {
    id: 1,
    number: "01",
    progress: 100,
    title: "Discovery Call",
    description:
      "We understand your brand story, positioning, and long-term goals.",
  },
  {
    id: 2,
    number: "02",
    progress: 60,
    title: "Market Analysis",
    description:
      "We study your zone, segment, and competition to identify key opportunities.",
  },
  {
    id: 3,
    number: "03",
    progress: 40,
    title: "Strategy Planning",
    description:
      "We craft a tailored strategy blueprint based on our analysis.",
  },
  {
    id: 4,
    number: "04",
    progress: 20,
    title: "Execution",
    description:
      "We implement the strategy with complete support from our in-house experts.",
  },
  {
    id: 5,
    number: "05",
    progress: 0,
    title: "Monthly Tracking",
    description:
      "We track results, share performance reports, and tweak strategies for better growth.",
  },
];

export const Process = () => {
  const [cards, setCards] = useState([
    "new-next",
    "hide",
    "prev",
    "act",
    "next",
  ]);
  const progressInterval = useRef(null);
  const progressRefs = useRef([]);
  const processSectionRef = useRef(null);
  const pageTitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: processSectionRef.current,
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
  }, []);

  const next = () => {
    // Reset all progress bars first
    progressRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.width = "0%";
      }
    });

    setCards((prev) => {
      const newCards = [...prev];
      const lastCard = newCards.pop();
      newCards.unshift(lastCard);
      return newCards;
    });
  };

  useEffect(() => {
    const duration = 3000; // 3 seconds

    // Initial setup
    progressInterval.current = setInterval(() => {
      next();
    }, duration);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    const activeIndex = cards.indexOf("act");

    if (activeIndex !== -1) {
      const progressBar = progressRefs.current[activeIndex];

      if (progressBar) {
        // Reset width immediately with no transition
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";

        // Wait for next frame to start smooth transition
        requestAnimationFrame(() => {
          progressBar.style.transition = "width 3s linear";
          progressBar.style.width = "100%";
        });
      }
    }
  }, [cards]);

  return (
    <ProcessSection id="process" ref={processSectionRef}>
      <PageTitle ref={pageTitleRef}>
        <span>P</span>
        <span>r</span>
        <span>o</span>
        <span>c</span>
        <span>e</span>
        <span>s</span>
        <span>s</span>
      </PageTitle>
      <ProcessList>
        {processData.map((card, index) => (
          <ProcessCard key={card.id} className={cards[index]}>
            <CardTop>
              <CardNumber>{card.number}</CardNumber>
              <ProgressBar>
                <ProgressFill
                  ref={(el) => (progressRefs.current[index] = el)}
                />
              </ProgressBar>
            </CardTop>
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
          </ProcessCard>
        ))}
      </ProcessList>

      <ProcessFooter>
        <FooterText>
          We'll deep-dive into your brand and explore how we can add value from
          day one.
        </FooterText>
        <BookButton>Book a Free Discovery Call with us</BookButton>
      </ProcessFooter>
    </ProcessSection>
  );
};
