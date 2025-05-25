import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Client1 from "../assets/icons/client1.svg";
import Client2 from "../assets/icons/client2.svg";
import Client3 from "../assets/icons/client3.svg";
import Client4 from "../assets/icons/client4.svg";
import Client5 from "../assets/icons/clinet5.svg";
import Client6 from "../assets/icons/client6.svg";
import Client7 from "../assets/icons/client7.svg";
import Client8 from "../assets/icons/client8.svg";
import Client9 from "../assets/icons/client9.svg";
import Client10 from "../assets/icons/client10.svg";
import Client11 from "../assets/icons/client11.svg";
import Client12 from "../assets/icons/client12.svg";
import Client13 from "../assets/icons/client13.svg";
import Client14 from "../assets/icons/client14.svg";

gsap.registerPlugin(ScrollTrigger);

const ClientsSection = styled.div`
  min-height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  overflow: hidden;
  position: relative;

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

  @media (max-width: 480px) {
    min-height: 40vh;

    &::before {
      left: -15%;
    }

    &::after {
      right: -15%;
    }
  }
`;

const ClientsContainer = styled.div`
  margin-top: -15vh;
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

const ClientLogo = styled.div`
  background: #fffbea;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), 0 1.5px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
    z-index: 3;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22), 0 3px 8px rgba(0, 0, 0, 0.13);
  }

  @media (max-width: 480px) {
    width: 170px;
    height: 170px;
  }
`;

export const Clients = () => {
  const clients = [
    { logo: Client1 },
    { logo: Client2 },
    { logo: Client3 },
    { logo: Client4 },
    { logo: Client5 },
    { logo: Client6 },
    { logo: Client7 },
    { logo: Client8 },
    { logo: Client9 },
    { logo: Client10 },
    { logo: Client11 },
    { logo: Client12 },
    { logo: Client13 },
    { logo: Client14 },
  ];

  const containerRef = useRef(null);
  const clientsSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const speedFactor = 10.3;
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

  // useGSAP(() => {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: statsSectionRef.current,
  //         pin: true,
  //         // markers: true,
  //         pinSpacing: false,
  //         start: "top top",
  //         end: "bottom top",
  //         scrub: 1,
  //       },
  //     })
  //     .to(statsSectionRef.current, {
  //       opacity: 0,
  //       duration: 1,
  //     });

  //   // Fixed number ticker animation
  //   valueRefs.current.forEach((valueRef, index) => {
  //     const value = stats[index % stats.length].value;
  //     const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

  //     gsap.fromTo(
  //       valueRef,
  //       { innerText: 0 },
  //       {
  //         scrollTrigger: {
  //           trigger: valueRef,
  //           start: "top 80%",
  //           end: "top 50%",
  //           once: true,
  //         },
  //         innerText: numericValue,
  //         duration: 2,
  //         snap: { innerText: 1 },
  //         ease: "power1.inOut",
  //         modifiers: {
  //           innerText: (value) => {
  //             const num = Math.min(Math.round(Number(value)), numericValue);
  //             const originalValue = stats[index % stats.length].value;
  //             if (originalValue === "0") return "0";
  //             if (originalValue.includes("Cr")) return `₹${num}Cr+`;
  //             if (originalValue.includes("%")) return `${num}%`;
  //             return `${num}+`;
  //           },
  //         },
  //       }
  //     );
  //   });

  //   // 🔁 Add resize listener for ScrollTrigger refresh
  //   const handleResize = () => ScrollTrigger.refresh();
  //   window.addEventListener("resize", handleResize);

  //   // 🧹 Cleanup
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  return (
    <ClientsSection ref={clientsSectionRef}>
      <ClientsContainer ref={containerRef}>
        {[...clients, ...clients, ...clients].map((client, index) => (
          <ClientLogo key={index}>
            <img src={client.logo} alt={client.name} />
          </ClientLogo>
        ))}
      </ClientsContainer>
    </ClientsSection>
  );
};
