import styled from "styled-components";

const Wrapper = styled.div`
  width: 540px;
  height: 250px;
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`;

const FilterMagnifier = styled.div`
  display: flex;
  padding-left: 10px;
  padding-top: 11px;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  margin-top: 65px;
  display: flex;
  flex-direction: row;
`

export {
    Wrapper,
    Text,
    FilterMagnifier,
    CheckboxWrapper
}