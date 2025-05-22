import React, { useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// import { BlobBackground } from "../styles/BlobBackground";

gsap.registerPlugin(ScrollTrigger);

const FaqSection = styled.div`
  // background-color: #fff4c9;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  position: relative;
`;

const PageTitle = styled.h1`
  position: absolute;
  top: 10%;
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
`;

const FaqContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 25vh;
`;

const FaqItem = styled.div.attrs(({ isActive, ...rest }) => rest)`
  border-radius: 35px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  background: ${(props) => (props.isActive ? " #FCB731" : "#FFF")};
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${(props) => (props.isActive ? "#FCB731" : "#FCB731")};
  }
`;

const QuestionHeader = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Question = styled.h3`
  font-family: "Gilroy-semibold", sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #000;
  margin: 0;
`;

const ToggleIcon = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isActive ? "rotate(45deg)" : "rotate(0)")};

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #000;
    border-radius: 2px;
  }

  &::before {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &::after {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
`;

const Answer = styled.div.attrs(({ isActive, ...rest }) => rest)`
  background-color: #fffbea;
  max-height: ${(props) => (props.isActive ? "500px" : "0")};
  opacity: ${(props) => (props.isActive ? "1" : "0")};
  transition: all 0.3s ease-in-out;
  padding: ${(props) => (props.isActive ? "1rem 2rem" : "0 2rem")};
  font-family: "Gilroy", sans-serif;
  font-weight: 500;
  color: #000;
`;

export const Faqs = () => {
  const faqSectionRef = useRef(null);
  const faqItemsRef = useRef([]);
  const pageTitleRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is TechTasteFoods?",
      answer:
        "TechTasteFoods is your restaurant's growth partner – we're not just consultants, we're your extended team. From menu revamps to marketing campaigns, Swiggy/Zomato optimization to brand identity – we help cafes, cloud kitchens, and restaurants unlock their full potential with practical, data-driven strategies.",
    },
    {
      question: "Who is TechTasteFoods for?",
      answer:
        "TechTasteFoods is designed for restaurant owners, cloud kitchen operators, and food entrepreneurs who want to grow their business with data-driven strategies and modern solutions.",
    },
    {
      question: "How do I get started with you?",
      answer:
        "Getting started is simple! Just reach out to us through our contact form or schedule a free consultation. We'll discuss your needs and create a customized plan for your business.",
    },
    {
      question: "I'm just starting out. Will your services still help me?",
      answer:
        "Absolutely! We work with businesses at all stages, from startups to established restaurants. Our solutions are tailored to your specific needs and growth stage.",
    },
    {
      question: "What makes you different from other restaurant consultants?",
      answer:
        "We combine traditional restaurant expertise with modern tech solutions and data analytics. Our approach is hands-on, practical, and focused on measurable results.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "We offer comprehensive services including menu optimization, brand development, marketing strategies, operations improvement, and technology integration.",
    },
    {
      question: "Can I choose only the services I need?",
      answer:
        "Yes! While we offer comprehensive solutions, you can select specific services that match your current needs and budget.",
    },
    {
      question: "Still unsure?",
      answer:
        "Let's have a conversation! Book a free consultation call with us to discuss your specific needs and how we can help.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: faqSectionRef.current,
        scroller: "body",
        start: "top: 70%",
        end: "top 30%",
        // markers: false,
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
        trigger: faqSectionRef.current,
        scroller: "body",
        start: "top 60%",
        end: "top 10%",
        // markers: true,
        toggleActions: "play none none reset",
      },
    });

    tl2.fromTo(
      faqItemsRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: {
          amount: 0.8,
          from: "start",
        },
        ease: "power3.out",
      }
    );

    // 🔁 Add resize listener for ScrollTrigger refresh
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    // 🧹 Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <FaqSection ref={faqSectionRef}>
        <PageTitle ref={pageTitleRef}>
          <span>F</span>
          <span>A</span>
          <span>Q</span>
        </PageTitle>
        <FaqContainer>
          {/* <BlobBackground /> */}
          {faqData.map((faq, index) => (
            <FaqItem
              ref={(el) => (faqItemsRef.current[index] = el)}
              className="faq-item"
              key={index}
              isActive={activeIndex === index}
            >
              <QuestionHeader onClick={() => toggleFaq(index)}>
                <Question>{faq.question}</Question>
                <ToggleIcon isActive={activeIndex === index} />
              </QuestionHeader>
              <Answer isActive={activeIndex === index}>{faq.answer}</Answer>
            </FaqItem>
          ))}
        </FaqContainer>
      </FaqSection>
    </>
  );
};
