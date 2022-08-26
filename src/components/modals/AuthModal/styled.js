import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  
  padding: 20px
`

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 20px;
`

const InputLabel = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding-bottom: 5px;
  color: #616161;
`

const InputWrapper = styled.div`
  width: 275px;
  margin-top: 20px;
  position: relative;
  :first-child{
    margin-top: 0;
  }
`


const NavigateButton = styled.button`
  font-size: 12px;
  color: #72BBFF;
  display: block;
  cursor: pointer ;
`


const LoginForm = styled.form`
  user-select: none;
`

const VerticalBar = styled.div`
  border: 1px solid #2D2D2D;
  margin-left: 42px;
  margin-right: 42px;
`

const SignUpForm = styled.form`
  user-select: none;
`

const Error = styled.p` 
  font-size: 10px;
  line-height: 12px;
  margin-top: 5px;
  color: #CD3838;
  user-select: none;
  position: absolute;
  right: 0;
`

const CheckboxWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 24px;
`

const ForgotPassText = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #FFFFFF;
  
  margin-bottom: 20px;
  margin-top: 10px;
`

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`



export {
    Title,
    Wrapper,
    InputLabel,
    InputWrapper,
    NavigateButton,
    LoginForm,
    SignUpForm,
    VerticalBar,
    Error,
    CheckboxWrapper,
    ForgotPassText,
    BtnGroup,
}