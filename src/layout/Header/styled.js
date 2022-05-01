import styled from "styled-components";

import {Link as LinkBase} from "react-router-dom";
import media from "../../common/custom-media";

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
    display: flex;
    align-items: center;
`;

const PcHeaderItem = styled.div`
  margin-right: 60px;
  display:flex;
  align-items: center;
  
  ${media.lessThan("pc")`
        display: none;
    `
  }
`

const BurgerBtn = styled.button`
  margin-left: 30px;
`;

export {
    Header,
    Left,
    Right,
    Link,
    PcHeaderItem,
    BurgerBtn
}