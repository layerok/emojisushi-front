import {Layout} from "../../layout/Layout";
import {FlexBox} from "../../components/FlexBox";
import {CheckoutForm} from "./components/CheckoutForm";
import {CheckoutCart} from "./components/CheckoutCart";
import {Heading} from "../../components/Heading";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {inject, observer} from "mobx-react";

export const CheckoutRaw = (
    {
        CartStore,
        AppStore,
        PaymentStore,
        ShippingStore
    }
) => {
    const breakpoint = useBreakpoint();

    const navigate = useNavigate();

    useEffect(() => {
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

    return (
        <Layout withBanner={false} withSidebar={false}>
            <Heading>Оформление заказа</Heading>
            <FlexBox flexDirection={breakpoint === 'mobile' ? 'column': 'row'} justifyContent={"space-between"} style={{marginTop: '30px'}}>
                <CheckoutForm/>
                <CheckoutCart/>
            </FlexBox>
        </Layout>
    );
}

export const Checkout = inject('CartStore', 'AppStore', 'PaymentStore', 'ShippingStore')(observer(CheckoutRaw));