import * as S from "./styled";
import {
  TelegramModal,
  StaticMap,
  FlexBox,
  Container,
  SvgIcon,
} from "~components";
import { TelegramSvg, InstagramSvg, PhoneSvg, LogoSvg } from "~components/svg";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { useSpot } from "~hooks/use-spot";
import Skeleton from "react-loading-skeleton";

type FooterProps = {
  loading?: boolean;
};

export const Footer = ({ loading = false }: FooterProps) => {
  return (
    <S.Footer>
      <Container>
        <S.Left>
          <Logo loading={loading} />
          <Socials loading={loading} />
        </S.Left>
        <S.Right>
          <Map loading={loading} />
        </S.Right>
      </Container>
    </S.Footer>
  );
};

const Map = ({ loading = false }: { loading?: boolean }) => {
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

const Socials = ({ loading = false }: { loading?: boolean }) => {
  return (
    <S.List>
      <Phones loading={loading} />
      <Instagram loading={loading} />
      <Telegram loading={loading} />
    </S.List>
  );
};

const Phones = observer(({ loading = false }: { loading?: boolean }) => {
  const spot = useSpot();
  const { t } = useTranslation();
  return (
    spot?.hasPhones && (
      <>
        <FlexBox
          style={{
            marginBottom: "15px",
          }}
          alignItems={"center"}
        >
          <SvgIcon loading={loading} width={"25px"} color={"white"}>
            <PhoneSvg />
          </SvgIcon>

          <S.PhoneLabel>
            {loading ? <Skeleton width={100} /> : t("footerPhones.phones")}
          </S.PhoneLabel>
        </FlexBox>

        <FlexBox flexDirection={"column"}>
          {loading ? (
            <>
              <Phone loading />
              <Phone loading />
            </>
          ) : (
            spot.phones.split(",").map((phone, i) => <Phone phone={phone} />)
          )}
        </FlexBox>
      </>
    )
  );
});

const Phone = ({
  loading = false,
  phone,
}: {
  loading?: boolean;
  phone?: string;
}) => {
  if (loading) {
    return (
      <S.Phone>
        <Skeleton />
      </S.Phone>
    );
  }
  return <S.Phone href={`tel:${phone}`}>{phone}</S.Phone>;
};

const Instagram = ({ loading = false }) => {
  return (
    <FlexBox alignItems={"center"}>
      <SvgIcon loading={loading} width={"25px"} color={"white"}>
        <InstagramSvg />
      </SvgIcon>
      <S.LinkContainer
        style={{
          flexGrow: 1,
        }}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <S.InstagramLink
            href={"https://www.instagram.com/emoji_sushi_/"}
            target={"_blank"}
          >
            emoji_sushi
          </S.InstagramLink>
        )}
      </S.LinkContainer>
    </FlexBox>
  );
};

const Telegram = ({ loading = false }: { loading?: boolean }) => {
  return (
    <TelegramModal>
      <FlexBox
        style={{
          marginTop: "10px",
          width: "100%",
        }}
        alignItems={"center"}
      >
        <SvgIcon loading={loading} width={"25px"} color={"white"}>
          <TelegramSvg />
        </SvgIcon>

        <S.TelegramText>{loading ? <Skeleton /> : "Telegram"}</S.TelegramText>
      </FlexBox>
    </TelegramModal>
  );
};

const Logo = ({ loading }: { loading?: boolean }) => {
  return (
    <S.Logo>
      {loading ? (
        <Skeleton width={160} height={73} />
      ) : (
        <SvgIcon color={"#FFE600"}>
          <LogoSvg />
        </SvgIcon>
      )}
    </S.Logo>
  );
};
