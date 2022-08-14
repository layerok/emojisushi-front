import styled from "styled-components";



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


const Wrapper   = styled.div`
  display: flex;
  
`

const LeftSide = styled.div`
  
`


const RightSide = styled.div`
    margin-left: 30px;
`

export {
    Container,
    Cabinet,
    Navbar,
    NavbarHeader,
    HorizontalBar,
    Wrapper,
    LeftSide,
    RightSide,
}