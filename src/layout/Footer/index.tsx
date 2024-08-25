import * as S from "./styled";
import {
  StaticMap,
  FlexBox,
  Container,
  SvgIcon,
  SkeletonWrap,
  NavLink,
} from "~components";
import { TelegramSvg, InstagramSvg, PhoneSvg, LogoSvg } from "~components/svg";
import { Trans, useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useAppStore } from "~stores/appStore";
import { ModalIDEnum } from "~common/modal.constants";
import { useShowModal } from "~modal";
import { useTheme } from "styled-components";
import { ROUTES } from "~routes";

type FooterProps = {
  loading?: boolean;
};

export const Footer = ({ loading = false }: FooterProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <S.Footer>
      <Container flexDirection={"row"}>
        <S.Left>
          <S.Logo>
            <SkeletonWrap loading={loading}>
              <SvgIcon color={theme.colors.brand}>
                <LogoSvg />
              </SvgIcon>
            </SkeletonWrap>
          </S.Logo>
          <S.List>
            <Phones loading={loading} />
            <Instagram loading={loading} />
            <Telegram loading={loading} />
            <FlexBox flexDirection={"column"}>
              <NavLink to={ROUTES.PUBLIC_OFFER.path}>
                {t("public_offer")}
              </NavLink>
            </FlexBox>
          </S.List>
        </S.Left>
        <S.Right>
          <Map loading={loading} />
        </S.Right>
      </Container>
    </S.Footer>
  );
};

type IMapProps = { loading?: boolean };

const Map = ({ loading = false }: IMapProps) => {
  return (
    <S.StaticMap>
      {loading ? (
        <Skeleton width={"100%"} height={"100%"} />
      ) : (
        <StaticMap
          width={"100%"}
          height={"100%"}
          topLeft={"10px"}
          topRight={"10px"}
          bottomLeft={"0px"}
          bottomRight={"0px"}
        />
      )}
    </S.StaticMap>
  );
};

type IPhonesProps = { loading?: boolean };

const Phones = ({ loading = false }: IPhonesProps) => {
  const appStore = useAppStore();

  return (
    appStore.city?.phones?.length > 0 && (
      <>
        <FlexBox
          style={{
            marginBottom: "15px",
          }}
          alignItems={"center"}
        >
          <SkeletonWrap loading={loading}>
            <SvgIcon width={"25px"} color={"white"}>
              <PhoneSvg />
            </SvgIcon>
          </SkeletonWrap>

          <S.PhoneLabel>
            <SkeletonWrap loading={loading}>
              <Trans i18nKey="footerPhones.phones" />
            </SkeletonWrap>
          </S.PhoneLabel>
        </FlexBox>

        <FlexBox flexDirection={"column"}>
          {loading ? (
            <>
              <Phone loading />
              <Phone loading />
            </>
          ) : (
            appStore.city.phones
              .split(",")
              .map((phone, i) => <Phone key={i} phone={phone} />)
          )}
        </FlexBox>
      </>
    )
  );
};

type IPhoneProps = {
  loading?: boolean;
  phone?: string;
};

const Phone = ({ loading = false, phone }: IPhoneProps) => {
  if (loading) {
    return (
      <S.Phone>
        <Skeleton />
      </S.Phone>
    );
  }
  return <S.Phone href={`tel:${phone}`}>{phone}</S.Phone>;
};

type TInstagramProps = { loading?: boolean };

const Instagram = ({ loading = false }: TInstagramProps) => {
  return (
    <FlexBox alignItems={"center"}>
      <SkeletonWrap loading={loading}>
        <SvgIcon width={"25px"} color={"white"}>
          <InstagramSvg />
        </SvgIcon>
      </SkeletonWrap>

      <S.LinkContainer
        style={{
          flexGrow: 1,
        }}
      >
        <SkeletonWrap loading={loading}>
          <S.InstagramLink
            href={"https://www.instagram.com/emoji_sushi_/"}
            target={"_blank"}
          >
            emoji_sushi
          </S.InstagramLink>
        </SkeletonWrap>
      </S.LinkContainer>
    </FlexBox>
  );
};

type ITelegramProps = { loading?: boolean };

const Telegram = ({ loading = false }: ITelegramProps) => {
  const showModal = useShowModal();
  return (
    <FlexBox
      style={{
        marginTop: "10px",
        width: "100%",
      }}
      onClick={() => {
        showModal(ModalIDEnum.TelegramModal);
      }}
      alignItems={"center"}
    >
      <SkeletonWrap loading={loading}>
        <SvgIcon width={"25px"} color={"white"}>
          <TelegramSvg />
        </SvgIcon>
      </SkeletonWrap>

      <S.TelegramText>
        <SkeletonWrap loading={loading}>Telegram</SkeletonWrap>
      </S.TelegramText>
    </FlexBox>
  );
};
