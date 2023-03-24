import styled, { css } from "styled-components";
import { ifProp, theme } from "styled-tools";

const Favorite = styled.li`
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  border-top: 1px solid #343434;
  border-bottom: 1px solid #343434;
  padding-top: 28px;
  padding-bottom: 27px;
  margin-top: 30px;
  list-style: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &:hover {
    color: ${theme("link.active")};
  }

  ${ifProp(
    "active",
    css`
      color: ${theme("link.active")};
    `
  )}
`;

const Text = styled.p`
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const OneSvg = styled.a`
  margin-right: 10px;
  display: inline-block;
`;

const SvgContainer = styled.div`
  display: flex;
  margin-right: 10px;
`;

export { Favorite, Text, SvgContainer, OneSvg };
