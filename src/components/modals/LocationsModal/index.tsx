import * as S from "./styled";
import { SvgIcon } from "~components";
import { Modal } from "../Modal";
import { MapPinSvg } from "~components";
import { useTranslation } from "react-i18next";
import { useAppStore } from "~stores/appStore";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { citiesQuery } from "~domains/city/cities.query";
import NiceModal from "@ebay/nice-modal-react";
import { observer } from "mobx-react-lite";
import { LOCATION_CONFIRMED_SEARCH_PARAM } from "~common/constants";
import { useModal } from "~modal";
import { useCurrentCitySlug } from "~domains/city/hooks/useCurrentCitySlug";

export const LocationsModal = NiceModal.create(
  observer(() => {
    const modal = useModal();
    const appStore = useAppStore();

    const { t } = useTranslation();
    const location = useLocation();
    const citySlug = useCurrentCitySlug();
    const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
    const currentCity = (cities?.data || []).find((c) => c.slug === citySlug);

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
                    if (currentCity.slug === city.slug) {
                      appStore.setUserConfirmedLocation(true);
                    } else {
                      window.location.href =
                        city.frontend_url +
                        location.pathname +
                        `?${LOCATION_CONFIRMED_SEARCH_PARAM}=true`;
                    }

                    modal.remove();
                  }}
                  selected={currentCity.slug === city.slug}
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
