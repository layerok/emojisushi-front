import styled from "styled-components";
import media from "../../common/custom-media";
import {FlexBox as FlexBoxBase} from "../../components/FlexBox";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Content = styled.div`
  width: 100%;
  margin-bottom: 50px;
`

const FlexBox = styled(FlexBoxBase)`
    margin-top: 50px;
    ${media.lessThan('pc')`
        flex-direction: column;
        margin-top: 60px;
    `}

    ${media.lessThan('tablet')`
        margin-top: 40px;
    `}
`

export {
    Layout,
    Main,
    Content,
    FlexBox
}
