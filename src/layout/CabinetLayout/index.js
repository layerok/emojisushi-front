import * as S from "./styled";
import {NavLink} from "../../components/NavLink";
import {Layout} from "../Layout";

export const CabinetLayout = () => {


    return (
        <Layout withSidebar={false}
                withBanner={false}
        >
            <S.Cabinet>
                <S.Container>
                    <S.Navbar>
                        <S.NavbarHeader>
                            Мой кабинет
                        </S.NavbarHeader>
                        <S.HorizontalBar/>
                        <NavLink to={"/profile"}>Личные данные</NavLink>
                        <NavLink to={"/my-orders"}>Мои заказы</NavLink>
                        <NavLink to={"/recover-password"}>Изменить пароль</NavLink>
                        <NavLink to={"/saved-addresses"}>Сохраненные адреса</NavLink>
                        <S.Quit>Выйти с аккаунта</S.Quit>
                    </S.Navbar>
                </S.Container>
            </S.Cabinet>
        </Layout>

    )
}