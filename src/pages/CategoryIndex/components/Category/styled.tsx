import styled from "styled-components";
import { prop, theme } from "styled-tools";
import media from "../../../../common/custom-media";

const Image = styled.div`
  flex-shrink: 0;

  width: 100px;
  height: 100px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, #1c1c1c 0%, rgba(28, 28, 28, 0) 100%);
    pointer-events: none;
  }
`;

export { Image };
