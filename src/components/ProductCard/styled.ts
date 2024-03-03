import styled from "styled-components";
import media from "~common/custom-media";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 255px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: ${({ theme }) => theme.colors.canvas.inset2};
  box-shadow: ${({ theme }) => theme.shadows.canvasInset2Shadow};
  padding: 22px 12px 18px;

  ${media.lessThan("tablet")`
    width: 100%;
    padding: 37px 16px 26px;
  `}
`;

const Description = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { Wrapper, Description, Footer };
