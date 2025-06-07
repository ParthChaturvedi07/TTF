import React, { useState } from "react";
import styled from "styled-components";
import svc1 from "../assets/images/svc1.png";
import svc2 from "../assets/images/svc2.png";
import svc3 from "../assets/images/chef-with-tablet.png";
import svc4 from "../assets/images/logodsn.avif";
import svc5 from "../assets/images/packagingdsn.jpg";
import svc6 from "../assets/images/photoshoot.avif";
import svc7 from "../assets/images/digitalmarketing.avif";
import svc8 from "../assets/images/advertisement.avif";
import svc9 from "../assets/images/swiggyzomato.png";
import svc10 from "../assets/images/webdsn.avif";
import svc11 from "../assets/images/webdev.avif";
import svc12 from "../assets/images/appdsn.avif";
import svc13 from "../assets/images/fssai.jpg";
import svc14 from "../assets/images/pos.avif";
import svc15 from "../assets/images/menu.avif";

// Sample data array
const cardsData = [
  {
    id: 1,
    sections: [
      { title: "Revenue Strategies", image: svc1 },
      { title: "Business Consulting", image: svc2 },
      { title: "Cloud Kitchen Solutions", image: svc3 },
    ],
    ctaText: "Still thinking of investing into that restaurant? WE CAN HELP!",
    ctaButton: "Book a FREE call with us!",
  },
  {
    id: 2,
    sections: [
      { title: "Logo Design", image: svc4 },
      { title: "Packaging Designs", image: svc5 },
      { title: "Photoshoots", image: svc6 },
    ],
    ctaText: "Make your brand look as good as your food tastes!",
    ctaButton: "Book a FREE call with us!",
  },
  {
    id: 3,
    sections: [
      { title: "Digital Marketing", image: svc7 },
      { title: "Ad Campaigns", image: svc8 },
      { title: "Swiggy and Zomato Setup", image: svc9 },
    ],
    ctaText: "Still wondering if ads really work? Lets prove they do!",
    ctaButton: "Book a FREE call with us!",
  },
  {
    id: 4,
    sections: [
      { title: "Website Design", image: svc10 },
      { title: "Website Development", image: svc11 },
      { title: "App Design", image: svc12 },
    ],
    ctaText: "Your food is online, is your brand online too?",
    ctaButton: "Book a FREE call with us!",
  },
  {
    id: 5,
    sections: [
      { title: "FSSAI Licensing", image: svc13 },
      { title: "POS Integration", image: svc14 },
      { title: "Menu Engineering", image: svc15 },
    ],
    ctaText: "Wanna fix that Backend chaos before it burns your profits?",
    ctaButton: "Book a FREE call with us!",
  },
];

const CardContainer = styled.div`
  position: absolute;
  // left: 24%;
  bottom: 85%;

  /* For screens between 1200px and 1100px */
  // @media (max-width: 1200px) and (min-width: 1101px) {
  //   left: 18%;
  // }

  // /* For screens between 1100px and 1024px */
  // @media (max-width: 1100px) and (min-width: 1025px) {
  //   left: 14%;
  // }

  // /* For screens between 1024px and 992px */
  // @media (max-width: 1024px) and (min-width: 993px) {
  //   // left: 12%;
  // }

  // /* For screens between 992px and 900px */
  // @media (max-width: 992px) and (min-width: 901px) {
  //   left: 10%;
  // }

  // /* For screens between 900px and 850px */
  // @media (max-width: 900px) and (min-width: 851px) {
  //   left: 7%;
  // }

  // /* For screens between 850px and 800px */
  // @media (max-width: 850px) and (min-width: 801px) {
  //   left: 5%;
  // }

  // /* For screens between 800px and 768px */
  // @media (max-width: 800px) and (min-width: 768px) {
  //   left: 0;
  // }
`;

const Card = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 24px;
  height: 68vh;
  width: 68vh;

  /* For screens between 1200px and 992px */
  @media (max-width: 1200px) and (min-width: 993px) {
    height: 65vh;
    width: 65vh;
  }

  /* For screens between 992px and 900px */
  @media (max-width: 992px) and (min-width: 901px) {
    height: 63vh;
    width: 63vh;
  }

  /* For screens between 900px and 768px */
  @media (max-width: 900px) and (min-width: 768px) {
    height: 58vh;
    width: 58vh;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    height: 42vh;
    width: 42vh;
  }

  @media (max-width: 480px) {
    height: 38vh;
    width: 38vh;
  }
