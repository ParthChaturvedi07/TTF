import React, { useEffect, useRef, useState } from "react";
import ttf_logo from "../assets/icons/ttf_logo.svg";
import styled from "styled-components";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transform: translateY(${(props) => (props.show ? "0" : "-100%")});
  transition: transform 0.3s ease;
  opacity: 0;
`;

const NavContent = styled.div`
  max-width: 823.81px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  border-radius: 34px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img``;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const NavItem = styled.button`
  font-family: "Gilroy-medium", sans-serif;
  font-weight: 600;
  color: #000;
  font-size: 1.2rem;
  transition: opacity 0.3s ease;
  opacity: 0.71;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  padding: 0.3rem 0.72rem;
  transition: all 0.5s ease;
  border-radius: 34px;

  &:hover {
    opacity: 1;
    transform: translateY(-5px);
  }

  &.active {
    border: 1px solid rgba(0, 0, 0, 0.11);
    background: #fff;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }
`;

export const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const linksRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      navRef.current,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }
    )
      .fromTo(
        contentRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.5"
      )
      .fromTo(
        ".nav-item",
        {
          y: -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 0.71,
          stagger: 0.1,
          duration: 0.3,
        },
        "-=0.9"
      );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Show navbar when scrolling up or at the top
      setVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      // Determine active section based on scroll position
      const sections = ["home", "services", "testimonials", "faq", "contact"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <NavbarContainer ref={navRef} show={visible}>
      <NavContent ref={contentRef}>
        <Logo onClick={() => scrollToSection("home")}>
          <LogoImage src={ttf_logo} alt="Tech Taste Foods" />
        </Logo>

        <NavLinks ref={linksRef}>
          <NavItem
            className={`nav-item ${activeSection === "home" ? "active" : ""}`}
            onClick={() => scrollToSection("home")}
          >
            Home
          </NavItem>
          <NavItem
            className={`nav-item ${
              activeSection === "services" ? "active" : ""
            }`}
            onClick={() => scrollToSection("services")}
          >
            Services
          </NavItem>
          <NavItem
            className={`nav-item ${
              activeSection === "testimonials" ? "active" : ""
            }`}
            onClick={() => scrollToSection("testimonials")}
          >
            Testimonials
          </NavItem>
          <NavItem
            className={`nav-item ${activeSection === "faq" ? "active" : ""}`}
            onClick={() => scrollToSection("faq")}
          >
            Faq
          </NavItem>
          <NavItem
            className={`nav-item ${
              activeSection === "contact" ? "active" : ""
            }`}
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </NavItem>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};
