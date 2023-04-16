import styled from "styled-components";
import { prop } from "styled-tools";
import media from "~common/custom-media";

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("${prop("src")}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: ${prop("width", 190)}px;
  height: ${prop("width", 170)}px;
  margin: 0 auto;

  ${media.lessThan("tablet")`
    width: 260px;
    height: 167px;
  `}
`;

export { Image };
