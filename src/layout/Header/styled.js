import styled from "styled-components";
import {Container as ContainerBase} from "../../components/Container";
import {Link as LinkBase} from "react-router-dom";

const Header = styled.header`
  background: #171717;
  box-shadow: 0 4px 15px rgba(23, 23, 23, 0.4);
  height: 91px;
  display: flex;
  align-items: center;
`

const Container = styled(ContainerBase)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = styled(LinkBase)`
  margin-right: 95px;
`;

const Left = styled.div`
  display: flex;
`;

export {
    Header,
    Container,
    Left,
    Link
}