import styled from "styled-components";
import media from "~common/custom-media";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #141414;
  z-index: 99999999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 350px;
  ${media.greaterThan("mobile")`
    width: 540px;
  `}
`;

export { Container, ImageWrapper };
