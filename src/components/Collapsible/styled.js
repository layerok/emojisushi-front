import styled from "styled-components";

const Collapsible = styled.div`
  
`

const OrderContainer = styled.p`
  margin-top: 20px;
  background: #1C1C1C;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  width: 730px;
  height: 315px;
`

const SmallText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #616161;
`

const OrderInfoText = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #FFFFFF;  
`

const OrderStatus = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #FFE600;

`

const OrderClosed = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 0 15px;
  cursor: pointer;
`
const OrderOpen = styled.div`
  padding: 15px 15px 0 15px;
`

const HorizontalBar = styled.div`
  border: 1px solid #2D2D2D;
  width: 700px;
  margin-left: 15px;
  margin-top: 10px;
`

const OrderInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Wrapper = styled.div`
  margin-right: 60px;
`

const OrderOpenStatus = styled.div`
  display: flex;  
  margin-right: 149px;
`

const Completed = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #FFE600;

`

const VerticalBar = styled.div`
  border: 1px solid #2D2D2D;
  height: 74px;
  width: 0;
  margin-right: 15px;
`

const Order = styled.div`
  display: flex;
  margin-left: 15px;
  margin-top: 10px;
`

const OrderText = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #FFFFFF;
`

const OrderImg = styled.img`
  width: 80px;
  height: 52px;
  border: none;
`



const ProductDescription = styled.div`
  display: flex;
  margin-top: 10px;
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`

const VerticalStick = styled.div`
  border: 1px solid #FFFFFF;
  height: 13px;
  margin-left: 10px;
  margin-right: 10px;
`

const ProductPrice = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #FFFFFF;
`

const ProductPriceWrapper = styled.div`
  display: flex;
`

const ProductAmount = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #616161;

`

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export {
    OrderContainer,
    SmallText,
    OrderInfoText,
    OrderStatus,
    OrderClosed,
    OrderOpen,
    HorizontalBar,
    Wrapper,
    OrderInfoWrapper,
    OrderOpenStatus,
    Completed,
    VerticalBar,
    Order,
    OrderText,
    OrderImg,
    ProductDescription,
    ProductWrapper,
    VerticalStick,
    ProductPrice,
    ProductAmount,
    ProductPriceWrapper,
    ProductContainer,
    Collapsible,
}