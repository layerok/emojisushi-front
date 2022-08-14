import styled from "styled-components";
import {ifProp} from "styled-tools";
import {NavLink} from "../NavLink";

const Link = styled(NavLink)`
  color: white;
  position: relative;
  text-decoration: none;
  display: inline-block;


  :hover {
    :after {
      opacity: 1
    }
  }
  
  :after {
    content: "";
    opacity: ${ifProp({className: 'active'}, 1, 0)};
    position: absolute;
    width: 100%;
    left: 0;
    border-bottom: 1px solid #FFE600;
    box-shadow: 0 0 15px rgba(255, 230, 0, 0.3);
    margin-top: 10px;
    bottom: -10px;
  }
`

export {
    Link
}