import * as S from "./styled";
import {NavLink} from "~components/NavLink";
import {Layout} from "../Layout";
import {ButtonDark} from "~components/buttons/Button";
import {stores} from "~stores/stores";
import {useTranslation} from "react-i18next";

export const CabinetLayout = ({children, title = ""}) => {

    const {t} = useTranslation();

    return (
        <Layout withSidebar={false}
                withBanner={false}
                withRestaurantClosedModal={false}
        >
            <S.Wrapper>
                <S.LeftSide>
                    <S.Cabinet>
                        <S.Container>
                            <S.Navbar>
                                <S.NavbarHeader>
                                    {t('account.cabinet')}
                                </S.NavbarHeader>
                                <S.HorizontalBar/>
                                <NavLink to={"/account/profile"}>{t('account.profile.title')}</NavLink>
                                <NavLink to={"/account/orders"}>{t('account.orders.title')}</NavLink>
                                <NavLink to={"/account/recover-password"}>{t('account.changePassword.title')}</NavLink>
                                <NavLink to={"/account/saved-addresses"}>{t('account.addresses.title')}</NavLink>
                                <div style={{marginTop:
                                        "10px"}}>
                                    <ButtonDark onClick={() => {
                                        stores.AuthStore.logout();
                                    }} minWidth={"201px"}>{t('common.logout')}</ButtonDark>
                                </div>
                            </S.Navbar>
                        </S.Container>
                    </S.Cabinet>
                </S.LeftSide>

                <S.RightSide>
                    <S.Heading>{title}</S.Heading>
                    <S.Content>
                        {children}
                    </S.Content>

                </S.RightSide>
            </S.Wrapper>

        </Layout>

    )
}
