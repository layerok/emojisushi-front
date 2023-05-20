import styled from "styled-components";
import { media } from "~common/custom-media";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  ${media.lessThan("tablet")`
    flex-direction: column;
  `}
`;
