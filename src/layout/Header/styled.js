import styled from "styled-components";

import {Link as LinkBase} from "react-router-dom";
import media from "../../common/custom-media";

const Header = styled.header`
  background: #171717;
  box-shadow: 0 4px 15px rgba(23, 23, 23, 0.4);
  height: 91px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
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

const CartBtn = styled.div`
  ${media.lessThan("tablet")`
    display: none;
  `}
`;

const TinyCartBtn = styled.div`
  flex-shrink: 0;
  ${media.greaterThan("tablet")`
    display: none;
  `}
`;

const BurgerBtn = styled.button`
  margin-left: 30px;
  ${media.greaterThan("pc")`
    display: none;
  `}
`;

const UserBtn = styled.div`
  margin-left: 20px;
  ${media.lessThan("pc")`
    display: none;
  `}
`;

const LanguageSelectorContainer = styled.div`
  margin-right: 20px;
  ${media.lessThan("pc")`
    margin-right: 30px;
  `}
  ${media.lessThan("tablet")`
    display: none;
  `}
`

export {
    Header,
    Left,
    Right,
    Link,
    PcHeaderItem,
    BurgerBtn,
    CartBtn,
    TinyCartBtn,
    UserBtn,
    LanguageSelectorContainer,

}