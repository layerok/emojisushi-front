import { NavLink } from "react-router-dom";
import { ReactElement } from "react";
type Props = { to: string; isActive: boolean; children: ReactElement };

export const ActiveNavLink = ({ isActive, ...rest }: Props) => (
  <NavLink
    style={{
      color: isActive ? "#FFE600" : "white",
    }}
    {...rest}
  />
);
