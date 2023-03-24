import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-wrap: wrap;
  padding-left: 18px;
  padding-top: 30px;
`;

export { Wrapper, Text, FilterMagnifier, CheckboxWrapper };
