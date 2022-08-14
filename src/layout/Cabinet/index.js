import * as S from "./styled";




export const Cabinet = () => {


    return (
            <S.Cabinet>
                <S.Container>
                    <S.Navbar>
                        <S.NavbarHeader>
                            Мой кабинет
                        </S.NavbarHeader>
                        <S.HorizontalBar/>
                        <S.NavLink to={"/profile"} className={"active"}>Личные данные</S.NavLink>
                        <S.NavLink to={"/my-orders"}>Мои заказы</S.NavLink>
                        <S.NavLink to={"/recover-password"}>Изменить пароль</S.NavLink>
                        <S.NavLink to={"/saved-addresses"}>Сохраненные адреса</S.NavLink>
                        <S.Quit>Выйти с аккаунта</S.Quit>
                    </S.Navbar>
                </S.Container>
            </S.Cabinet>

    )
}