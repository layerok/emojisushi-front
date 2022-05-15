import {Layout} from "../../layout/Layout";
import {FlexBox} from "../../components/FlexBox";
import {CheckoutForm} from "./components/CheckoutForm";
import {CheckoutCart} from "./components/CheckoutCart";
import {Heading} from "../../components/Heading";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";

export const Checkout = () => {
    const breakpoint = useBreakpoint();
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