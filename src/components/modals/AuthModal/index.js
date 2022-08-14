import {Modal} from "../Modal";
import * as S from "./styled";
import {cloneElement, useState} from "react";
import {Input} from "../../Input";
import {Button} from "../../buttons/Button";
import {Checkbox} from "../../Checkbox";
import {PasswordInput} from "../../PasswordInput";



export const AuthModal = ( { children}) => {

    const [ showPasswordRecovery, setShowPasswordRecovery] = useState();

    return <Modal width={"675px"} render={({close}) => (

        <S.Wrapper>
            {!showPasswordRecovery && (

                <S.LoginForm>
                    <S.Text>
                        Войти в аккаунт
                    </S.Text>
                    <S.InputWrapper>
                        <S.InputText>
                            E-mail
                        </S.InputText>
                        <Input light={true}/>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <S.InputText>
                            Пароль
                        </S.InputText>
                        <PasswordInput/>
                    </S.InputWrapper>
                    <S.BtnWrapper>
                        <Button>Войти</Button>
                    </S.BtnWrapper>

                    <S.ForgotPass onClick={ (e) => {
                        setShowPasswordRecovery(true)
                    }}>Забыли пароль?</S.ForgotPass>
                </S.LoginForm>
            )}

            {showPasswordRecovery && (
                <S.LoginForm>
                    <S.Text>
                        Восстановление пароля
                    </S.Text>
                    <S.InputWrapper>
                        <S.InputText>
                            E-mail
                        </S.InputText>
                        <Input light={true}/>
                    </S.InputWrapper>
                    <S.ForgotPassText>
                        Введите Ваш E-mail адрес для которого необходимо скинуть пароль
                    </S.ForgotPassText>
                <S.BtnGroup>
                    <S.ForgotPass onClick={ (e) => {
                        setShowPasswordRecovery(false)
                    }} >Назад</S.ForgotPass>
                    <Button>Войти</Button>
                </S.BtnGroup>


                </S.LoginForm>
            )}


            <S.VerticalBar/>

            <S.SignUpForm>
                <S.Text>
                    Регистрация
                </S.Text>
                <S.InputWrapper>
                    <S.InputText>
                        E-mail
                    </S.InputText>
                    <Input light={true}/>
                    <S.Error>
                        Неверно введен логин
                    </S.Error>
                </S.InputWrapper>

                <S.InputWrapper>
                    <S.InputText>
                        Пароль
                    </S.InputText>
                    <PasswordInput/>
                </S.InputWrapper>
                <S.CheckboxWrapper>
                    <Checkbox initialChecked={false}>
                        Я согласен с условиями использования и обработки моих персональных данных
                    </Checkbox>
                </S.CheckboxWrapper>


                <Button>Регистрация</Button>
            </S.SignUpForm>

        </S.Wrapper>
    )}>
        {cloneElement(children)}
    </Modal>;
}
