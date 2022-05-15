import styled from "styled-components";
import {prop} from "styled-tools";

const Button = styled.button`
  border: 1px solid #FFE600;
  border-radius: 10px;
  color:  #FFE600; 
  padding: 7px 31px;
  width: ${prop("width", "130px")};
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFE600;
`;

export {
    Button
}