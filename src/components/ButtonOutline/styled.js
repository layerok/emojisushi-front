import styled from "styled-components";

const Button = styled.button`
  border: 1px solid #FFE600;
  border-radius: 10px;
  color:  #FFE600; 
  padding: 7px 31px;
  min-width: 130px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background: #FFE600;
    box-shadow: 0px 4px 15px rgba(255, 230, 0, 0.3);
    color: black;
  }
  
`;

export {
    Button
}