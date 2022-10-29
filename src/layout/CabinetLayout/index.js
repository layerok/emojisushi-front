import * as S from "./styled";
import {NavLink} from "../../components/NavLink";
import {Layout} from "../Layout";
import {ButtonDark} from "../../components/buttons/Button";

export const CabinetLayout = ({children, title = ""}) => {


    return (
        <Layout withSidebar={false}
                withBanner={false}
        >
            <S.Wrapper>
                <S.LeftSide>
                    <S.Cabinet>
                        <S.Container>
                            <S.Navbar>
                                <S.NavbarHeader>
                                    Мой кабинет
                                </S.NavbarHeader>
                                <S.HorizontalBar/>
                                <NavLink to={"/account/profile"}>Личные данные</NavLink>
                                <NavLink to={"/account/orders"}>Мои заказы</NavLink>
                                <NavLink to={"/account/recover-password"}>Изменить пароль</NavLink>
                                <NavLink to={"/account/saved-addresses"}>Сохраненные адреса</NavLink>
                                <div style={{marginTop:
                                        "10px"}}>
                                    <ButtonDark minWidth={"201px"}>Выйти с аккаунта</ButtonDark>
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