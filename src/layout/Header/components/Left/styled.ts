import styled from "styled-components";
import media from "~common/custom-media";

const Left = styled.div`
  display: flex;
`;

const PcHeaderItem = styled.div`
  margin-right: 60px;
  display: flex;
  align-items: center;

  ${media.lessThan("pc")`
        display: none;
    `}
`;

export { Left, PcHeaderItem };
