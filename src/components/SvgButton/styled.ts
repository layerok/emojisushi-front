import styled from "styled-components";
import { theme } from "styled-tools";

const Box = styled.div`
  background-color: ${theme("colors.brand")};
  box-shadow: 0 0 15px ${theme("shadows.brand")};
  border-radius: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { Box };
