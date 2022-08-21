import styled from "styled-components";


const Container = styled.p`
  padding: 15px;
  background: #1C1C1C;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  width: 730px;
  
`

const MutedText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #616161;
`

const MutedTextWrapper = styled.div`
  width: 201px;
  :first-child {
    padding-bottom: 10px;
  }
`

const OrderValue = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;  
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

Header.Status = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #FFE600;

`

const Panel = styled.div`
  
`

Panel.Properties = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #2D2D2D;
  border-bottom: 1px solid #2D2D2D;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
`

Panel.Properties.ExceptStatus = styled.div`
  
`
Panel.Properties.Property = styled.div`
  display: flex;
  
`

const Wrapper = styled.div`
  margin-right: 60px;
`

Panel.Status = styled.div`
  display: flex;  
  margin-right: 149px;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #2D2D2D;
  padding-left: 15px;
`

Panel.Status.Value = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #FFE600;

`



Panel.Status.Label = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #FFFFFF;
`



const Order = styled.div`
  display: flex;
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
`



const ProductDescription = styled.div`
  display: flex;
  margin-top: 10px;
  width: 350px;
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
  
  width: 100%;
`

export {
    Container,
    MutedText,
    OrderValue,
    Header,
    Wrapper,
    Panel,
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
    MutedTextWrapper,

}