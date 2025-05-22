# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


// matter.js:
// useEffect(() => {
  //   const { Engine, Render, World, Bodies, Events, Body } = Matter;

  //   const engine = Engine.create({
  //     gravity: { y: 0.6 },
  //   });
  //   const world = engine.world;

  //   const render = Render.create({
  //     canvas: canvasRef.current,
  //     engine: engine,
  //     options: {
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //       wireframes: false,
  //       background: "transparent",
  //       pixelRatio: window.devicePixelRatio,
  //     },
  //   });

  //   const ground = Bodies.rectangle(
  //     window.innerWidth / 2,
  //     window.innerHeight + 30,
  //     window.innerWidth,
  //     60,
  //     {
  //       isStatic: true,
  //       render: { visible: false },
  //     }
  //   );

  //   const leftWall = Bodies.rectangle(
  //     -30,
  //     window.innerHeight / 2,
  //     60,
  //     window.innerHeight,
  //     {
  //       isStatic: true,
  //       render: { visible: false },
  //     }
  //   );

  //   const rightWall = Bodies.rectangle(
  //     window.innerWidth + 30,
  //     window.innerHeight / 2,
  //     60,
  //     window.innerHeight,
  //     {
  //       isStatic: true,
  //       render: { visible: false },
  //     }
  //   );

  //   World.add(world, [ground, leftWall, rightWall]);

  //   const textures = [burgerImg, pizzaImg, samosaImg];
  //   const activeBodies = [];

  //   const createFallingItem = () => {
  //     const size = 65;
  //     const texture = textures[Math.floor(Math.random() * textures.length)];
  //     const startX = Math.random() * (window.innerWidth - 200) + 100;

  //     const body = Bodies.circle(startX, -60, size / 2, {
  //       restitution: 0.3,
  //       friction: 0.1,
  //       density: 0.001,
  //       render: {
  //         sprite: {
  //           texture,
  //           xScale: size / 100,
  //           yScale: size / 100,
  //         },
  //       },
  //     });

  //     body.hasSwitched = false;
  //     activeBodies.push(body);
  //     Body.setVelocity(body, { x: Math.random() - 0.5, y: 2 });

  //     World.add(world, body);

  //     // Remove bodies that are out of view
  //     if (activeBodies.length > 20) {
  //       const oldBody = activeBodies.shift();
  //       World.remove(world, oldBody);
  //     }
  //   };

  //   let interval = setInterval(createFallingItem, 1000);

  //   Events.on(engine, "afterUpdate", () => {
  //     const switchHeight = window.innerHeight * 0.4;
  //     activeBodies.forEach((body) => {
  //       if (!body.hasSwitched && body.position.y > switchHeight) {
  //         body.render.sprite.texture = noteImg;
  //         body.hasSwitched = true;
  //       }
  //     });
  //   });

  //   Engine.run(engine);
  //   Render.run(render);

  //   const handleResize = () => {
  //     render.canvas.width = window.innerWidth;
  //     render.canvas.height = window.innerHeight;
  //     Matter.Body.setPosition(ground, {
  //       x: window.innerWidth / 2,
  //       y: window.innerHeight + 30,
  //     });
  //     Matter.Body.setPosition(rightWall, {
  //       x: window.innerWidth + 30,
  //       y: window.innerHeight / 2,
  //     });
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     clearInterval(interval);
  //     Render.stop(render);
  //     World.clear(world, false);
  //     Engine.clear(engine);
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);