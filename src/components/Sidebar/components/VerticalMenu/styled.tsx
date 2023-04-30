import styled from "styled-components";
import { theme } from "styled-tools";
import { ActiveNavLink } from "src/components/ActiveNavLink";

const Categories = styled.nav`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Category = styled(ActiveNavLink)`
  margin-top: 20px;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${theme("link.active")};
  }
`;

export { Categories, Category };
