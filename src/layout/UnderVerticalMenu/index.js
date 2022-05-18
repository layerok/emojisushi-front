import * as S from "./styled";
import {Favorite} from "../../components/Favorite";
import {SvgIcon} from "../../components/svg/SvgIcon";
import {SvgButton} from "../../components/SvgButton";
import {InstagramSvg} from "../../components/svg/InstagramSvg";
import {TelegramSvg} from "../../components/svg/TelegramSvg";
import {TelegramDialog} from "../../components/dialogs/TelegramDialog";


export const UnderVerticalMenu = () => {
    return(
        <>
            <S.Favorite>
                Любимые
                <Favorite isFavorite={true} />
            </S.Favorite>
            <S.Text>
                Оставайтесь на связи
            </S.Text>
            <S.SvgContainer>
                <S.OneSvg>
                    <SvgButton>
                        <SvgIcon color={'black'}>
                            <InstagramSvg/>
                        </SvgIcon>
                    </SvgButton>
                </S.OneSvg>
                <TelegramDialog>
                    <SvgButton>
                        <SvgIcon color={'black'}>
                            <TelegramSvg/>
                        </SvgIcon>
                    </SvgButton>
                </TelegramDialog>
            </S.SvgContainer>


        </>




    )
}
