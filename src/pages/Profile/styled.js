import styled from "styled-components";

const BtnWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: 15px;
`

const BtnMargin = styled.div`
  margin-left: 20px;
`

const Heading = styled.p`
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: #FFFFFF;

`

const NavWrapper = styled.div`
  width: 634px;
  height: 230px;

  background: #1C1C1C;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  margin-top: 20px
`

const Left = styled.div`
  padding-left: 15px;
  padding-top: 15px
  
`


const NavText = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #616161;
  margin-top: 10px;
  :first-child {
    margin-top: 0;
  }
`

const TextWrapper = styled.div`
  display: flex;
  
`

const Right = styled.div`
  padding: 15px;
  margin-left: 114px; 
`

const PersonalData = styled.p`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;
  margin-top: 10px;
  :first-child {
    margin-top: 0;
  }
`

const BotMenu = styled.div`
  margin-top: 30px;
`

const BirthHeading = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;
`

const BirthText = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #616161;
`

const DropDownsWrapper = styled.div`
  display: flex;
  
`

const BirthWrapper = styled.div`
  margin-left: 35px;
  margin-top: 20px;
  :first-child{
    margin-left: 0;
  }
`

const SexWrapper = styled.div`
  margin-top: 20px;
`

const HorizontalBar = styled.div`
  border: 1px solid #2D2D2D;
  width: 730px;
  margin-top: 30px;
  margin-bottom: 30px;
`

export {
    Heading,
    NavWrapper,
    NavText,
    PersonalData,
    Left,
    Right,
    TextWrapper,
    BtnWrapper,
    BotMenu,
    BirthHeading,
    BirthText,
    BtnMargin,
    DropDownsWrapper,
    BirthWrapper,
    SexWrapper,
    HorizontalBar,

}