# Tech Taste Foods – React Frontend

A modern, animated, and responsive frontend for Tech Taste Foods, built with **React**, **Vite**, **styled-components**, **GSAP**, and **Locomotive Scroll** (or Lenis for smooth scrolling). This project showcases restaurant/food business services, testimonials, stats, FAQs, and more, with rich UI/UX and smooth scroll-based animations.

---

## 🚀 Features

- **React + Vite**: Fast development and HMR.
- **Styled Components**: Modular, themeable CSS-in-JS.
- **GSAP Animations**: Scroll-triggered, staggered, and pinning animations.
- **Smooth Scrolling**: Using Locomotive Scroll or Lenis for buttery-smooth scroll and scroll-based triggers.
- **Responsive Design**: Works on desktop and mobile.
- **Custom Fonts**: Korto and Gilroy font families.
- **Sections**:
  - Hero landing with animated text and video
  - Services with dynamic cards
  - Animated Stats with number tickers
  - Testimonials with horizontal scroll and pinning
  - Clients, Gallery, FAQs, and Contact
- **SVG and Image Assets**: For icons, backgrounds, and illustrations.

---

## 📦 Folder Structure

GitHub Copilot
src/ assets/ # Images, videos, SVGs, fonts components/ # Navbar, Footer, ServiceCard, etc. pages/ # Hero, Services, Stats, Testimonials, Faqs, Gallery, Contact, Clients, Process styles/ # GlobalStyles.js, BlobBackground.js, etc. App.jsx # Main app entry main.jsx # Vite entry point ...

---

## 🛠️ Getting Started

### 1. Install dependencies

```sh
npm install

2. Start the development server
npm run dev
3. Build for production
npm run dev
```

⚙️ Key Dependencies
React – UI library
Vite – Fast dev/build tool
styled-components – CSS-in-JS
GSAP – Animations and ScrollTrigger
Locomotive Scroll or Lenis – Smooth scrolling
@gsap/react – GSAP React integration

📝 Customization
Fonts: Place your .ttf files in public/fonts/ and reference them in GlobalStyles.js.
Assets: Place images/videos in src/assets/.
Backgrounds: Set background images in GlobalStyles.js or per-section styled components.
ScrollTrigger: Always use scroller: scrollRef.current when using Locomotive Scroll.

🧩 Adding Sections
Each section is a React component in src/pages/.
To add or reorder, edit the <App /> component in App.jsx.

🐞 Troubleshooting
Pinning/ScrollTrigger not working?
Make sure you pass scrollRef to all components using GSAP ScrollTrigger and set scroller: scrollRef.current.
Fonts not loading?
Check your font paths in GlobalStyles.js.
Locomotive/Lenis conflicts?
Only use one smooth scroll library at a time and ensure correct version.

👨‍💻 Author
Made by Parth for Tech Taste Foods.

**Tip:**  
Update the author, license, and asset paths as needed for your deployment.