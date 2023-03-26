import * as S from "./styled";
import { SvgIcon } from "../../svg/SvgIcon";
import { Modal } from "../Modal";
import { observer } from "mobx-react";
import { MapPinSvg } from "../../svg/MapPinSvg";
import { useTranslation } from "react-i18next";
import { useSpot } from "~hooks/use-spot";
import { useNavigate } from "react-router-dom";
import { useCity } from "~hooks/use-city";
import { useCitiesStore } from "~hooks/use-cities-store";
import { useLang } from "~hooks";

export const SpotsModalRaw = ({ open = false }) => {
  const navigate = useNavigate();

  const cities = useCitiesStore().items;
  const { t } = useTranslation();
  const selectedSpot = useSpot();
  const selectedCity = useCity();
  const lang = useLang();

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
            {cities.map((city, i) => {
              return city.spots.map((spot, i) => {
                return (
                  <S.Item
                    key={city.id + "-" + spot.id}
                    onClick={() => {
                      navigate(
                        "/" + [lang, city.slug, spot.slug, "category"].join("/")
                      );

                      close();
                    }}
                    selected={
                      selectedSpot.slug === spot.slug &&
                      selectedCity.slug === city.slug
                    }
                  >
                    {city.name}, {spot.name}
                  </S.Item>
                );
              });
            })}
          </S.Content>
        </S.Wrapper>
      )}
    >
      <div></div>
    </Modal>
  );
};

export const SpotsModal = observer(SpotsModalRaw);
