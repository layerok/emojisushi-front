import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";
import {CustomScrollbars} from "../CustomScrollbar";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {useWindowSize} from "react-use";

export const Layout = (
    {
        children,
        withBanner = false,
        withSidebar= true,
        mainProps = {},
        containerProps = {},
        ...rest
    }) => {

    const windowSize = useWindowSize();

    return (
        <CustomScrollbars height={windowSize.height}>
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
        </CustomScrollbars>
    )
}