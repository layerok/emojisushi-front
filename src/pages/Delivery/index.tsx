import {Layout} from "~layout/Layout";
import {Heading} from "~components/Heading";
import * as S from "./styled";
import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {useSpotsStore} from "~hooks/use-spots-store";
import {If} from "~components/If";

export const Delivery = observer(() => {
    const {t} = useTranslation();
    const SpotsStore = useSpotsStore();


    return (
      <Layout withBanner={false}
              withSidebar={false}
              withSpotsModal={true}
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
                      <b>{t('common.address')}</b>: {SpotsStore.getAddress}
                  </S.AdresText>

                  <S.DeliveryText dangerouslySetInnerHTML={{__html: SpotsStore.content}}/>
              </S.Left>

              <If condition={!!SpotsStore.googleMapUrl}>
                  <S.Right>
                    <iframe src={SpotsStore.googleMapUrl} width="100%" height="480"/>
                  </S.Right>
              </If>
          </S.FlexContainer>
      </Layout>
    )
})
