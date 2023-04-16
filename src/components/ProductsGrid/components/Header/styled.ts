import styled from "styled-components";
import media from "~common/custom-media";

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;

  ${media.lessThan("pc")`
    margin-left: 96px;
  `}
  ${media.lessThan("tablet")`
  margin-left: 0;
  `}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;

  ${media.lessThan("pc")`
    margin-top: 30px;
  `}
`;

export { Title, Header };
