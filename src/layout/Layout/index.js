import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";

export const Layout = ({children, withBanner = false, withSidebar= true}) => {
    return (
        <S.Layout>
            <Header/>
            <S.Main>
                <Container>
                    <S.Grid>
                        {withBanner && <Banner/>}
                        {withSidebar && <Sidebar/>}
                        <S.Content>
                            {children}
                        </S.Content>
                    </S.Grid>
                </Container>
            </S.Main>
            <Footer/>
        </S.Layout>
    )
}