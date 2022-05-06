import {Layout} from "../../layout/Layout";
import {Heading} from "../../components/Heading";
import {CheckCircleSvg} from "../../components/svg/CheckCircleSvg";
import {SvgIcon} from "../../components/svg/SvgIcon";
import * as S from "./styled";

export const ThankYou = () => {
    return (
        <Layout withSidebar={false} withBanner={false}>
            <S.Center>
                <Heading style={
                    {
                        marginBottom: "20px",
                        fontWeight: "bold"
                    }
                }>
                   Благодарим Вас за заказ!
                </Heading>
                <SvgIcon
                    color={"yellow"}
                    style={{width: "60px"}
                    }>
                    <CheckCircleSvg />
                </SvgIcon>
                <S.MediumText>
                    Ваш заказ успешно принят и отправлен в работу!
                </S.MediumText>
                <S.Text>
                    В ближайшее время Вам перезвонит менеджер для подтверждения заказа.
                    Затем заказ будет подготовлен и отправлен на указанный Вами адрес.
                </S.Text>
            </S.Center>

        </Layout>
    )
}