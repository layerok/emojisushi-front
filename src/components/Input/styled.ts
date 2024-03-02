import styled from "styled-components";
import { ifProp, theme, prop } from "styled-tools";

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{
  light: boolean;
}>`
  background: ${ifProp("light", "#272727", "#1C1C1C")};
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  padding: 11px 35px 11px 10px;
  border: none;
  width: ${prop("width", "100%")};
  color: white;

  ::-webkit-input-placeholder {
    color: ${theme("components.input.placeholder")};
  }

  ::-moz-placeholder {
    color: ${theme("components.input.placeholder")};
  }

  :-ms-input-placeholder {
    color: ${theme("components.input.placeholder")};
  }

  :-moz-placeholder {
    color: ${theme("components.input.placeholder")};
  }
`;

const Asterisk = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Error = styled.p`
  font-size: 10px;
  line-height: 12px;
  padding: 2px 5px;
  background-color: #cd3838;
  color: white;
  user-select: none;
  position: absolute;
  right: 0;
  z-index: 3;
`;

export { Input, Wrapper, Asterisk, Error };
