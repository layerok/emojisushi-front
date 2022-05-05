import {Layout} from "../../layout/Layout";
import {Heading} from "../../components/Heading";
import {CheckCircleSvg} from "../../components/svg/CheckCircleSvg";
import {SvgIcon} from "../../components/svg/SvgIcon";
import * as S from "./styled";

export const ThankYou = () => {
    return (
        <Layout withSidebar={false} withBanner={false}>
            <S.Center>
                <Heading style={{marginBottom: "20px"}}>
                    Благодарим Вас за заказ!
                </Heading>
                <SvgIcon
                    color={"yellow"}
                    style={{width: "45px"}
                    }>
                    <CheckCircleSvg />
                </SvgIcon>
                <p style={
                    {
                        fontSize: "18px",
                        marginTop: "27px"
                    }
                }>
                    Ваш заказ успешно принят и отправлен в работу!
                </p>
                <S.Text>
                    В ближайшее время Вам перезвонит менеджер для подтверждения заказа.
                    Затем заказ будет подготовлен и отправлен на указанный Вами адрес.
                </S.Text>
            </S.Center>

        </Layout>
    )
}