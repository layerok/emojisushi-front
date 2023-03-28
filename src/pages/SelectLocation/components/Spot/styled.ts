import { Link as BaseLink } from "react-router-dom";
import styled from "styled-components";
import { theme } from "styled-tools";

const Inner = styled.li`
  display: flex;
  flex-direction: column;

  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  position: relative;
  color: #ffffff;
  text-decoration: none;
  position: relative;
`;

const Content = styled.div`
  background: #1c1c1c;
  border: 1px solid #1c1c1c;
  border-radius: 10px;

  transition: 0.3s ease-out;

  padding: 10px;

  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 2;
  &:hover {
    z-index: 4;
    border-color: ${theme("link.active")};
  }
`;

const Head = styled.div`
  display: inline-flex;
  align-items: center;

  margin-bottom: 10px;

  gap: 5px;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;

  color: ${theme("link.active")};
`;

const Link = styled(BaseLink)`
  text-decoration: none;
`;

export { Link, Head, Content, Inner };
