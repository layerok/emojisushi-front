import styled from "styled-components";
import media from "src/common/custom-media";
import { motion } from "framer-motion";

const Slide = styled(motion.div)<{
  $imageSrc: string;
}>`
  background-image: url("${(props) => props.$imageSrc}");
  background-size: cover;
  background-position: center;
  inset: 0;
  position: absolute;
  border-radius: ${({ theme }) => theme.borderRadius.default};
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
`;

export { Container, Slide };
