import * as S from "./styled";
import { Container } from "~components/Container";
import { FlexBox } from "~components/FlexBox";
import { StaticMap } from "../../components/StaticMap";
import { TelegramModal } from "../../components/modals/TelegramModal";
import { SvgIcon } from "~components/svg/SvgIcon";
import { TelegramSvg } from "~components/svg/TelegramSvg";
import { InstagramSvg } from "~components/svg/InstagramSvg";
import { PhoneSvg } from "~components/svg/PhoneSvg";
import { LogoSvg } from "~components/svg/LogoSvg";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { useSpot } from "~hooks/use-spot";
import Skeleton from "react-loading-skeleton";

type FooterProps = {
  showSkeleton?: boolean;
};

export const Footer = ({ showSkeleton = false }: FooterProps) => {
  return (
    <S.Footer>
      <Container>
        <S.Left>
          <Logo showSkeleton={showSkeleton} />
          <Socials showSkeleton={showSkeleton} />
        </S.Left>
        <S.Right>
          <Map showSkeleton={showSkeleton} />
        </S.Right>
      </Container>
    </S.Footer>
  );
};

const Map = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  return (
    <S.StaticMap>
      {showSkeleton ? (
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

const Socials = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  return (
    <S.List>
      <Phones showSkeleton={showSkeleton} />
      <Instagram showSkeleton={showSkeleton} />
      <Telegram showSkeleton={showSkeleton} />
    </S.List>
  );
};

const Phones = observer(
  ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
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
            <SvgIcon showSkeleton={showSkeleton} width={"25px"} color={"white"}>
              <PhoneSvg />
            </SvgIcon>

            <S.PhoneLabel>
              {showSkeleton ? (
                <Skeleton width={100} />
              ) : (
                t("footerPhones.phones")
              )}
            </S.PhoneLabel>
          </FlexBox>

          <FlexBox flexDirection={"column"}>
            {showSkeleton ? (
              <>
                <Phone showSkeleton />
                <Phone showSkeleton />
              </>
            ) : (
              spot.phones.split(",").map((phone, i) => <Phone phone={phone} />)
            )}
          </FlexBox>
        </>
      )
    );
  }
);

const Phone = ({
  showSkeleton = false,
  phone,
}: {
  showSkeleton?: boolean;
  phone?: string;
}) => {
  if (showSkeleton) {
    return (
      <S.Phone>
        <Skeleton />
      </S.Phone>
    );
  }
  return <S.Phone href={`tel:${phone}`}>{phone}</S.Phone>;
};

const Instagram = ({ showSkeleton = false }) => {
  return (
    <FlexBox alignItems={"center"}>
      <SvgIcon showSkeleton={showSkeleton} width={"25px"} color={"white"}>
        <InstagramSvg />
      </SvgIcon>
      <S.LinkContainer
        style={{
          flexGrow: 1,
        }}
      >
        {showSkeleton ? (
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

const Telegram = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  return (
    <TelegramModal>
      <FlexBox
        style={{
          marginTop: "10px",
          width: "100%",
        }}
        alignItems={"center"}
      >
        <SvgIcon showSkeleton={showSkeleton} width={"25px"} color={"white"}>
          <TelegramSvg />
        </SvgIcon>

        <S.TelegramText>
          {showSkeleton ? <Skeleton /> : "Telegram"}
        </S.TelegramText>
      </FlexBox>
    </TelegramModal>
  );
};

const Logo = ({ showSkeleton }: { showSkeleton?: boolean }) => {
  return (
    <S.Logo>
      {showSkeleton ? (
        <Skeleton width={160} height={73} />
      ) : (
        <SvgIcon color={"#FFE600"}>
          <LogoSvg />
        </SvgIcon>
      )}
    </S.Logo>
  );
};
