import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";

export const Layout = (
    {
        children,
        withBanner = false,
        withSidebar= true,
        mainProps = {},
        containerProps = {},
        ...rest
    }) => {
    return (
        <S.Layout {...rest}>
            <Header/>
            <S.Main {...mainProps}>
                <Container {...containerProps}>
                        {withBanner && <Banner/>}
                        <S.FlexBox>
                            {withSidebar && <Sidebar/>}
                            <S.Content>
                                {children}
                            </S.Content>
                        </S.FlexBox>

                </Container>
            </S.Main>
            <Footer/>
        </S.Layout>
    )
}