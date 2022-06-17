import styled from "styled-components";
import {prop} from "styled-tools";

const Slide = styled.div`
  padding: 0 4px;
  position: absolute;
  width: calc(100% / ${prop('length')});
  height: 100%;
  background: #FFE600;
  box-shadow: 0 0 15px rgba(255, 230, 0, 0.3);
  border-radius: 10px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s ease-out;
  user-select: none;
`;
const Wrapper = styled.div`
  position: relative;
  background: #1C1C1C;
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  height: 40px;
  display: flex;
`;

const Label = styled.label`
  padding: 0 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const Input = styled.input`
  position: relative;
  display: none;
  :checked {
    ~ ${Slide} {
      left: calc((100% / ${prop("length")}) * ${(props) => prop("index")(props)});
    }
  }

`;

export {
    Slide,
    Wrapper,
    Label,
    Input
}