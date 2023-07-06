import styled from "styled-components";

const Container = styled.div`
  width: 350px;
`;

const Form = styled.form`
  width: 100%;
`;

const ErrorBag = styled.ol`
  background: #cd3838;
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  padding: 12px 12px 12px 28px;

  li {
    margin-top: 8px;

    :first-child {
      margin-top: 0px;
    }
  }
`;

const Control = styled.div`
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  color: rgb(255, 230, 0);
  font-size: 10px;
  right: 0;
  top: calc(100% + 2px);
  position: absolute;
  cursor: pointer;
`;

const Total = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
`;

const Login = styled.div`
  color: #ffe600;
  margin-left: 5px;
`;

export {
  Form,
  ErrorBag,
  Container,
  ButtonContainer,
  Button,
  Control,
  Total,
  Login,
};
