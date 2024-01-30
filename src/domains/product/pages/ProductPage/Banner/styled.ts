import styled from "styled-components";
import { prop } from "styled-tools";
import media from "src/common/custom-media";
import { motion } from "framer-motion";

const Slide = styled(motion.div)<{
  imageSrc: string;
}>`
  background-image: url("${prop("imageSrc")}");
  background-size: cover;
  background-position: center;
  inset: 0;
  position: absolute;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 130px;
  margin-bottom: 40px;
  position: relative;
  ${media.greaterThan("tablet")`
    height: 180px;
  `};

  ${media.greaterThan("pc")`
    height: 236px;
  `};
  border-radius: 15px;
  overflow: hidden;
`;

export { Container, Slide };
