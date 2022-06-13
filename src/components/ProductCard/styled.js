import styled from "styled-components";
import {prop} from "styled-tools";
import media from "../../common/custom-media";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 255px;
  border-radius: 15px;
  background-color: #1C1C1C;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  padding: 22px 12px 18px;
  
  ${media.lessThan('tablet')`
    width: 100%;
    padding: 37px 16px 26px;
  `}
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("${prop("src")}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 190px;
  height: 170px;
  margin: 0 auto;

  ${media.lessThan('tablet')`
    width: 260px;
    height: 167px;
  `}
`;

const Name = styled.div`
  margin-top: 30px;
  
  ${media.lessThan('tablet')`
    font-size: 18px;
    margin-top: 35px;
  `}
`;

const Description = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.lessThan('tablet')`
    margin-top: 36px;
  `}

`;

const Weight = styled.div`
  font-size: 13px;
  ${media.lessThan('tablet')`
    font-size: 15px;
  `}
`;

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.lessThan('tablet')`
    margin-top: 28px;
  `}
`;

const Favorite = styled.div`
  position: absolute;
  top: 22px;
  right: 12px;
  
  ${media.lessThan('tablet')`
    top: 30px;
    right: 17px;
  `}

`


export {
    Wrapper,
    Image,
    Name,
    Description,
    Weight,
    Footer,
    Favorite
}