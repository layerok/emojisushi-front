import {Layout} from "../../layout/Layout";
import {Heading} from "../../components/Heading";
import * as S from "./styled";
import {useEffect} from "react";
import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {useAppStore} from "~hooks/use-app-store";
import {useSpotsStore} from "~hooks/use-spots-store";

export const Delivery = observer(() => {
    const {t} = useTranslation();
    const AppStore = useAppStore();
    const SpotsStore = useSpotsStore();


    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

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
})
