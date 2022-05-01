import styled from "styled-components";

import {Link as LinkBase} from "react-router-dom";

const Header = styled.header`
  background: #171717;
  box-shadow: 0 4px 15px rgba(23, 23, 23, 0.4);
  height: 91px;
  display: flex;
  align-items: center;
`

const Link = styled(LinkBase)`
  margin-right: 95px;
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
`;

const HeaderItem = styled.div`
  margin-right: 60px;
  display:flex;
  align-items: center;
`

export {
    Header,
    Left,
    Right,
    Link,
    HeaderItem
}