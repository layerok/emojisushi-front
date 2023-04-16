import styled from "styled-components";
import media from "~common/custom-media";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 255px;
  border-radius: 15px;
  background-color: #1c1c1c;
  box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);
  padding: 22px 12px 18px;

  ${media.lessThan("tablet")`
    width: 100%;
    padding: 37px 16px 26px;
  `}
`;

const Description = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.lessThan("tablet")`
    margin-top: 36px;
  `}
`;

export { Wrapper, Description };
