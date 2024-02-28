import * as S from "./styled";
import { SvgIcon } from "~components";
import { Modal } from "../Modal";
import { MapPinSvg } from "~components";
import { useTranslation } from "react-i18next";
import { useAppStore } from "~stores/appStore";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { citiesQuery } from "~queries/cities.query";
import NiceModal from "@ebay/nice-modal-react";
import { observer } from "mobx-react-lite";
import { LOCATION_CONFIRMED_SEARCH_PARAM } from "~common/constants";
import { useModal } from "~modal";

export const LocationsModal = NiceModal.create(
  observer(() => {
    const modal = useModal();
    modal.resolve();

    const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
    const { t } = useTranslation();
    const appStore = useAppStore();
    const location = useLocation();

    if (isCitiesLoading) {
      return null;
    }

    return (
      <Modal
        onClose={() => {
          modal.remove();
        }}
        open={modal.visible}
      >
        <S.Wrapper>
          <S.FilterMagnifier>
            <S.Text>{t("locationsModal.title")}</S.Text>
            <SvgIcon width={"25px"} style={{ marginLeft: "13px" }}>
              <MapPinSvg />
            </SvgIcon>
          </S.FilterMagnifier>
          <S.Content>
            {cities.data.map((city, i) => {
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
                        `?${LOCATION_CONFIRMED_SEARCH_PARAM}=true`;
                    }

                    modal.remove();
                  }}
                  selected={appStore.city.slug === city.slug}
                >
                  {city.name}
                </S.Item>
              );
            })}
          </S.Content>
        </S.Wrapper>
      </Modal>
    );
  })
);
