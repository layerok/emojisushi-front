import {Header} from "../Header";
import {Container} from "~components/Container";
import {Footer} from "../Footer";
import {Banner} from "../Banner";
import {Sidebar} from "../Sidebar";
import * as S from "./styled";
import {RestaurantClosed} from "~components/modals/RestaurantClosed";
import {Preloader} from "../Preloader";
import { observer} from "mobx-react";
import {SpotsModal} from "~components/modals/SpotsModal";
import {isClosed} from "~utils/time.utils";
import {useLocation, useWindowScroll} from "react-use";
import {CartModal} from "~components/modals/CartModal";
import {TinyCartButton} from "~components/TinyCartButton";
import {Sticky} from "../../components/Sticky";
import {StickyToTopBtn} from "../../components/StickyToTopBtn";
import {ReactNode, useEffect} from "react";
import {useAppStore} from "~hooks/use-app-store";
import {useProductsStore} from "~hooks/use-categories-store";
import {useCartStore} from "~hooks/use-cart-store";
import {useSpotsStore} from "~hooks/use-spots-store";
import {useCategoriesStore} from "~hooks/use-products-store";

export const LayoutRaw = (
    {
        children,
        withBanner = false,
        withSidebar= true,
        withRestaurantClosedModal = false,
        withSpotsModal = false,
        mainProps = {},
        containerProps = {},
        ...rest
    }: {
            children?: ReactNode,
            withBanner?: boolean,
            withSidebar?: boolean,
            withRestaurantClosedModal?: boolean;
            withSpotsModal?: boolean;
            mainProps?: Record<string, any>
            containerProps?: Record<string, any>
    }) => {
    const {x, y} = useWindowScroll();
    const location = useLocation();
    const AppStore = useAppStore();
    const ProductsStore = useProductsStore();
    const CartStore = useCartStore();
    const SpotsStore = useSpotsStore();
    const CategoriesStore = useCategoriesStore();

    const showStickyCart = y > 100;

    const closed = isClosed({
        start: [10, 0],
        end: [21, 15],
    });

    useEffect(() => {
        ProductsStore.clearSearch();
    }, [location.pathname])

    useEffect(() => {
        if (withSidebar) {
        CategoriesStore.fetchItems();
      }
    }, [])

    return (
        <S.Layout {...rest}>
            {AppStore.loading && (<Preloader/>)}
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

            {withRestaurantClosedModal && (
              <RestaurantClosed open={closed}/>
            )}

            {withSpotsModal && (
              <SpotsModal open={!SpotsStore.userSelectedSpot && !closed}/>
            )}

            <Sticky top={"30px"} right={"30px"} show={showStickyCart}>
                <CartModal>
                    <div>
                        <TinyCartButton  price={CartStore.total}/>
                    </div>
                </CartModal>
            </Sticky>
            <StickyToTopBtn/>

        </S.Layout>
    )
}

export const Layout = observer(LayoutRaw);
