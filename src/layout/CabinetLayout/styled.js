import styled from "styled-components";
import {NavLink as NavlinkBase} from "../../components/NavLink";
import {ifProp} from "styled-tools";


const Container = styled.div`
    max-width: 1720px;
    margin: 0 auto;  
`

const Cabinet = styled.div`

`

const Navbar = styled.div`
  width: 350px;
  height: 220px;
  background: #1C1C1C;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  padding: 10px;
`

const NavbarHeader = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #FFFFFF; 
`

const HorizontalBar = styled.div`
  border: 1px solid #2D2D2D;
  width: 330px; 
  margin-top: 10px
`


const Quit = styled.button`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;
  background: #272727;
  box-shadow: 0px 0px 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  width: 191px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 11px 27px;
  gap: 10px;
  
  margin-top: 10px;
`


export {
    Container,
    Cabinet,
    Navbar,
    NavbarHeader,
    HorizontalBar,
    Quit,
}