import {Modal} from "../Modal";
import * as S from "./styled";
import {cloneElement, useState} from "react";
import {Input} from "../../Input";
import {Button} from "../../buttons/Button";
import {Checkbox} from "../../Checkbox";
import {PasswordInput} from "../../PasswordInput";
import {useBreakpoint} from "../../../common/hooks/useBreakpoint";
import {FlexBox} from "../../FlexBox";
import AuthApi from "../../../api/auth.api";

export const AuthModal = ( { children}) => {
    const [ showPasswordRecovery, setShowPasswordRecovery] = useState();
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';
    const [signupEmail, setSignupEmail] = useState();
    const [signupEmailError, setSignupEmailError] = useState("");
    const [signupPassword, setSignupPassword] = useState();
    const [signupPasswordError, setSignupPasswordError] = useState("");
    const [signupAgree, setSignupAgree] = useState(false);

    const [ showSignUp,  setShowSignUp]  = useState(false);

/*    useEffect(() => {
        setShowSignUp(false);
        setShowPasswordRecovery(false);
    }, [isMobile])*/

    const showLoginForm = isMobile ? !showPasswordRecovery && !showSignUp: !showPasswordRecovery;
    const showSignUpForm = (!isMobile || showSignUp);

    return <Modal width={isMobile ? "350px" : "675px"}  render={({close}) => (

        <S.Wrapper>
            { showLoginForm && (
                <S.LoginForm>
                    <S.Title>
                        Войти в аккаунт
                    </S.Title>
                    <S.InputWrapper>
                        <S.InputLabel>
                            E-mail
                        </S.InputLabel>
                        <Input light={true}/>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <S.InputLabel>
                            Пароль
                        </S.InputLabel>
                        <PasswordInput light={true}/>

                    </S.InputWrapper>
                    <FlexBox justifyContent={"flex-end"}>
                        <S.NavigateButton style={{paddingTop: "10px"}} onClick={ (e) => {
                            setShowPasswordRecovery(true)
                        }}>Забыли пароль?</S.NavigateButton>
                    </FlexBox>
                    <Button style={{marginTop: "20px", display: "inline-block"}}>Войти</Button>

                    {isMobile &&

                        <S.NavigateButton style={{paddingTop: "10px"}} onClick={ (e) => {
                            e.preventDefault();
                            setShowSignUp(true)
                        }}>Регистрация</S.NavigateButton>

                    }


                </S.LoginForm>
            )}

            {showPasswordRecovery && (
                <S.LoginForm>
                    <S.Title>
                        Восстановление пароля
                    </S.Title>
                    <S.InputWrapper>
                        <S.InputLabel>
                            E-mail
                        </S.InputLabel>
                        <Input light={true}/>
                    </S.InputWrapper>
                    <S.ForgotPassText>
                        Введите Ваш E-mail адрес для которого необходимо скинуть пароль
                    </S.ForgotPassText>

                <S.BtnGroup>
                    <S.NavigateButton onClick={ (e) => {
                        setShowPasswordRecovery(false)
                    }} >Назад</S.NavigateButton>
                    <Button>Войти</Button>
                </S.BtnGroup>

                </S.LoginForm>
            )}

            {!isMobile &&
                <S.VerticalBar/>
            }


            {showSignUpForm &&

                <S.SignUpForm onSubmit={e => {
                    setSignupPasswordError('');
                    setSignupEmailError('');
                    e.preventDefault();
                }}>
                    <S.Title>
                        Регистрация
                    </S.Title>
                    <S.InputWrapper>
                        <S.InputLabel>
                            E-mail
                        </S.InputLabel>
                        <Input error={signupEmailError} onChange={e => {
                            const {value} = e.currentTarget;
                            setSignupEmail(value);
                            setSignupEmailError("");
                        }} light={true}/>
                    </S.InputWrapper>

                    <S.InputWrapper>
                        <S.InputLabel>
                            Пароль
                        </S.InputLabel>
                        <PasswordInput light={true} error={signupPasswordError} onChange={e => {
                            const {value} = e.currentTarget;
                            setSignupPassword(value);
                            setSignupPasswordError("");
                        }}/>
                    </S.InputWrapper>
                    <S.CheckboxWrapper>
                        <Checkbox name={"agree"} initialChecked={signupAgree} onChange={state => {
                            setSignupAgree(state);
                        }}>
                            Я согласен с условиями использования и обработки моих персональных данных
                        </Checkbox>
                    </S.CheckboxWrapper>


                    <FlexBox>
                        <FlexBox flexDirection={"column"} alignItems={"center"}>

                            <Button onClick={() => {
                                if(signupAgree) {
                                    AuthApi.register({
                                        email: signupEmail,
                                        password: signupPassword,
                                        password_confirmation: signupPassword,
                                        name: 'Не указано',
                                        surname: 'Не указано'
                                    }).then(() => {
                                        console.log('Пользователь успешно зарегистрировался')
                                    }).catch((e) => {
                                        const {errors, message} = e.response.data;
                                        if(errors) {
                                            Object.keys(errors).forEach((key) => {
                                                if(key === 'email') {
                                                    setSignupEmailError(errors[key][0]);
                                                }
                                                if(key === 'password') {
                                                    setSignupPasswordError(errors[key][0]);
                                                }
                                            })
                                        }
                                        console.error('Регистрация пользователя провалилась')
                                        console.error(e);
                                    })
                                }
                            }}>Регистрация</Button>
                            {isMobile &&
                                <S.NavigateButton style={{paddingTop:"10px"}} onClick={ (e)=>{
                                    e.preventDefault();
                                    setShowSignUp(false)
                                }
                                }>
                                    Вход
                                </S.NavigateButton>
                            }
                        </FlexBox>
                    </FlexBox>
                </S.SignUpForm>

            }

        </S.Wrapper>
    )}>
        {cloneElement(children)}
    </Modal>;
}
