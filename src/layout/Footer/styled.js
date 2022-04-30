import styled from "styled-components";

const Footer = styled.footer`
  width: 100%;
  background-color: #171717;
  height: 239px;
  
  & > div {
    height: 100%;
    display: flex;
  }
`;


const Left = styled.div`
  display: flex;
  align-items: center;
`;


const Right = styled.div`

`;

const Logo = styled.div`
width: 160px;
  margin-right: 220px;
`;

const List = styled.ul`

`;

export {
    Footer,
    Left,
    Right,
    Logo,
    List
}