import styled from "styled-components";
import { prop } from "styled-tools";

const Options = styled.div`
  padding: 11px 25px 19px;
  width: ${prop("width")};
  background-color: ${prop("backgroundColor")};
  border-radius: 0 0 15px 15px;
`;

const Option = styled.div`
  margin-bottom: 15px;
  cursor: pointer;
`;

export { Options, Option };
