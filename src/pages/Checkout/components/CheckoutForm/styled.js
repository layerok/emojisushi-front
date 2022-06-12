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

const ErrorBag = styled.ul`
  background: #CD3838;
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  padding: 12px;
  
  li {
    margin-top: 8px;
    :first-child {
      margin-top: 0px;
    }
  }
`;

export {
    Form,
    Control,
    ErrorBag,
    Total
}