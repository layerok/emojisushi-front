import styled from "styled-components";
import {theme} from "styled-tools";

const Input = styled.input`
  background: #1C1C1C;
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  padding: 11px 35px 11px 10px;
  border: none;
  width: 100%;
  color: white;

  ::-webkit-input-placeholder {
    color: ${theme('input.placeholder', '#3F3F3F')};
  }

  ::-moz-placeholder {
    color: ${theme('input.placeholder', '#3F3F3F')};
  }

  :-ms-input-placeholder {
    color: ${theme('input.placeholder', '#3F3F3F')};
  }

  :-moz-placeholder {
    color: ${theme('input.placeholder', '#3F3F3F')};
  }
`;

export {
    Input
}