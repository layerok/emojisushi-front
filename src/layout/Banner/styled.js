import styled from "styled-components";
import {prop} from "styled-tools";
import media from "../../common/custom-media";

const Banner = styled.div`
  margin-top: 40px;
  background-image: url("${prop("src")}");
  width: 100%;
  height: 130px;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  ${media.greaterThan('tablet')`
    height: 180px;
  `};

  ${media.greaterThan('pc')`
    height: 236px;
  `};
`;

export {
    Banner
}