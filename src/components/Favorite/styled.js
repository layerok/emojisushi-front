import styled from "styled-components";
import media from "../../common/custom-media";

const Wrapper = styled.div`
  background: rgba(20, 20, 20, 0.3);
  width: 35px;
  height: 35px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  ${media.lessThan('tablet')`
    width: 47px;
    height: 47px;
  `}
  
`;

export {
    Wrapper
}
