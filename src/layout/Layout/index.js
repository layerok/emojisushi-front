import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";
import {RestaurantClosed} from "../../components/modals/RestaurantClosed";
import {Preloader} from "../Preloader";
import {inject, observer} from "mobx-react";

export const LayoutRaw = (
    {
        children,
        withBanner = false,
        withSidebar= true,
        mainProps = {},
        containerProps = {},
        AppStore: {loading},
        ...rest
    }) => {

    return (
        <S.Layout {...rest}>
            {loading && (<Preloader/>)}
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
            <RestaurantClosed open={true}/>
        </S.Layout>
    )
}

export const Layout = inject('AppStore')(observer(LayoutRaw));