import {Layout} from "~layout/Layout";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {Input} from "~components/Input";
import * as S from "./styled";
import {FlexBox} from "~components/FlexBox";
import {Button} from "~components/buttons/Button";
import { useParams} from "react-router-dom";
import authApi from "../../api/auth.api";
import {useAppStore} from "~hooks/use-app-store";
import {PasswordInput} from "~components/PasswordInput";


export const ResetPassword = observer(() => {

  const {code: codeFromQuery} = useParams();
  const [code, setCode] = useState(codeFromQuery)
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isReset, setIsReset] = useState(false);
  const AppStore = useAppStore();

  useEffect(() => {
    AppStore.setLoading(false);
  }, [])

  return (
    <Layout withBanner={false}
            withSidebar={false}
    >
      <FlexBox justifyContent={"center"}>
        <S.Form onSubmit={e => {
          e.preventDefault();
        }}>
          <h2>Скидання пароля</h2>

          <Input error={codeError} value={code} onChange={e => {
            setCode((e.target as HTMLInputElement).value);
            setCodeError('');
          }} style={{
            marginTop: '16px'
          }} name={'code'} placeholder={'Код'}/>

          <PasswordInput error={passwordError} onChange={e => {
            setPassword((e.target as HTMLInputElement).value);
            setPasswordError('');
          }} style={{
            marginTop: '16px'
          }} name={'password'} placeholder={'Новий пароль'}/>

          {isReset && (
            <p style={{
              color: 'green',
              marginTop: '12px'
            }}>
              Пароль успішно скинутий!
            </p>
          )}

          <Button loading={loading}  onClick={() => {
            setLoading(true);
            authApi.resetPassword({
              code,
              password
            })
              .then((res) => {
                console.log(res);
                setIsReset(true);
              })
              .catch(e => {
                const {errors} = e.response.data;
                if(errors) {
                  Object.keys(errors).forEach((key) => {
                    if(key === 'password') {
                      setPasswordError(errors[key][0])
                    }
                    if(key === 'code') {
                      setCodeError(errors[key][0])
                    }
                  })
                }
              })
              .finally(() => {
              setLoading(false);
            })
          }} style={{
            marginTop: '16px'
          }}>
            Скинути
          </Button>

        </S.Form>
      </FlexBox>

    </Layout>
  )
})

