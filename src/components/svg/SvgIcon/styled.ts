import styled, { css } from "styled-components";
import { ifProp, prop } from "styled-tools";

const Parent = styled.span`
  display: flex;
  svg {
    height: auto;
    width: 100%;
  }

  ${ifProp(
    "hoverColor",
    css`
      :hover {
        color: ${prop("hoverColor")};
      }
    `
  )}

  ${ifProp(
    "noDomColor",
    css`
      color: ${prop("noDomColor")};
    `
  )}
`;

export { Parent };
