import styled, {css} from "styled-components";
import {prop, ifProp} from "styled-tools";

const Button = styled.button`
  border: 1px solid #FFE600;
  border-radius: 10px;
  color:  #FFE600; 
  padding: ${prop('padding', '7px 31px')};
  width: ${prop("width", "130px")};
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: ${prop('justifyContent', 'center')};
  align-items: center;

  ${ifProp('filled', css`
    background: #FFE600;
    color: black;
    box-shadow: 0px 4px 15px rgba(255, 230, 0, 0.3);
  `)}

  :hover {
    background: #FFE600;
    box-shadow: 0px 4px 15px rgba(255, 230, 0, 0.3);
    color: black;
  }
  
`;

export {
    Button
}