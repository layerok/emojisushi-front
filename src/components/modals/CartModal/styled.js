import styled from "styled-components";
import {prop} from "styled-tools";
import media from "../../../common/custom-media";

const Wrapper = styled.div`
  position: relative;
  width: 420px;
  background: #1C1C1C;
  box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px 0 0 15px;
  
  ${media.lessThan('tablet')`
    border-radius: 15px 15px 0 0;
    width: 375px;
  `}

  padding: 40px 20px 31px 20px;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  padding-right: 20px
`

const CloseIcon = styled.div`
  position: absolute;
  left: -45px;
  top: 33px;
  cursor: pointer;

  ${media.lessThan('tablet')`
    right: 20px;
    left: auto;
  `}
`;

const Items = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  position: relative;
  display: flex;
  padding-bottom: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #4A4A4A;
  
  &:first-child {
    margin-top: 0;
  }
`;

Item.Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 64px;
  background-image: url("${prop("src")}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
`;

Item.Info = styled.div`
  margin-left: 10px;
  width: 100%;
  padding-right: 20px;
  
`;

Item.Name = styled.div`
  font-size: 15px;
  line-height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 220px;
  
  ${media.lessThan('tablet')`
    width: 186px;
  `}
`;

Item.Counter = styled.div`
  margin-left: 20px;
  margin-top: 21px;
`;

Item.RemoveIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 0;
`

const Footer = styled.div`
    margin-top: 30px;
  padding-right: 20px
`;

const Sum = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`;

const Button = styled.div`
  margin-top: 37px;
`;

export {
    Wrapper,
    Title,
    CloseIcon,
    Items,
    Item,
    Footer,
    Sum,
    Button
}