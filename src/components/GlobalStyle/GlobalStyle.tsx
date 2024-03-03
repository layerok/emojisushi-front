import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  html {
    overflow-x: hidden;
  }

  body {
    margin: 0;
    font-size: 15px;
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.colors.fg.default};
    background-color: ${({ theme }) => theme.colors.canvas.default};
    position: relative;
    overflow-x: hidden;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }

  img {
    width: 100%;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h5,
  p {
    margin: 0;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
