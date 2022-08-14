import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  
  padding: 20px
`

const Text = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
  margin-bottom: 20px;
`

const InputText = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding-bottom: 5px;
  color: #616161;
`

const InputWrapper = styled.div`
  width: 275px;
  height: 63px;
  margin-top: 20px;
  :first-child{
    margin-top: 0;
  }
`


const ForgotPass = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #72BBFF;
  padding-top: 10px;
  padding-left: 10px;
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
  display: flex;
  justify-content: flex-end;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  margin-top: 5px;
  color: #CD3838;
  user-select: none;
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
`

const BtnWrapper = styled.div`
  margin-top: 20px;
`

export {
    Text,
    Wrapper,
    InputText,
    InputWrapper,
    ForgotPass,
    LoginForm,
    SignUpForm,
    VerticalBar,
    Error,
    CheckboxWrapper,
    ForgotPassText,
    BtnGroup,
    BtnWrapper,
}