import styled from "styled-components";
import media from "~common/custom-media";

const Wrapper = styled.div`
  position: absolute;
  top: 22px;
  right: 12px;
  z-index: 1;

  background: rgba(20, 20, 20, 0.7);
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 35px;
  height: 35px;

  ${media.lessThan("tablet")`
    top: 30px;
    right: 17px;
    width: 47px;
    height: 47px;
  `}
`;

const IconWrapper = styled.div`
  width: 25px;
  ${media.lessThan("tablet")`
    width: 33px;
  `}
`;

export { IconWrapper, Wrapper };
