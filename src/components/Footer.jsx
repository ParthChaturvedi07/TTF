import React from "react";
import styled from "styled-components";
import facebook from "../assets/icons/facebook.svg";
import insta from "../assets/icons/instagram.svg";
import whatsapp from "../assets/icons/whatsapp.svg";
import linkedin from "../assets/icons/Linkedin.svg";

const FooterContainer = styled.footer`
  background-color: #fffbea;
  padding: 4rem 6rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-top: 10vh;
  z-index: 100;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 3rem;
    gap: 2rem;
  }
`;

const LogoSection = styled.div`
  h1 {
    font-family: "Korto-bold", sans-serif;
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 2rem;

    @media (max-width: 480px) {
      font-size: 3rem;
      text-align: center;
      margin-bottom: 1rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    margin-top: 0rem;
  }
`;

const SocialIcon = styled.a`
  width: 55px;
  height: 55px;
  text-decoration: none;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Column = styled.div`
  h2 {
    font-family: "Korto-bold", sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 1rem;
  }

  a {
    font-family: "Gilroy-medium", sans-serif;
    font-size: 1.25rem;
    color: #000;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: 480px) {
    text-align: center;

    h2 {
      margin-bottom: 1rem;
    }

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const ContactInfo = styled.div`
  p {
    font-family: "Gilroy-medium", sans-serif;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    p {
      margin-bottom: 0rem;
      line-height: 1.3;
    }
  }
`;

export const Footer = () => {
  const handleFooterLinkClick = (event, sectionId) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <FooterContainer>
      <LogoSection>
        <h1>
          TECH <br />
          TASTE <br />
          FOODS
        </h1>
        <SocialLinks>
          <SocialIcon href="https://www.facebook.com/techtastefoods">
            <img src={facebook} alt="" />
          </SocialIcon>
          <SocialIcon href="https://www.instagram.com/techtastefoods/">
            <img src={insta} alt="" />
          </SocialIcon>
          <SocialIcon href="https://chat.whatsapp.com/JHzWgm4DJcEClXfZ3fMXM9">
            <img src={whatsapp} alt="" />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/company/techtasteinternational/">
            <img src={linkedin} alt="" />
          </SocialIcon>
        </SocialLinks>
      </LogoSection>

      <Column>
        <h2>Company</h2>
        <ul>
          <li>
            <a
              href="#about-us"
              onClick={(e) => handleFooterLinkClick(e, "home")}
            >
              About Us
            </a>
          </li>
          <li>
            <a href="#stats" onClick={(e) => handleFooterLinkClick(e, "stats")}>
              Stats
            </a>
          </li>
          <li>
            <a
              href="#process"
              onClick={(e) => handleFooterLinkClick(e, "process")}
            >
              Process
            </a>
          </li>
          <li>
            <a
              href="#clients"
              onClick={(e) => handleFooterLinkClick(e, "clients")}
            >
              Clients
            </a>
          </li>
        </ul>
      </Column>

      <Column>
        <h2>Stay Updated</h2>
        <ul>
          <li>
            <a href="#faq" onClick={(e) => handleFooterLinkClick(e, "faq")}>
              FAQs
            </a>
          </li>
          <li>
            <a href="#">Blogs</a>
          </li>
          <li>
            <a href="#">Success Stories</a>
          </li>
        </ul>
      </Column>

      <Column>
        <h2>Contact</h2>
        <ContactInfo>
          <p>
            STATE BANK COLONY, Gate Number 1, Block A, Gujranwala Town, Delhi,
            110009
          </p>
          <p>techtastefoods@gmail.com</p>
          <p>+91-9643422824</p>
        </ContactInfo>
      </Column>
    </FooterContainer>
  );
};
