import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";
import {FlexBox} from "../../components/FlexBox";

export const Layout = ({children, withBanner = false, withSidebar= true}) => {
    return (
        <S.Layout>
            <Header/>
            <main>
                <Container>
                    {withBanner && <Banner/>}
                    <FlexBox>
                        {withSidebar && <Sidebar/>}
                        {children}
                    </FlexBox>
                </Container>
            </main>
            <Footer/>
        </S.Layout>
    )
}