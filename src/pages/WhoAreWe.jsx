import React from "react";
import styled from "styled-components";

const WhoAreWeContainer = styled.section`
  position: absolute;
  right: 0;
  width: 65.5%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 4rem;
  z-index: 1;
  overflow: hidden;
  text-align: left;

  box-shadow: 0 -8px -24px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: 480px) {
    width: 100%;
    height: 100vh;
    padding: 2rem;
  }
`;

const Heading = styled.h1`
  margin-left: 2vw;
  div {
    font-size: 3rem;
    font-family: "Korto-bold", san-serif;
    color: #000;
  }
  margin-bottom: 1.1rem;

  @media (max-width: 480px) {
    margin-left: 0;
    div {
      font-size: 1.9rem;
      text-align: center;
    }
    margin-top: -15rem;
  }
`;

const Paragraph = styled.p`
  margin-left: 2vw;
  max-width: 40vw;
  div {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #000;
    font-family: "Gilroy-medium", san-serif;

    strong {
      font-weight: 600;
      font-family: "Gilroy-medium", san-serif;
    }
  }
  margin-bottom: 5rem;

  @media (max-width: 480px) {
    margin-left: 0;
    max-width: 100%;

    div {
      font-size: 1.1rem;
      line-height: 1.4;
    }

    margin-bottom: 0.8rem;
  }
`;

const Callout = styled.div`
  background: #ffffff;
  border-radius: 999px;
  padding: 1.2rem;
  text-align: right;
  display: flex;
  gap: 2vw;
  justify-content: flex-end;
  align-items: center;
  min-width: 38.25rem;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  margin-left: -8.5vw;

  @media (max-width: 480px) {
    text-align: center;
    margin-left: 0vw;
    min-width: 0;
    padding: 0.7rem;
  }
`;

const CalloutText = styled.div`
  max-width: 12.7vw;
  text-align: left;
  font-family: "Gilroy-semibold", san-serif;

  @media (max-width: 480px) {
    display: none;
  }
`;

const CalloutButton = styled.button`
  background: #fcb731;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.16);
  color: #ffffff;
  font-family: "Gilroy-semibold", san-serif;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 999px;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  z-index: 4;
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
    color: #fcb731;
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
  }

  &:active {
    scale: 1;
  }
`;

export const WhoAreWe = ({ headingRef, calloutRef, paraRef }, ref) => {
  return (
    <WhoAreWeContainer id="about" ref={ref}>
      <Heading className="text" ref={headingRef}>
        Helping restaurants
        <br />
        get their Glow-up
      </Heading>
      <Paragraph className="text" ref={paraRef}>
        At <strong>TechTasteFoods</strong>, we team up with{" "}
        <strong>restaurants, cafes, cloud kitchens, and food brands</strong> to
        fix the messy stuff —{" "}
        <strong>
          from menus to marketing, POS systems to Swiggy/Zomato hacks
        </strong>
        , and everything in between. We mix data, design, and food business
        brains to <strong>help you grow faster and smarter</strong>.
      </Paragraph>
      <Callout ref={calloutRef}>
        <CalloutText>
          If it runs on food, we know how to make it run better.
        </CalloutText>
        <CalloutButton>Book a free call with us!</CalloutButton>
      </Callout>
    </WhoAreWeContainer>
  );
};
