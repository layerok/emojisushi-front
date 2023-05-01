import styled from "styled-components";

const Form = styled.form`
  width: 350px;
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

export { Form, ErrorBag };
