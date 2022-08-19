import styled from "styled-components";

const Heading = styled.p`
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;

  color: #FFFFFF;

`

const Order = styled.p`
  margin-top: 20px;
  background: #1C1C1C;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  width: 730px;
  height: 315px;
`

const OrderText = styled.p`
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
  padding: 15px;
`
const OrderOpen = styled.div`
  padding: 15px;
`

const HorizontalBar = styled.div`
  border: 1px solid #2D2D2D;
  width: 700px;
  margin-left: 15px;
`

const OrderInfoWrapper = styled.div`
  display: flex;
  
`

const Wrapper = styled.div`
  
`

const OrderOpenStatus = styled.div`
  display: flex;
  margin-right: 150px;
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


export {
    Heading,
    Order,
    OrderText,
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

}
