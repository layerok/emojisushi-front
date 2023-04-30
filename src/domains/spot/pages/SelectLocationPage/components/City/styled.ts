import styled from "styled-components";
import { theme } from "styled-tools";
import media from "~common/custom-media";

const Cities = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const City = styled.li`
  display: flex;
  flex-direction: column;
  gap: 15px;

  > span {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;

    text-transform: uppercase;

    color: #ffffff;
  }
`;

const Spots = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  ${media.lessThan("mobile")`
         flex-direction:column; 
         gap: 15px;
         `}

  & > * {
    width: calc(100% / 2 - 15px);

    ${media.lessThan("mobile")`
             width: 100%;
         `}
  }
`;

export { Cities, City, Spots };
