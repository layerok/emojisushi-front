import styled from "styled-components";

const Wrapper = styled.div`
  width: 130px;
  height: 40px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 24px;
  background: #FFE600;
  border-radius: 10px;
  
`;
const Count = styled.div`
  width: 38px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #F1DA00;
  border-right: 1px solid #F1DA00;
  margin: 0 15px;
`

export {
    Wrapper,
    Count
}