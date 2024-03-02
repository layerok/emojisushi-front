import styled from "styled-components";
import { theme } from "styled-tools";
import media from "~common/custom-media";
import { Link as BaseLink } from "react-router-dom";

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

const Spot = {
  Inner: styled.li`
    display: flex;
    flex-direction: column;

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    position: relative;
    color: #ffffff;
    text-decoration: none;
    position: relative;
  `,
  Content: styled.div`
    background: #1c1c1c;
    border: 1px solid #1c1c1c;
    border-radius: 10px;

    transition: 0.3s ease-out;

    padding: 10px;

    display: flex;
    flex-direction: column;

    position: relative;
    z-index: 2;
    &:hover {
      z-index: 4;
      border-color: ${theme("colors.brand")};
    }
  `,
  Head: styled.div`
    display: inline-flex;
    align-items: center;

    margin-bottom: 10px;

    gap: 5px;

    font-weight: 400;
    font-size: 13px;
    line-height: 16px;

    color: ${theme("colors.brand")};
  `,
  Link: styled(BaseLink)`
    text-decoration: none;
  `,
};

export { Spot };
