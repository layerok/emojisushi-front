import {Layout} from "~layout/Layout";
import {FlexBox} from "~components/FlexBox";
import {CheckoutForm} from "./components/CheckoutForm";
import {CheckoutCart} from "./components/CheckoutCart";
import {Heading} from "~components/Heading";
import {useBreakpoint} from "~common/hooks/useBreakpoint";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {useCartStore} from "~hooks/use-cart-store";
import {useAppStore} from "~hooks/use-app-store";
import {usePaymentStore} from "~hooks/use-payment-store";
import {useShippingStore} from "~hooks/use-shipping-store";

export const CheckoutRaw = () => {
    const breakpoint = useBreakpoint();

    const navigate = useNavigate();
    const CartStore = useCartStore();
    const AppStore = useAppStore();
    const PaymentStore = usePaymentStore();
    const ShippingStore = useShippingStore();

    useEffect(() => {
        AppStore.setLoading(true);
        Promise.all([
            CartStore.fetchItems(),
            PaymentStore.fetchItems(),
            ShippingStore.fetchItems()
        ]).then(() => {
            AppStore.setLoading(false);
        })

    }, [])

    useEffect(() => {
        if(!AppStore.loading) {
            if(CartStore.items.length === 0) {
                navigate('/');
            }
        }

    }, [CartStore.items, AppStore.loading])
    const {t} = useTranslation();
    return (
        <Layout
          withRestaurantClosedModal={true}
          withBanner={false}
          withSidebar={false}
        >
            <Heading>{t('checkout.title')}</Heading>
            <FlexBox
                flexDirection={breakpoint === 'mobile' ? 'column': 'row'}
                justifyContent={"space-between"}
                style={{marginTop: '30px'}}
            >
                <CheckoutForm/>
                <CheckoutCart/>
            </FlexBox>
        </Layout>
    );
}

export const Checkout = observer(CheckoutRaw);
