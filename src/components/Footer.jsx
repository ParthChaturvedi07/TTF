import React from "react";
import styled from "styled-components";
import facebook from "../assets/icons/facebook.svg";
import insta from "../assets/icons/instagram.svg";
import twitter from "../assets/icons/X.svg";
import linkedin from "../assets/icons/Linkedin.svg";

const FooterContainer = styled.footer`
  background-color: #fffbea;
  padding: 4rem 6rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-top: 10vh;
  z-index: 100;
`;

const LogoSection = styled.div`
  h1 {
    font-family: "Korto-bold", sans-serif;
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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

  svg {
    font-size: 1.2rem;
    color: #000;
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
`;

const ContactInfo = styled.div`
  p {
    font-family: "Gilroy-medium", sans-serif;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <LogoSection>
        <h1>
          TECH <br />
          TASTE <br />
          FOODS
        </h1>
        <SocialLinks>
          <SocialIcon href="#">
            <img src={facebook} alt="" />
          </SocialIcon>
          <SocialIcon href="#">
            <img src={insta} alt="" />
          </SocialIcon>
          <SocialIcon href="#">
            <img src={twitter} alt="" />
          </SocialIcon>
          <SocialIcon href="#">
            <img src={linkedin} alt="" />
          </SocialIcon>
        </SocialLinks>
      </LogoSection>

      <Column>
        <h2>Company</h2>
        <ul>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Clients</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a>Careers</a>
          </li>
        </ul>
      </Column>

      <Column>
        <h2>Stay Updated</h2>
        <ul>
          <li>
            <a href="#">FAQs</a>
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
