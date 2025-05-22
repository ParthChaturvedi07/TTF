import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @font-face {
  font-family: 'Korto-medium';
  src: url('/fonts/Korto-Medium.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  }

   @font-face {
    font-family: 'Korto-bold';
    src: url('/fonts/Korto-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Korto-heavy';
    src: url('/fonts/Korto-Heavy.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }

   @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/Gilroy-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gilroy-medium';
    src: url('/fonts/Gilroy-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gilroy-semibold';
    src: url('/fonts/Gilroy-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  body {
    font-family: XYZ;
    background-color: #F5F5F5;
    color: #000;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
