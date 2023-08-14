import * as S from "./styled";
import { SvgIcon } from "../../SvgIcon";
import { Modal } from "../Modal";
import { observer } from "mobx-react";
import { MapPinSvg } from "../../svg/MapPinSvg";
import { useTranslation } from "react-i18next";
import { useAppStore } from "~stores/appStore";
import { ICity } from "~api/types";
import { useLocation } from "react-router-dom";

type LocationsModalProps = {
  open?: boolean;
  cities: ICity[];
};

export const LocationsModal = observer(
  ({ open = false, cities }: LocationsModalProps) => {
    const { t } = useTranslation();
    const appStore = useAppStore();
    const location = useLocation();

    return (
      <Modal
        open={open}
        render={({ close }) => (
          <S.Wrapper>
            <S.FilterMagnifier>
              <S.Text>{t("locationsModal.title")}</S.Text>
              <SvgIcon width={"25px"} style={{ marginLeft: "13px" }}>
                <MapPinSvg />
              </SvgIcon>
            </S.FilterMagnifier>
            <S.Content>
              {cities.map((city, i) => {
                return (
                  <S.Item
                    key={city.slug}
                    onClick={() => {
                      if (appStore.city.slug === city.slug) {
                        appStore.setUserConfirmedLocation(true);
                      } else {
                        window.location.href =
                          city.frontend_url +
                          location.pathname +
                          "?location_confirmed=true";
                      }

                      close();
                    }}
                    selected={appStore.city.slug === city.slug}
                  >
                    {city.name}
                  </S.Item>
                );
              })}
            </S.Content>
          </S.Wrapper>
        )}
      >
        <div></div>
      </Modal>
    );
  }
);
