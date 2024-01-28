import styled, { css } from "styled-components";
import media from "../../../common/custom-media";
import { ifProp, prop } from "styled-tools";
import { CSSProperties } from "react";

const Container = styled.div<{
  width?: CSSProperties["width"];
  alignCenter?: boolean;
}>`
  background: #1c1c1c;
  box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  width: ${ifProp("width", prop("width"), "540px")};

  ${ifProp(
    "alignCenter",
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `
  )}
  position: relative;
  ${media.lessThan("pc")`
    width: ${ifProp("width", prop("width"), "350px")};
  `}
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: -35px;
  cursor: pointer;

  ${media.lessThan("pc")`
    right: 10px;
    top: 10px;
  `}
`;

export { Container, CloseIcon };
