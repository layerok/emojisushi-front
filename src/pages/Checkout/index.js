import {Layout} from "../../layout/Layout";
import {FlexBox} from "../../components/FlexBox";
import {CheckoutForm} from "./components/CheckoutForm";
import {CheckoutCart} from "./components/CheckoutCart";

export const Checkout = () => {
    return (
        <Layout withBanner={false} withSidebar={false}>
            <FlexBox justifyContent={"space-between"}>
                <CheckoutForm/>
                <CheckoutCart/>
            </FlexBox>
        </Layout>
    );
}