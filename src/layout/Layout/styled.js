import styled from "styled-components";
import media from "../../common/custom-media";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  
`;

const Main = styled.main`
  flex-grow: 1;
`

const Grid = styled.div`
  display: grid;
  margin-top: 40px;
  ${media.lessThan('tablet')`
    margin-top: 26px;
  `}
  grid-template-areas: 
  "banner banner"
  "sidebar content";
  column-gap: 30px;
  row-gap: 50px;
  grid-template-columns: 255px 1fr;

  ${media.lessThan('pc')`
    grid-template-areas: 
      "banner banner"
      "sidebar sidebar"
      "content content";
    column-gap: 0px;
    row-gap: 30px;
  `}
`;

const Content = styled.div`
  grid-area: content;
`

export {
    Layout,
    Main,
    Grid,
    Content
}
