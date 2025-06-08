import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import test1 from "../assets/images/testimonial1.png";
// import test1 from "../assets/videos/Video-163.mp4";
// import test2 from "../assets/videos/Video-532.mp4";
// import test3 from "../assets/videos/Video-246.mp4";
// import test4 from "../assets/videos/Video-268.mp4";
import coinImage from "../assets/images/coin.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = styled.div`
  // background-color: #fff4c9;
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // align-items: center;
  overflow-x: hidden;
`;

const PageTitle = styled.h1`
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  span {
    font-family: "Korto-bold", sans-serif;
    font-weight: 700;
    font-size: 4.5rem;
    display: inline-block;
    transform-origin: center;
    margin: 0 1.5rem;
    transform: scale(2);
  }

  @media (max-width: 480px) {
    span {
      font-size: 2.5rem;
      margin: 0 1rem;
      transform: scale(1.4);
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    span {
      font-size: 3rem;
      margin: 0 1.2rem;
      transform: scale(1.6);
    }
  }
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  height: 50vh;
  width: max-content;
  margin-top: 27vh;

  @media (max-width: 480px) {
    gap: 5vw;
  }
`;

const Card = styled.div`
  position: relative;
  width: 28vw;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;

  border-radius: 26px;
  background: #fff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);

  .basic-info {
    transition: all 0.3s ease-in-out;
    transform: translateY(0);
  }

  &:hover {
    .expanded-content {
      transform: translateY(0);

      max-height: 50vh;
      background: #fde89a;
      opacity: 1;
      transition: all 0.3s ease-in-out;
    }

    .basic-info {
      display: none;
      transform: translateY(-10px);
      transition: all 0.3s ease-in-out;
    }

    .video-wrapper {
      border: 1px solid #000;
    }
  }

  @media (max-width: 480px) {
    width: 70vw;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 40vw;
  }
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: none;
  padding: 1.48vh;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  @media (max-width: 480px) {
    gap: 0.6rem;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30vh;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  &:hover .play-button {
    opacity: 1;
  }

  @media (max-width: 480px) {
    height: 20vh;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    height: 27vh;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: white;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 43px;
    height: 43px;
  }
`;

const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  font-family: "Korto-medium", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #000;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 15px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Title = styled.p`
  font-family: "Korto-medium", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  margin: 4px 0 0 0;

  @media (max-width: 480px) {
    font-size: 12px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 13px;
  }
`;

const ExpandedContent = styled.div`
  max-height: 0;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  background: #fff;
  overflow: hidden;

  // ${Card}:hover & {
  //   transform: translateY(0);
  // }
`;

const Testimonial = styled.div`
  padding: 16px;
  font-family: "Gilroy-medium", sans-serif;
  font-size: 1rem;
  line-height: 130%;
  color: #000;
  background: #fff;

  @media (max-width: 480px) {
    font-size: 14px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 15px;
  }
`;

const BasicInfos = styled.div`
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  background-color: #fffbea;
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VisitSite = styled.a`
  font-family: "Gilroy-medium", sans-serif;
  font-size: 0.9rem;
  color: #fe7105;
  text-decoration: none;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.88rem;
  }
`;

const ViewMore = styled.a`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  width: 12rem;
  height: auto;

  .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: #fcb731;
    border-radius: 1.625rem;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  }

  .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
  }

  .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
  }

  .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-family: "Gilroy-medium", sans-serif;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    color: #282936;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
  }

  &:hover .circle {
    width: 100%;
  }

  &:hover .icon.arrow {
    background: #fff;
    transform: translate(1rem, 0);
  }

  &:hover .button-text {
    color: #fff;
  }
`;

const TestimonialCard = ({ video, name, title, quote }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Card>
      <TopContent className=".top-content">
        <VideoWrapper className="video-wrapper" onClick={handleVideoClick}>
          <Video ref={videoRef} src={video} loop />
          <PlayButton className="play-button">
            {isPlaying ? (
              <svg viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </PlayButton>
        </VideoWrapper>
        <BasicInfo className="basic-info">
          <Name>{name}</Name>
          <Title>{title}</Title>
        </BasicInfo>
      </TopContent>
      <ExpandedContent className="expanded-content">
        <Testimonial>"{quote}"</Testimonial>
        <BasicInfos>
          <div style={{ display: "flex", gap: "2vh" }}>
            <img src={coinImage} alt="" />
            <BasicInfo>
              <Name>{name}</Name>
              <Title>{title}</Title>
            </BasicInfo>
          </div>
          <VisitSite href="#">Visit Site</VisitSite>
        </BasicInfos>
      </ExpandedContent>
    </Card>
  );
};

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const pageTitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
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

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: "body",
          markers: false,
          start: "top 0",
          end: "top -120%",
          scrub: 1.5,
          pin: true,
        },
      });
      tl2.to(cardsContainerRef.current, {
        transform: "translate(-33%)",
        ease: "linear",
      });
    });

    mm.add("(min-width: 481px) and (max-width: 768px)", () => {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: "body",
          markers: false,
          start: "top 0",
          end: "top -120%",
          scrub: 1.5,
          pin: true,
        },
      });
      tl2.to(cardsContainerRef.current, {
        transform: "translate(-50%)",
        ease: "linear",
      });
    });

    mm.add("(max-width: 480px)", () => {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: "body",
          markers: false,
          start: "top 0",
          end: "top -120%",
          scrub: 1.5,
          pin: true,
        },
      });
      tl2.to(cardsContainerRef.current, {
        transform: "translate(-81%)",
        ease: "linear",
      });
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

  const testimonials = [
    {
      video: "https://res.cloudinary.com/drtyehnro/video/upload/v1749367707/b4aw3qjqzcugzky02zq8.mp4",
      name: "Piyush Agarwal",
      title: "Founder, Indus Flavour",
      quote:
        "TechTasteFoods didn't just suggest changes — they brought a clear strategy, and creative ideas.",
    },
    {
      video: "https://res.cloudinary.com/drtyehnro/video/upload/v1749368382/gug3eadzbiep07mxtj7j.mp4", // You'll need to import additional videos
      name: "Krunal Parmar",
      title: "Owner, Multi brand Cloud Kitchen",
      quote:
        "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    },
    {
      video: "https://res.cloudinary.com/drtyehnro/video/upload/v1749368550/lls4obeczg9w3fid9pso.mp4", // Replace with actual video paths
      name: "Vidhu Saxena",
      title: "Founder, Bakistry",
      quote:
        "With Tech Taste Foods, we didn't just get consultants—we got partners who transformed our brand with data-driven strategies and real results.",
    },
    {
      video: "https://res.cloudinary.com/drtyehnro/video/upload/v1749368442/c2yhntka0j0g74tywgp4.mp4", // You'll need to import additional videos
      name: "Dharit Gadani",
      title: "Founder, Vittle Box",
      quote:
        "The approach and strategies were top-notch—TTF helped us streamline operations, boost revenue, and build a brand we’re truly proud of.",
    },
  ];

  return (
    <TestimonialSection
      id="testimonials"
      style={{
        padding: "4vh",
      }}
      ref={sectionRef}
    >
      <PageTitle ref={pageTitleRef}>
        <span>H</span>
        <span>a</span>
        <span>p</span>
        <span>p</span>
        <span>y</span>
        <span>&nbsp;</span>
        <span>C</span>
        <span>l</span>
        <span>i</span>
        <span>e</span>
        <span>n</span>
        <span>t</span>
        <span>s</span>
      </PageTitle>
      <CardContainer ref={cardsContainerRef}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
        <ViewMore href="https://www.instagram.com/techtastefoods/" className="learn-more">
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">View More</span>
        </ViewMore>
      </CardContainer>
    </TestimonialSection>
  );
};
