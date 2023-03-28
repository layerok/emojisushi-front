import styled from "styled-components";
import { prop, theme } from "styled-tools";
import media from "../../../../common/custom-media";
import { Link as LinkBase } from "react-router-dom";

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

const Item = styled.li`
  width: calc(100% / 2 - 15px);

  ${media.lessThan("tablet")`
     width: 100%;
    `}
`;

const Link = styled(LinkBase)`
  padding-left: 20px;
  padding-right: 15px;
  background: #1c1c1c;
  border-radius: 10px;

  transition: 0.3s;

  display: flex;
  align-items: center;

  border: 1px solid #1c1c1c;

  gap: 34px;

  color: #ffffff;
  text-decoration: none;
  position: relative;

  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-transform: uppercase;

  span {
    display: inline-block;
    max-width: 101px;
    width: 100%;
  }

  &:hover {
    color: ${theme("link.active")};
  }
  &:active {
    border-color: ${theme("link.active")};
    color: ${theme("link.active")};
  }

  ${media.lessThan("mobile")`
        padding-right: 9px;
        justify-content: space-between;
        `}
`;

export { Image, Item, Link };
