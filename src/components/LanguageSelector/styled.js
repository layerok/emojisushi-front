import styled from "styled-components";

const Selector = styled.div`
  background: #141414;
  border-radius: 10px;
  width: 75px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`


const ItemLabel = styled.label`
  color: #B6B6B6;
  font-weight: 400; 
  
`

const Item = styled.input`
  display: none;
  :checked{
    + ${ItemLabel} {
      color: #FFFFFF;
      font-weight: 500;
    }
  }
`

export {
    ItemLabel,
    Selector,
    Item,
}