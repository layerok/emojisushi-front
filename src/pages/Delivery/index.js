import {Layout} from "../../layout/Layout";
import {Heading} from "../../components/Heading";
import * as S from "./styled";
import {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {useTranslation} from "react-i18next";

export const DeliveryRaw = (
  {
      AppStore,
      SpotsStore
  }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

    const {t} = useTranslation();


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
                      <b>{t('common.address')}</b>: {SpotsStore.getAddress}
                  </S.AdresText>

                  <S.DeliveryText dangerouslySetInnerHTML={{__html: SpotsStore.content}}/>
              </S.Left>

              {SpotsStore.selectedIndex === 1 && (
                <S.Right>
                    {SpotsStore.googleMapUrl && (
                      <iframe src={SpotsStore.googleMapUrl}
                              width="100%"
                              height="480"/>
                    )}

                </S.Right>
              )}
          </S.FlexContainer>
      </Layout>
    )
}

export const Delivery = inject('AppStore', 'SpotsStore')(observer(DeliveryRaw));
