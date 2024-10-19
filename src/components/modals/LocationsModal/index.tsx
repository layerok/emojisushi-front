import * as S from "./styled";
import { Modal, SvgIcon } from "~components";
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
import styled, { useTheme } from "styled-components";
import { Times } from "~assets/ui-icons";
import { media } from "~common/custom-media";

export const LocationsModal = NiceModal.create(
  observer(() => {
    const modal = useModal();
    const appStore = useAppStore();
    const theme = useTheme();

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
        overlayStyles={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: theme.zIndices.modals,
        }}
        onClose={() => {
          modal.remove();
        }}
        open={modal.visible}
      >
        {({ close }) => (
          <Container>
            <CloseIcon>
              <SvgIcon
                onClick={close}
                hoverColor={theme.colors.brand}
                color={"white"}
                style={{
                  cursor: "pointer",
                  width: 35,
                }}
              >
                <Times />
              </SvgIcon>
            </CloseIcon>
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
          </Container>
        )}
      </Modal>
    );
  })
);

const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.canvas.inset2};
  box-shadow: ${({ theme }) => theme.shadows.canvasInset2Shadow};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: -35px;
  cursor: pointer;

  ${media.lessThan("pc")`
    right: 10px;
    top: 10px;
  `}
`;
