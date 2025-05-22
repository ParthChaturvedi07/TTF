import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  overflow: hidden;
  position: relative;
  // box-shadow: 0 -8px 24px -8px rgba(0, 0, 0, 0.15);

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 250px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #f5f5f5 0%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #f5f5f5 0%, transparent 100%);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;
  will-change: transform;
  animation: marquee 20s linear infinite;
  transition: all 0.5s ease;

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% / 3));
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const StatBall = styled.div`
  width: 280px;
  height: 280px;
  background: #fffbea;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), 0 1.5px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    z-index: 3;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22), 0 3px 8px rgba(0, 0, 0, 0.13);
  }
`;

const StatValueContainer = styled.div`
  background: #fefefe;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 95.5px;
  border: none;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-family: "Korto-Bold", sans-serif;
  font-size: 2.5rem;
  color: #000;
  line-height: 1;
`;

const StatTitle = styled.div`
  font-family: "Korto-Medium", sans-serif;
  font-size: 1.2rem;
  color: #000;
  padding: 0.3rem 1rem;
`;

const StatDescription = styled.div`
  font-family: "Korto-Medium", sans-serif;
  font-size: 0.9rem;
  color: #000;
  max-width: 80%;
  text-align: center;
  line-height: 1.4;
`;

export const Stats = () => {
  const stats = [
    {
      value: "1000+",
      title: "Brands",
      description: "Restaurant Brands and cloud kitchen served",
    },
    {
      value: "₹10Cr+",
      title: "Avg Revenue",
      description: "monthly revenue generated for clients",
    },
    {
      value: "14+",
      title: "Awards",
      description: 'Including Times Group\'s "Best Restaurant Consultants"',
    },
    {
      value: "100%",
      title: "Success rate",
      description: "across all projects",
    },
    {
      value: "0",
      title: "Sales reps",
      description: "100% inbound through referrals & client results",
    },
  ];
  // const containerWidth = (280 + 32) * stats.length;

  const containerRef = useRef(null);
  const statsSectionRef = useRef(null);
  const pageTitleRef = useRef(null);
  const valueRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const speedFactor = 10.3; // lower = slower scroll
      const container = containerRef.current;
      if (container) {
        const offsetTop =
          container.getBoundingClientRect().top + window.scrollY;
        const distance = scrollY - offsetTop;
        container.style.transform = `translateY(${distance * speedFactor}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: statsSectionRef.current,
          pin: true,
          // markers: true,
          pinSpacing: false,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
      .to(statsSectionRef.current, {
        opacity: 0,
        duration: 1,
      });

    // Fixed number ticker animation
    valueRefs.current.forEach((valueRef, index) => {
      const value = stats[index % stats.length].value;
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

      gsap.fromTo(
        valueRef,
        { innerText: 0 },
        {
          scrollTrigger: {
            trigger: valueRef,
            start: "top 80%",
            end: "top 50%",
            once: true,
          },
          innerText: numericValue,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.inOut",
          modifiers: {
            innerText: (value) => {
              const num = Math.min(Math.round(Number(value)), numericValue);
              const originalValue = stats[index % stats.length].value;
              if (originalValue === "0") return "0";
              if (originalValue.includes("Cr")) return `₹${num}Cr+`;
              if (originalValue.includes("%")) return `${num}%`;
              return `${num}+`;
            },
          },
        }
      );
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
    <StatsSection ref={statsSectionRef}>
      <StatsContainer ref={containerRef}>
        {[...stats, ...stats, ...stats].map((stat, index) => (
          <StatBall key={index}>
            <StatValueContainer>
              <StatValue ref={(el) => (valueRefs.current[index] = el)}>
                {stat.value}
              </StatValue>
              <StatTitle>{stat.title}</StatTitle>
            </StatValueContainer>
            <StatDescription>{stat.description}</StatDescription>
          </StatBall>
        ))}
      </StatsContainer>
    </StatsSection>
  );
};
