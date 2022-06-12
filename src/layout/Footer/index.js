import * as S from "./styled";
import {Container} from "../../components/Container";
import {FlexBox} from "../../components/FlexBox";
import {StaticMap} from "../../components/StaticMap";
import {TelegramModal} from "../../components/modals/TelegramModal";
import {SvgIcon} from "../../components/svg/SvgIcon";
import {TelegramSvg} from "../../components/svg/TelegramSvg";
import {InstagramSvg} from "../../components/svg/InstagramSvg";
import {PhoneSvg} from "../../components/svg/PhoneSvg";
import {LogoSvg} from "../../components/svg/LogoSvg";
import {useTranslation} from "react-i18next";

export const Footer = () => {
    const {t} = useTranslation();
    return (
        <S.Footer>
            <Container>
                <S.Left>
                    <S.Logo>
                        <SvgIcon color={"#FFE600"}>
                            <LogoSvg/>
                        </SvgIcon>
                    </S.Logo>
                    <S.List>
                       <FlexBox style={{
                           marginBottom: "15px"
                       }} alignItems={"center"}>
                           <SvgIcon width={"25px"} color={"white"}>
                               <PhoneSvg/>
                           </SvgIcon>
                           <S.PhoneLabel>
                               {t('footerPhones.phones')}
                           </S.PhoneLabel>
                       </FlexBox>

                        <FlexBox flexDirection={"column"}>
                            <S.Phone href={"tel:+380933662869"}>
                                +38 (093) 366 28 69
                            </S.Phone>
                            <S.Phone href={"tel:+380933662869"}>
                                +38 (093) 366 28 69
                            </S.Phone>
                        </FlexBox>


                        <FlexBox alignItems={"center"} >
                            <SvgIcon width={"25px"} color={"white"}>
                                <InstagramSvg/>
                            </SvgIcon>
                            <S.InstagramLink href={"https://www.instagram.com/emoji_sushi_/"} target={"_blank"}>
                                emoji_sushi
                            </S.InstagramLink>
                        </FlexBox>
                        <TelegramModal>
                            <FlexBox style={{
                                marginTop: "10px"
                            }} alignItems={"center"}>
                                <SvgIcon width={"25px"} color={"white"}>
                                    <TelegramSvg/>
                                </SvgIcon>
                                <S.TelegramText>
                                    Telegram
                                </S.TelegramText>

                            </FlexBox>
                        </TelegramModal>


                    </S.List>
                </S.Left>
                <S.Right>
                    <S.StaticMap>
                        <StaticMap width={"100%"}
                                   height={"100%"}
                                   topLeft={"10px"}
                                   topRight={"10px"}
                                   bottomLeft={"0px"}
                                   bottomRight={"0px"}
                        />
                    </S.StaticMap>
                </S.Right>
            </Container>
        </S.Footer>
    )
}