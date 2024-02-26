import styled, { css } from "styled-components";
import { ifProp, prop } from "styled-tools";
import { CSSProperties } from "react";
import { Placement } from "@floating-ui/react";

const Dropdown = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const Reference = styled.div<{
  width: CSSProperties["width"];
  open: boolean;
  placement: Placement;
}>`
  position: relative;
  display: flex;
  width: ${prop("width")};
  align-items: center;
  background-color: #1c1c1c;
  height: 40px;
  padding-left: 15px;
  padding-right: 30px;
  border-radius: ${ifProp(
    "open",
    ifProp({ placement: "bottom" }, "10px 10px 0 0", "0 0 10px 10px"),
    "10px"
  )};
  color: white;
`;

const Content = styled.div<{
  width: CSSProperties["width"];
  open: boolean;
  placement: Placement;
}>`
  background-color: #1c1c1c;
  width: ${prop("width")};
  ${ifProp(
    {
      placement: "bottom",
    },
    css`
      border-top: ${ifProp("open", "1px solid #2D2D2D", "none")};
      border-radius: 0 0 10px 10px;
    `,
    css`
      border-bottom: ${ifProp("open", "1px solid #2D2D2D", "none")};
      border-radius: 10px 10px 0 0;
    `
  )};
`;

export { Reference, Dropdown, Content };
