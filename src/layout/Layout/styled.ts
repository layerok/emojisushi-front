import styled from "styled-components";
import media from "../../common/custom-media";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  position: relative;
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Content = styled.div`
  width: 100%;
  padding-bottom: 50px;
  padding-top: 50px;
  ${media.lessThan("pc")`
    padding-top: 60px;
  `}
  ${media.lessThan("tablet")`
    padding-top: 40px;
  `}
`;

export { Layout, Main, Content };
