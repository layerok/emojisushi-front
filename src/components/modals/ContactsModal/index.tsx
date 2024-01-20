import * as S from "./styled";
import { SvgIcon, FlexBox, StaticMap, Modal } from "~components";
import { PhoneSvg, InstagramSvg, TelegramSvg } from "~components/svg";
import { useTranslation } from "react-i18next";
import { InstagramLink } from "~layout/Footer/styled";
import { useAppStore } from "~stores/appStore";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export const ContactsModal = NiceModal.create(() => {
  const { t } = useTranslation();
  const appStore = useAppStore();
  const modal = useModal();

  return (
    <Modal
      open={modal.visible}
      onClose={() => {
        modal.remove();
      }}
      width={undefined}
      render={() => (
        <div>
          <S.Wrapper>
            {appStore.city.phones && (
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
                  {appStore.city.phones.split(",").map((phone, i) => (
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

              <FlexBox
                style={{ cursor: "pointer" }}
                alignItems={"center"}
                onClick={() => {
                  window.open("https://t.me/Emojisushibot", "_blank");
                }}
              >
                <SvgIcon
                  clickable={true}
                  style={{ marginRight: "10px" }}
                  width={"25px"}
                  color={"white"}
                >
                  <TelegramSvg />
                </SvgIcon>
                <span>Telegram</span>
              </FlexBox>
            </S.Socials>
          </S.Wrapper>
          <StaticMap style={{ marginTop: "30px" }} height={"220px"} />
        </div>
      )}
    >
      <div></div>
    </Modal>
  );
});
