import styled from "styled-components";


const Wrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  background: #272727;
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  padding: 11px 35px 11px 10px;
  border: none;
  width: 100%;
  color: white;
`
const Eye = styled.div`
  position: absolute;
  top: 10px;
  left: 245px;  
  cursor: pointer;
`;


export {
    Wrapper,
    Input,
    Eye,
}
