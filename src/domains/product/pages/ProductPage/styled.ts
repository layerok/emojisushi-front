import styled from "styled-components";
import media from "~common/custom-media";

const Footer = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: center;
`;

const BannerContainer = styled.div`
  margin-bottom: 0;
  margin-top: 50px;
  ${media.lessThan("tablet")`
    margin-top: 27px;
    margin-bottom: 27px;
  `}
`;

export { Footer, BannerContainer };
