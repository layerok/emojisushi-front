import styled from "styled-components";
import media from "~common/custom-media";

const Container = styled.div`
  display: flex;
  flex-direction: row;

  ${media.lessThan("pc")`
    flex-direction: column;
  `}
`;

export { Container };
