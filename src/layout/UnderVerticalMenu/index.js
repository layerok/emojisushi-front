import * as S from "./styled";
import {Favorite} from "../../components/Favorite";
import {SvgIcon} from "../../components/svg/SvgIcon";
import {SvgButton} from "../../components/SvgButton";
import {InstagramSvg} from "../../components/svg/InstagramSvg";
import {TelegramSvg} from "../../components/svg/TelegramSvg";
import {TelegramModal} from "../../components/modals/TelegramModal";
import {useMatch, useNavigate, useResolvedPath} from "react-router-dom";


export const UnderVerticalMenu = () => {
    const navigate = useNavigate();
    let resolved = useResolvedPath('/wishlist');
    let match = useMatch({ path: resolved.pathname, end: true });
    return(
        <>
            <S.Favorite active={!!match} onClick={() => {
                navigate('/wishlist')
            }}>
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
                <TelegramModal>
                    <SvgButton>
                        <SvgIcon color={'black'}>
                            <TelegramSvg/>
                        </SvgIcon>
                    </SvgButton>
                </TelegramModal>
            </S.SvgContainer>


        </>




    )
}
