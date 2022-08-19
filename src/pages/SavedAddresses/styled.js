import styled from "styled-components";

const Heading = styled.p`
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;

  color: #FFFFFF;

`

const AddressWrapper = styled.div`
    margin-top: 20px;
  display: flex;
  :first-child {
      margin-top: 30px;
    }
`
const ButtonWrapper = styled.div`
  margin-top: 30px;
`

export {
    Heading,
    AddressWrapper,
    ButtonWrapper,
}