import { ReactElement, cloneElement } from "react";
import * as S from "./styled";
import { SvgIcon, FlexBox, StaticMap, TelegramModal, Modal } from "~components";
import { PhoneSvg, InstagramSvg, TelegramSvg } from "~components/svg";
import { useTranslation } from "react-i18next";
import { InstagramLink } from "~layout/Footer/styled";
import { useRouteLoaderData } from "react-router-dom";
import { LayoutRouteLoaderData } from "~layout/Layout";
import { City, Spot } from "~models";

// todo: fix that if we provide Fragment as children, then popup doesn't get opened

export const ContactsModal = ({ children }: { children: ReactElement }) => {
  const { t } = useTranslation();
  const { spot: spotJson, city: cityJson } = useRouteLoaderData(
    "layout"
  ) as LayoutRouteLoaderData;
  const city = new City(cityJson);
  const spot = new Spot(spotJson, city);

  return (
    <Modal
      width={undefined}
      render={({ close }) => (
        <div>
          <S.Wrapper>
            {spot.phones && (
              <>
                <S.Title>{t("contactsModal.contacts")}</S.Title>
                <S.Phones>
                  <SvgIcon
                    style={{ marginRight: "11px" }}
                    width={"25px"}
                    color={"white"}
                  >
                    <PhoneSvg />
                  </SvgIcon>
                  {spot.phones.split(",").map((phone, i) => (
                    <S.Phone key={i}>{phone}</S.Phone>
                  ))}
                </S.Phones>
              </>
            )}

            <S.Socials>
              <FlexBox style={{ marginRight: "20px" }} alignItems={"center"}>
                <SvgIcon
                  style={{ marginRight: "10px" }}
                  width={"25px"}
                  color={"white"}
                >
                  <InstagramSvg />
                </SvgIcon>
                <InstagramLink
                  href={"https://www.instagram.com/emoji_sushi_/"}
                  target={"_blank"}
                >
                  emoji_sushi
                </InstagramLink>
              </FlexBox>
              <TelegramModal>
                <FlexBox alignItems={"center"}>
                  <SvgIcon
                    style={{ marginRight: "10px" }}
                    width={"25px"}
                    color={"white"}
                  >
                    <TelegramSvg />
                  </SvgIcon>
                  <span>Telegram</span>
                </FlexBox>
              </TelegramModal>
            </S.Socials>
          </S.Wrapper>
          <StaticMap style={{ marginTop: "30px" }} height={"220px"} />
        </div>
      )}
    >
      {cloneElement(children)}
    </Modal>
  );
};
