import styled from "styled-components";

const LabelCheck = styled.label`
  display: flex;
  user-select: none;
  cursor: pointer;
  position: relative;
`;

const LabelCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #272727;
  width: 23px;
  height: 23px;
  flex-shrink: 0;
  position: relative;
  user-select: none;
  border-radius: 5px;
`;

const Checkbox = styled.input`
  position: absolute;
  left: -99999999px;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
  margin-left: 10px;
`;

const Error = styled.div`
  font-size: 10px;
  line-height: 12px;
  padding: 2px 5px;
  background-color: #cd3838;
  color: white;
  user-select: none;
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 3;
`;

export { Checkbox, LabelCheck, Text, LabelCheckbox, Error };
