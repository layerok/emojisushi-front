import * as S from "./styled";
import { SvgIcon } from "../../SvgIcon";
import { Modal } from "../Modal";
import { observer } from "mobx-react";
import { MapPinSvg } from "../../svg/MapPinSvg";
import { useTranslation } from "react-i18next";
import { useAppStore } from "~stores/appStore";
import { ISpot } from "~api/types";
import { useLocation } from "react-router-dom";

type SpotsModalProps = {
  open?: boolean;
  spots: ISpot[];
};

export const SpotsModal = observer(
  ({ open = false, spots }: SpotsModalProps) => {
    const { t } = useTranslation();
    const appStore = useAppStore();
    const location = useLocation();

    return (
      <Modal
        open={open}
        render={({ close }) => (
          <S.Wrapper>
            <S.FilterMagnifier>
              <S.Text>{t("spotsModal.title")}</S.Text>
              <SvgIcon width={"25px"} style={{ marginLeft: "13px" }}>
                <MapPinSvg />
              </SvgIcon>
            </S.FilterMagnifier>
            <S.Content>
              {spots.map((spot, i) => {
                return (
                  <S.Item
                    key={spot.slug}
                    onClick={() => {
                      if (appStore.spot.slug === spot.slug) {
                        appStore.setUserConfirmedLocation(true);
                      } else {
                        window.location.href =
                          spot.frontend_url +
                          location.pathname +
                          "?location_confirmed=true";
                      }

                      close();
                    }}
                    selected={appStore.spot.slug === spot.slug}
                  >
                    {spot.name}
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
