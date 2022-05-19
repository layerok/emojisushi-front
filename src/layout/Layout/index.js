import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";
import {CustomScrollbars} from "../CustomScrollbar";
import {useWindowSize} from "react-use";
import {useDebounce} from "../../common/hooks/useDebounce";
import {useEffect, useState} from "react";
import {RestaurantClosed} from "../../components/modals/RestaurantClosed";

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
    const [height, setHeight] = useState(windowSize.height);
    const debounceHeight = useDebounce(() => {
        setHeight(windowSize.height)
    }, 500)

    useEffect(() => {
        debounceHeight();
    }, [windowSize.height])

    return (
        <CustomScrollbars height={height}>
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
                <RestaurantClosed open={true}/>
            </S.Layout>
        </CustomScrollbars>
    )
}