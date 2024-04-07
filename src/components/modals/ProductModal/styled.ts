import styled from "styled-components";
import media from "~common/custom-media";

const Wrapper = styled.div`
  padding: 40px;
  width: 620px;
  background: ${({ theme }) => theme.colors.canvas.inset2};
  box-shadow: ${({ theme }) => theme.shadows.canvasInset2Shadow};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  ${media.lessThan("tablet")`
    width: 100%;
    height: 100%;
    border-radius: 0;
  `}
`;

const TopWrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 160px;
  height: 160px;
`;

const ImageWrapper = styled.div`
  width: 160px;
  height: 160px;
`;

const BotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 30px;
  position: relative;
  bottom: 0;
`;

const ProductName = styled.p`
  font-size: 22px;
  font-weight: 600;
  line-height: 27px;
  text-align: left;
`;
const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
`;

const DescriptionWrapper = styled.div`
  padding-left: 30px;
`;

const RemoveButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #262626;
  border-radius: 10px;
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #ffe600;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Counter = styled.div`
  font-size: 22px;
  font-weight: 500;
  line-height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding-left: 5px;
  padding-right: 5px;
`;

const CartButton = styled.button`
  height: 50px;
  background-color: #ffe600;
  color: black;
  border-radius: 10px;
  margin-top: 20px;

  font-size: 15px;
  font-weight: 600;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  position: absolute;
  top: 40px;
  right: 0;
`;

export {
  Wrapper,
  TopWrapper,
  BotWrapper,
  Image,
  ProductName,
  Description,
  DescriptionWrapper,
  ImageWrapper,
  RemoveButton,
  AddButton,
  ButtonWrapper,
  Counter,
  CartButton,
  ProductPrice,
};
