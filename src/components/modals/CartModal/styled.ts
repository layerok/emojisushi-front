import styled from "styled-components";
import { prop } from "styled-tools";
import media from "~common/custom-media";

const Wrapper = styled.div`
  position: relative;
  width: 420px;
  background: #1c1c1c;
  box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 0 0 0 15px;

  ${media.greaterThan("tablet")`
    min-height: 500px;
  `}

  ${media.lessThan("tablet")`
    border-radius: 0px;
    width: 100%;
    height: 100%;
  `}

  ${media.lessThan("tablet")`
    padding: 72px 20px 31px 20px;
  `}

  padding: 31px 20px 31px 20px;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
`;

const CloseIcon = styled.div`
  position: absolute;
  left: -45px;
  top: 31px;
  cursor: pointer;

  ${media.lessThan("tablet")`
    top: 20px;
    right: 20px;
    left: auto;
    
  `}
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  position: relative;
  display: flex;
  padding-bottom: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #4a4a4a;

  &:first-child {
    margin-top: 0;
  }
`;

const ItemImg = styled.div<{
  src: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-image: url("${prop("src")}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  margin-left: 10px;
  width: 100%;
`;

const ItemName = styled.div`
  font-size: 15px;
  line-height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 220px;

  ${media.lessThan("tablet")`
    width: 186px;
  `}
`;

const ItemCounter = styled.div`
  margin-left: 20px;
  margin-top: 21px;
`;

const ItemRemoveIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const Footer = styled.div`
  margin-top: 30px;
`;

const Sum = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`;

const Button = styled.div`
  margin-top: 37px;
`;

const EmptyCartImgContainer = styled.div`
  position: absolute;
  inset: 0;
  top: 50%;
  transform-origin: center;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export {
  Wrapper,
  Title,
  CloseIcon,
  Items,
  Item,
  ItemImg,
  ItemName,
  ItemRemoveIcon,
  ItemInfo,
  ItemCounter,
  Footer,
  Sum,
  Button,
  EmptyCartImgContainer,
};
