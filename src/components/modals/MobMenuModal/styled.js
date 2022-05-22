import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #1C1C1C;
  padding: 27px 23px;
  width: 267px;
  box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px 0 0 15px;
  margin-top: 30px;
`;

const Item = styled.div`
  margin-top: 15px;
  :first-child {
    margin-top: 0;
  }
`;

export {
    Wrapper,
    Item
}