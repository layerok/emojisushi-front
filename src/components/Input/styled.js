import styled from "styled-components";
import {ifProp, theme, prop} from "styled-tools";


const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  background: ${ifProp("light", "#272727", "#1C1C1C")};
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  padding: 11px 35px 11px 10px;
  border: none;
  width: ${prop("width","100%")};
  color: white;

  ::-webkit-input-placeholder {
    color: ${theme('input.placeholder', '#616161')};
  }

  ::-moz-placeholder {
    color: ${theme('input.placeholder', '#616161')};
  }

  :-ms-input-placeholder {
    color: ${theme('input.placeholder', '#616161')};
  }

  :-moz-placeholder {
    color: ${theme('input.placeholder', '#616161')};
  }
`;

const Asterisk = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export {
    Input,
    Wrapper,
    Asterisk
}