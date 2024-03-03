import styled from "styled-components";
import { media } from "~common/custom-media";

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  width: 350px;
  ${media.greaterThan("tablet")`
    width: 675px;
  `}
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 20px;
`;

const InputLabel = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding-bottom: 5px;
  color: ${({ theme }) => theme.colors.fg.muted};
`;

const InputWrapper = styled.div`
  width: 275px;
  margin-top: 20px;
  position: relative;
  :first-child {
    margin-top: 0;
  }
`;

const BaseButton = styled.button`
  font-size: 12px;
  color: #72bbff;
  display: block;
  cursor: pointer;
`;

const ResetPasswordButton = styled(BaseButton)``;

const AuthButton = styled(BaseButton)`
  ${media.greaterThan("tablet")`
    display: none;
  `}
`;

const LoginForm = styled.form`
  user-select: none;
`;

const VerticalBar = styled.div`
  border: 1px solid #2d2d2d;
  margin-left: 42px;
  margin-right: 42px;
  ${media.lessThan("tablet")`
    display: none;
  `}
`;

const SignUpForm = styled.form`
  user-select: none;
`;

const CheckboxWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 24px;
`;

const ForgotPassText = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.fg.default};

  margin-bottom: 20px;
  margin-top: 10px;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export {
  Title,
  Wrapper,
  InputLabel,
  InputWrapper,
  AuthButton,
  ResetPasswordButton,
  LoginForm,
  SignUpForm,
  VerticalBar,
  CheckboxWrapper,
  ForgotPassText,
  BtnGroup,
};
