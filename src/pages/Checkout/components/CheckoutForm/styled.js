import styled from "styled-components";

const Form = styled.form`
width: 350px;
`;

const Control = styled.div`
  margin-top: 20px;
`;

const Total = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
`;

const ErrorBag = styled.div`
  background: #CD3838;
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  padding: 12px 66px;
  text-align: center;
`;

export {
    Form,
    Control,
    ErrorBag,
    Total
}