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
  margin-bottom: 50px;
  margin-top: 50px;
  ${media.lessThan("pc")`
        margin-top: 60px;
    `}

  ${media.lessThan("tablet")`
        margin-top: 40px;
    `}
`;

export { Layout, Main, Content };
