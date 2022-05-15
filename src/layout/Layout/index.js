import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";
import {CustomScrollbars} from "../CustomScrollbar";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";

export const Layout = (
    {
        children,
        withBanner = false,
        withSidebar= true,
        mainProps = {},
        containerProps = {},
        ...rest
    }) => {

    const breakpoint = useBreakpoint();
    const Wrapper = ({children}) => {
        if(breakpoint === 'pc') {
            return <CustomScrollbars>
                {children}
            </CustomScrollbars>
        }
        return children
    }

    return (
        <Wrapper>
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
        </Wrapper>
    )
}