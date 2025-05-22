import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Matter from "matter-js";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
  }
`;

const CenterCircle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
`;

const CTAButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;

  &:hover {
    transform: scale(1.05);
    background: #333;
  }
`;

export const Clients = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;

    // Create engine
    engineRef.current = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });

    // Create renderer
    renderRef.current = Render.create({
      element: containerRef.current,
      engine: engineRef.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // Ensure objects are rendered with fill styles
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    // Create walls
    const walls = [
      Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 30,
        window.innerWidth,
        60,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
      Bodies.rectangle(-30, window.innerHeight / 2, 60, window.innerHeight, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      Bodies.rectangle(
        window.innerWidth + 30,
        window.innerHeight / 2,
        60,
        window.innerHeight,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
    ];

    // Add walls to world
    World.add(engineRef.current.world, walls);

    // Create falling circles function
    const createCircle = () => {
      if (!engineRef.current) return;

      const size = Math.random() * 60 + 20;
      const circle = Bodies.circle(
        Math.random() * (window.innerWidth - 100) + 50,
        -50,
        size / 2,
        {
          render: {
            fillStyle: "#ff0000", // Ensure the circle has a visible color
          },
          restitution: 0.6,
          friction: 0.1,
          density: 0.001,
        }
      );
      World.add(engineRef.current.world, circle);

      // Log circle creation for debugging
      console.log("Circle created:", circle);

      // Remove circles that are out of view
      setTimeout(() => {
        if (engineRef.current && circle) {
          World.remove(engineRef.current.world, circle);
          console.log("Circle removed:", circle);
        }
      }, 10000);
    };

    // Start engine and renderer
    Engine.run(engineRef.current);
    Render.run(renderRef.current);

    // Create circles periodically
    const interval = setInterval(createCircle, 1000);

    // Handle window resize
    const handleResize = () => {
      if (!renderRef.current || !renderRef.current.canvas) return;

      renderRef.current.canvas.width = window.innerWidth;
      renderRef.current.canvas.height = window.innerHeight;
      Matter.Render.setPixelRatio(renderRef.current, window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);

      if (engineRef.current) {
        World.clear(engineRef.current.world);
        Engine.clear(engineRef.current);
      }

      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current.canvas = null;
        renderRef.current.context = null;
        renderRef.current.textures = {};
      }
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <CenterCircle>
        <CTAButton>Request Visit</CTAButton>
      </CenterCircle>
    </Container>
  );
};
