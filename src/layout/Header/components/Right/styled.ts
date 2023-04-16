import styled from "styled-components";
import media from "~common/custom-media";

const Right = styled.div`
  display: flex;
  align-items: center;
`;

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
  cursor: pointer;
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
`;

export {
  Right,
  BurgerBtn,
  CartBtn,
  TinyCartBtn,
  UserBtn,
  LanguageSelectorContainer,
};
