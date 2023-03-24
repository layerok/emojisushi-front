import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`;

const FilterMagnifier = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  padding-top: 20px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.div`
  margin-top: 15px;
  font-size: 15px;
  line-height: 18px;

  ${ifProp(
    "selected",
    css`
      font-weight: 500;
      color: #ffe600;
    `
  )}
  cursor: pointer
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 18px;
  padding-top: 30px;
`;

export { Wrapper, Text, FilterMagnifier, CheckboxWrapper, Content, Item };
