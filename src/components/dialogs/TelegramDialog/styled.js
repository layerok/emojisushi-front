import styled from "styled-components";
import media from "../../../common/custom-media";

const Container = styled.div`
  background: #1C1C1C;
  box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  width: 540px;
  padding: 50px 101px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  ${media.lessThan('pc')`
    width: 350px;
    padding: 50px 20px;
  `}
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-top: 15px;
`;

const Subtitle = styled.div`
  margin-top: 8px;
  text-align: center;
`;

const Button = styled.div`
    margin-top: 20px;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: -35px;
  cursor: pointer;
  
  ${media.lessThan('pc')`
    right: 10px;
    top: 10px;
  `}
`;

export {
    Container,
    Title,
    Subtitle,
    Button,
    CloseIcon
}