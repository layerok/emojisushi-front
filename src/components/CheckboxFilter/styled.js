import styled from "styled-components";


const Wrapper = styled.div`
  width: 110px;
`;

const Label = styled.label`
  width: 100%;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 33px 11px 33px;
  cursor: pointer;
  user-select: none;
`;

const CheckBoxWrapper = styled.div`
  text-align: center;
  border: 1px solid #393939;
  border-radius: 10px;
  margin-right: 10px;
  margin-right: 10px;
  background: #1C1C1C;
  overflow: hidden;
`;

const CheckBox = styled.input`
  display: none;
  :checked {
    ~ ${Label} {
      background: #393939;
      border-radius: 10px;
    }
  }
`;


export {
    CheckBox,
    Label,
    Wrapper,
    CheckBoxWrapper,
}