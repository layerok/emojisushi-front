import {Layout} from "../../layout/Layout";
import {FlexBox} from "../../components/FlexBox";
import {CheckoutForm} from "./components/CheckoutForm";
import {CheckoutCart} from "./components/CheckoutCart";
import {Heading} from "../../components/Heading";

export const Checkout = () => {
    return (
        <Layout withBanner={false} withSidebar={false}>
            <Heading>Оформление заказа</Heading>
            <FlexBox justifyContent={"space-between"} style={{marginTop: '30px'}}>
                <CheckoutForm/>
                <CheckoutCart/>
            </FlexBox>
        </Layout>
    );
}