`;

const Content = styled.div`
  // background-color: blue;
  left: -50%;
  position: absolute;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  // position: relative;
  padding: 1.5rem 2rem;
  background: #fcb731;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.5s ease;
  margin-bottom: 2rem;

  &:hover {
    transform: scale(1.02);
    background: #fffbea;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    h3 li {
      color: #000;
    }
  }

  h3 {
    z-index: 1;
    li {
      font-size: 1.2rem;
      font-family: "Korto-medium", sans-serif;
      font-weight: 500;
      color: white;
    }
    margin: 0 auto;
    padding: 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 1.3rem 1.7rem;
    margin-bottom: 1.2rem;

    h3 {
      z-index: 1;
      li {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
    margin-bottom: 1.2rem;

    h3 {
      z-index: 1;
      li {
        font-size: 0.8rem;
      }
    }
  }
`;

const ImageSection = styled.div`
  position: relative;
  height: 22vh;
  width: 100%;
  border-radius: 46px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  transition: all 0.5s ease;
  will-change: transform;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
    border-radius: 46px;
    pointer-events: none;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    height: 19vh;
  }

  @media (max-width: 480px) {
    height: 15vh;
  }
`;

const CallToAction = styled.div`
  position: absolute;
  bottom: 1.5vh;
  left: 0;
  padding: 3vh;
  text-align: left;

  @media (min-width: 481px) and (max-width: 768px) {
    bottom: 0;
  }

  @media (max-width: 480px) {
    bottom: -1vh;
  }
`;

const CTAText = styled.p`
  font-size: 1.15rem;
  color: #fff;
  width: 80%;
  font-family: "Gilroy-medium", sans-serif;
  margin: 0 0 16px 0;

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1rem;
    width: 85%;
    margin: 0 0 12px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    width: 90%;
    margin: 0 0 8px 0;
  }
`;

const CTAButton = styled.button`
  background: #fcb731;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  font-size: 1rem;
  font-family: "Gilroy-semibold", sans-serif;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;
  color: #fff;

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
    transition: all 0.6s ease;
  }

  &:hover::before {
    scale: 3;
  }

  &:hover {
    color: #000;
    background: #000;
    box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
    scale: 1.05;
  }

  &:active {
    scale: 1;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 10px 19px;
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.7rem;
  }
`;

const ServiceCard = ({ cardData }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const currentImage =
    hoveredIndex !== null
      ? cardData.sections[hoveredIndex].image
      : cardData.sections[0].image;

  const handleGoogleCalendarClick = () => {
    const calendarUrl =
      "https://calendar.google.com/calendar/render?" +
      "action=TEMPLATE" +
      "&text=Discovery+Call+with+Tech Taste Foods" +
      "&dates=20250601T110000Z/20250601T113000Z" +
      "&details=Let%27s+discuss+your+project!+Call+me+at+%2B+91-9643422824" +
      "&location=Online" +
      "&sf=true&output=xml";

    window.open(calendarUrl, "_blank");
  };

  return (
    <Card>
      <Content>
        {cardData.sections.map((section, index) => (
          <Section
            key={index}
            className="section-item"
            onMouseEnter={() => {
              setHoveredIndex(index);
              console.log(`Hovered Image: ${cardData.sections[index].image}`);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="over"></div>
            <h3>
              <li> {section.title}</li>
            </h3>
          </Section>
        ))}
        <div className="image-group">
          <ImageSection
            image={currentImage}
            style={{
              transition: "all 0.5s ease",
            }}
            loading="lazy"
          />
          <CallToAction>
            <CTAText>{cardData.ctaText}</CTAText>
            <CTAButton onClick={handleGoogleCalendarClick}>
              {cardData.ctaButton}
            </CTAButton>
          </CallToAction>
        </div>
      </Content>
    </Card>
  );
};

const DynamicCardList = React.forwardRef((props, ref) => {
  return (
    <CardContainer>
      <div style={{ position: "absolute", top: "10%", right: "0" }} ref={ref}>
        {cardsData.map((card) => (
          <ServiceCard key={card.id} cardData={card} />
        ))}
      </div>
    </CardContainer>
  );
});

export default DynamicCardList;
