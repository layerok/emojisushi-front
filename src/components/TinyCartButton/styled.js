import styled from "styled-components";

const TinyCartButton = styled.div`
  cursor: pointer;
  position: relative;
  margin-top: 20px;
`;

const Icon = styled.div`
  position: absolute;
  z-index: 1;
  top: -20px;
  transform-origin: center;
  transform: translateX(-50%);
  left: 50%;
`;

const Price = styled.div`
  position:relative;
  background-color: #FFE600;
  color: black;
  padding: 1px 8px;
  border-radius: 3px;
  z-index: 2;
`

export {
    TinyCartButton,
    Price,
    Icon
}