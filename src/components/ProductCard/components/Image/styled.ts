import styled from "styled-components";
import { prop } from "styled-tools";
import media from "~common/custom-media";

const Image = styled.div<{
  src: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("${prop("src")}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 210px;
  height: 210px;
  margin: 0 auto;

  ${media.lessThan("tablet")`
    width: 260px;
    height: 260px;
  `}
`;

export { Image };
