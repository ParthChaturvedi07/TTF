import React, { useRef } from "react";
import styled from "styled-components";
import location from "../assets/icons/location.svg";
import phone from "../assets/icons/phone.svg";
import email from "../assets/icons/email.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Footer } from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
  position: relative;
`;

const PageTitle = styled.h1`
  display: flex;
  span {
    font-family: "Korto-bold", sans-serif;
    font-weight: 700;
    font-size: 7rem;
    display: inline-block;
    transform-origin: center;
    margin: 0 1.5rem;
    transform: scale(2);
  }

  span:nth-of-type(4),
  span:nth-of-type(7) {
    margin: 0 1rem;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    span {
      font-size: 5rem;
      margin: 0 1.2rem;
    }
  }

  @media (max-width: 600px) {
    span {
      font-size: 3rem;
      margin: 0 1.2rem;
    }
  }
`;

const Connect = styled.div`
  width: 90%;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;

  @media (min-width: 601px) and (max-width: 900px) {
    width: 100%;
    padding: 0rem;
  }

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    padding: 0.5rem;
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;

  @media (max-width: 600px) {
    gap: 0.2rem;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    gap: 0.3rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fffbea;
  padding: 2rem;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  @media (max-width: 600px) {
    padding: 1rem;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    padding: 1.5rem;
  }
`;

const InfoCard = styled.div`
  background: #ffffff;
  padding: 1rem;
  border-radius: 22px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background: #fad60b;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-family: "Korto-bold", sans-serif;
  font-size: 1.1rem;
  margin: 0;
`;

const InfoText = styled.p`
  font-family: "Gilroy", sans-serif;
  font-weight: 400;
  color: #000;
  opacity: 91%;
  font-size: 0.9rem;
  margin: 0;

  @media (min-width: 601px) and (max-width: 900px) {
    font-size: 0.87rem;
  }

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

const HateFormContainer = styled.div`
  background: #fffbea;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;

  @media (min-width: 601px) and (max-width: 900px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    padding: 1.2rem;
  }
`;

const HateFormTitle = styled.h2`
  font-family: "Korto-bold", sans-serif;
  font-size: 2.5rem;
  margin: 0;

  @media (min-width: 601px) and (max-width: 900px) {
    font-size: 2.3rem;
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const HateFormText = styled.p`
  font-family: "Gilroy-medium", sans-serif;
  font-size: 1rem;
  margin: 1rem 0;
`;

const ScheduleButton = styled.a`
  display: inline-block;
  width: 100%;
  padding: 1rem;
  background: #fcb731;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  font-family: "Gilroy-semibold", sans-serif;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 120px;
    height: 120px;
    border-radius: 999px;
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
    scale: 1.05;
    box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
  }

  &:active {
    scale: 1;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    font-size: 1rem;
    padding: 0.8rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const FormLabel = styled.label`
  font-family: "Korto-medium", sans-serif;
  font-size: 1rem;
  color: #000;
  margin-bottom: 0.5rem;
  display: block;
`;

const FormField = styled.div`
  width: 100%;
`;

const ContactFormContainer = styled.div`
  background: #fffbea;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  flex: 2;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 18px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  font-family: "Gilroy", sans-serif;
  font-size: 1rem;
  margin-bottom: 1rem;

  &::placeholder {
    font-size: 1rem;
    color: #666;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 18px;
  border: none;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  font-family: "Gilroy-medium", sans-serif;
  font-size: 1rem;
  min-height: 150px;
  resize: none;

  &::placeholder {
    color: #666;
  }
`;

const SendButton = styled(ScheduleButton)`
  margin-top: 1rem;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 300px;
    height: 300px;
    border-radius: 999px;
    scale: 0;
    z-index: -1;
    background-color: #fff;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
`;

export const Contact = () => {
  const contactSectionRef = useRef(null);
  const pageTitleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const contactFromRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSectionRef.current,
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

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: contactSectionRef.current,
        scroller: "body",
        start: "top 50%",
        end: "top -30%",
        // markers: true,
        scrub: 1.2,
      },
    });

    tl2
      .from(
        contactInfoRef.current,
        {
          x: "-200",
          autoAlpha: 0,
          ease: "power4.inOut",
        },
        "slideIn"
      )
      .from(
        contactFromRef.current,
        {
          x: "200",
          autoAlpha: 0,
          ease: "power4.inOut",
        },
        "slideIn"
      );
  }, []);

  return (
    <>
      <ContactSection id="contact" ref={contactSectionRef}>
        <PageTitle ref={pageTitleRef}>
          <span>G</span>
          <span>e</span>
          <span>t</span>
          <span>&nbsp;</span>
          <span>i</span>
          <span>n</span>
          <span>&nbsp;</span>
          <span>T</span>
          <span>o</span>
          <span>u</span>
          <span>c</span>
          <span>h</span>
        </PageTitle>
        <Connect>
          <ContactInfoContainer ref={contactInfoRef}>
            <ContactInfo>
              <InfoCard>
                <Icon>
                  <img src={email} alt="" />
                </Icon>
                <InfoContent>
                  <InfoTitle>Email Us</InfoTitle>
                  <InfoText>techtastefoods@gmail.com</InfoText>
                </InfoContent>
              </InfoCard>

              <InfoCard>
                <Icon>
                  <img src={phone} alt="" />
                </Icon>
                <InfoContent>
                  <InfoTitle>Call Us</InfoTitle>
                  <InfoText>+91-9643422824</InfoText>
                </InfoContent>
              </InfoCard>

              <InfoCard>
                <Icon>
                  <img src={location} alt="" />
                </Icon>
                <InfoContent>
                  <InfoTitle>Visit Us</InfoTitle>
                  <InfoText>
                    STATE BANK COLONY, Gate Number 1, Block A, Gujranwala Town,
                    Delhi, 110009
                  </InfoText>
                </InfoContent>
              </InfoCard>
            </ContactInfo>

            <HateFormContainer>
              <HateFormTitle>Hate contact forms?</HateFormTitle>
              <HateFormText>
                We get you. So let's skip the small talk. Book a free strategy
                call — no strings, no spam, just real convo.
              </HateFormText>
              <ScheduleButton href="tel:+1234567890">
                Schedule a FREE meeting with us!
              </ScheduleButton>
            </HateFormContainer>
          </ContactInfoContainer>

          <ContactFormContainer ref={contactFromRef}>
            <form>
              <FormField>
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Your name" />
              </FormField>

              <FormGroup>
                <FormField>
                  <FormLabel>E-mail</FormLabel>
                  <Input type="email" placeholder="john@example.com" />
                </FormField>
                <FormField>
                  <FormLabel>Phone</FormLabel>
                  <Input type="tel" placeholder="Phone Number" />
                </FormField>
              </FormGroup>

              <FormGroup>
                <FormField>
                  <FormLabel>Brand name</FormLabel>
                  <Input type="text" placeholder="Your brand name" />
                </FormField>
                <FormField>
                  <FormLabel>City</FormLabel>
                  <Input type="text" placeholder="Your city" />
                </FormField>
              </FormGroup>

              <FormField>
                <FormLabel>Message</FormLabel>
                <TextArea placeholder="Anything else you would like to tell us" />
              </FormField>

              <SendButton type="submit">Send Message</SendButton>
            </form>
          </ContactFormContainer>
        </Connect>
      </ContactSection>
      {/* <Footer /> */}
    </>
  );
};
