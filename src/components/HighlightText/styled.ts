import styled from "styled-components";
import { ifProp, theme } from "styled-tools";

const Container = styled.div<{
  isActive: boolean;
}>`
  position: relative;
  display: inline-block;

  :hover {
    :after {
      opacity: 1;
    }
  }

  :after {
    content: "";
    opacity: ${ifProp("isActive", 1, 0)};
    position: absolute;
    width: 100%;
    left: 0;
    border-bottom: 1px solid ${theme("colors.brand")};
    box-shadow: 0 0 15px ${theme("colors.brandSofter")};
    margin-top: 10px;
    bottom: -10px;
  }
`;

export { Container };
