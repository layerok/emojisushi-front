import styled from "styled-components";

const Container = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  width: 217px;
  text-align: left;
`;

const Icon = styled.div`
  margin-right: 10px;
  flex-shrink: 0;
`;

const Label = styled.span`
  margin-right: 5px;
  height: 40px;
  display: flex;
  align-items: center;
`


const CaretDown = styled.div`
  flex-shrink: 0;
`;

const Options = styled.div`
  padding: 11px 25px 19px;
  max-width: 211px;
  width: 100%;
  background: #171717;
  border-radius: 0 0 15px 15px;
  
`;

const Option = styled.div`
  margin-bottom: 15px;
  cursor: pointer;
`;


export {
    Container,
    Icon,
    Label,
    CaretDown,
    Options,
    Option
}