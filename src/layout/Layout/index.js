import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";
import {RestaurantClosed} from "../../components/modals/RestaurantClosed";
import {Preloader} from "../Preloader";
import {inject, observer} from "mobx-react";
import {SpotsModal} from "../../components/modals/SpotsModal";
import {useEffect, useState} from "react";
import {isClosed} from "../../utils/time.utils";

export const LayoutRaw = (
    {
        children,
        withBanner = false,
        withSidebar= true,
        mainProps = {},
        containerProps = {},
        AppStore: {
            loading,
        },
        SpotsStore,
        ...rest
    }) => {


    const closed = isClosed({
        start: [10, 0],
        end: [22, 45],
    });

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
            <RestaurantClosed open={closed}/>
            <SpotsModal open={!SpotsStore.userSelectedSpot && !closed}/>
        </S.Layout>
    )
}

export const Layout = inject('AppStore', 'CartStore', 'SpotsStore')(observer(LayoutRaw));