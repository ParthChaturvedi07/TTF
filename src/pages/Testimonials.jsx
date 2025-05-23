import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import test1 from "../assets/images/testimonial1.png";
import test1 from "../assets/videos/Cinematic Coffee B Roll - Sony A7S III + 16-35mm F4.mp4";
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
    font-size: 6.6rem;
    display: inline-block;
    transform-origin: center;
    margin: 0 2rem;
    transform: scale(2);
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
`;

const Title = styled.p`
  font-family: "Korto-medium", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  margin: 4px 0 0 0;
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
`;

const BasicInfos = styled.div`
  border-top: 1px solid #000;
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
  color: #000;
  text-decoration: underline;
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
      transform: "translate(-48%)",
      ease: "linear",
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
      video: test1, // Replace with actual video paths
      name: "Sarthak Sahni",
      title: "Founder, TTF",
      quote:
        "We saw real results within weeks. TechTasteFoods didn't just suggest changes — they brought a clear strategy, and creative ideas.",
    },
    {
      video: test1, // Replace with actual video paths
      name: "Sarthak Sahni",
      title: "Founder, TTF",
      quote:
        "We saw real results within weeks. TechTasteFoods didn't just suggest changes — they brought a clear strategy, and creative ideas.",
    },
    {
      video: test1, // You'll need to import additional videos
      name: "Sarah Johnson",
      title: "Operations Head, EatFresh",
      quote:
        "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    },
    {
      video: test1, // You'll need to import additional videos
      name: "Sarah Johnson",
      title: "Operations Head, EatFresh",
      quote:
        "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    },
    {
      video: test1, // You'll need to import additional videos
      name: "Sarah Johnson",
      title: "Operations Head, EatFresh",
      quote:
        "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    },
    {
      video: test1, // You'll need to import additional videos
      name: "Sarah Johnson",
      title: "Operations Head, EatFresh",
      quote:
        "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    },
    // },{
    //   image: test1, // You'll need to import additional images
    //   name: "Sarah Johnson",
    //   title: "Operations Head, EatFresh",
    //   quote:
    //     "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    // },{
    //   image: test1, // You'll need to import additional images
    //   name: "Sarah Johnson",
    //   title: "Operations Head, EatFresh",
    //   quote:
    //     "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    // },{
    //   image: test1, // You'll need to import additional images
    //   name: "Sarah Johnson",
    //   title: "Operations Head, EatFresh",
    //   quote:
    //     "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    // },{
    //   image: test1, // You'll need to import additional images
    //   name: "Sarah Johnson",
    //   title: "Operations Head, EatFresh",
    //   quote:
    //     "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    // },{
    //   image: test1, // You'll need to import additional images
    //   name: "Sarah Johnson",
    //   title: "Operations Head, EatFresh",
    //   quote:
    //     "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    // },{
    //   image: test1, // You'll need to import additional images
    //   name: "Sarah Johnson",
    //   title: "Operations Head, EatFresh",
    //   quote:
    //     "The implementation was smooth, and the results exceeded our expectations. Highly recommended!",
    // },
  ];

  return (
    <TestimonialSection id="testimonials"
      style={{
        padding: "4vh",
      }}
      ref={sectionRef}
    >
      <PageTitle ref={pageTitleRef}>
        <span>T</span>
        <span>e</span>
        <span>s</span>
        <span>t</span>
        <span>i</span>
        <span>m</span>
        <span>o</span>
        <span>n</span>
        <span>i</span>
        <span>a</span>
        <span>l</span>
        <span>s</span>
      </PageTitle>
      <CardContainer ref={cardsContainerRef}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </CardContainer>
    </TestimonialSection>
  );
};
