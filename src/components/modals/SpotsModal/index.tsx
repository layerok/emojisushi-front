import * as S from "./styled";
import { SvgIcon } from "../../SvgIcon";
import { Modal } from "../Modal";
import { observer } from "mobx-react";
import { MapPinSvg } from "../../svg/MapPinSvg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCities } from "~hooks";
import { getFromLocalStorage, setToLocalStorage } from "~utils/ls.utils";

export const SpotsModalRaw = ({ open = false }) => {
  const navigate = useNavigate();

  const cities = useCities();
  const { t } = useTranslation();

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
                      setToLocalStorage("selectedSpotId", spot.id);
                      setToLocalStorage("selectedSpotSlug", spot.slug);
                      navigate("/category");

                      close();
                    }}
                    selected={
                      getFromLocalStorage("selectedSpotSlug") === spot.slug
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
