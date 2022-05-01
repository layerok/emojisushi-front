import * as S from "./styled";
import {Logo} from "../../components/Logo";
import {Container} from "../../components/Container";
import {PhoneIcon} from "../../components/icons/PhoneIcon";
import {FlexBox} from "../../components/FlexBox";
import {InstagramIcon} from "../../components/icons/InstagramIcon";
import {TelegramIcon} from "../../components/icons/TelegramIcon";
import {Map, StaticMap} from "../../components/StaticMap";
export const Footer = () => {
    return (
        <S.Footer>
            <Container>
                <S.Left>
                    <S.Logo>
                        <Logo/>
                    </S.Logo>
                    <S.List>
                       <FlexBox style={{
                           marginBottom: "15px"
                       }} alignItems={"center"}>
                           <PhoneIcon/>
                           <S.PhoneLabel>
                               Номера
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
                            <InstagramIcon/>
                            <S.InstagramLink>
                                emoji_sushi
                            </S.InstagramLink>
                        </FlexBox>


                        <FlexBox alignItems={"center"}>
                            <TelegramIcon/>
                            <S.TelegramText>
                                Telegram
                            </S.TelegramText>

                        </FlexBox>



                    </S.List>
                </S.Left>
                <S.Right>
                    <FlexBox style={{
                        marginLeft: "237px",
                        marginTop: "52px"
                    }}>
                        <StaticMap/>

                    </FlexBox>



                </S.Right>
            </Container>
        </S.Footer>
    )
}