import styled from "styled-components";

const Container = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
`;

const Icon = styled.div`
  margin-right: 10px;
`;

const Label = styled.div`
  margin-right: 5px;`

const CaretDown = styled.div``;

const Options = styled.div`
  padding: 11px 25px 19px;
  max-width: 211px;
  width: 100%;
  background: #171717;
  border-radius: 0 0 15px 15px; 
`;

const Option = styled.div`
  margin-bottom: 15px;
`;


export {
    Container,
    Icon,
    Label,
    CaretDown,
    Options,
    Option
}