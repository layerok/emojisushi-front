import {Layout} from "../../layout/Layout";
import {Heading} from "../../components/Heading";
import {StaticMap} from "../../components/StaticMap";
import * as S from "./styled";
import {useEffect} from "react";
import {inject} from "mobx-react";

export const DeliveryRaw = (
    {
        AppStore
    }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    })
    return (
        <Layout withBanner={false}
                withSidebar={false}
        >
            <S.FlexContainer>
                <S.Left>
                    <S.HeadingWrapper>
                        <Heading style={
                            {
                                fontWeight: "600"
                            }
                        }>
                            Доставка и оплата
                        </Heading>
                    </S.HeadingWrapper>


                    <S.AdresText>
                        Наш адрес: г. Одесса, улица Базарная 69
                    </S.AdresText>

                    <S.DeliveryText>
                        Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст...
                        Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст... Какой-нибудь текст...
                    </S.DeliveryText>
                </S.Left>


                <S.Right>
                    <StaticMap width={"100%"}
                               height={"350px"}
                    />
                </S.Right>
            </S.FlexContainer>


        </Layout>
    )
}

export const Delivery = inject('AppStore')(DeliveryRaw);