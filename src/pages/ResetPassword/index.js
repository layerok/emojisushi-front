import {Layout} from "../../layout/Layout";
import {useEffect, useMemo, useState} from "react";
import {inject, observer} from "mobx-react";
import {Input} from "../../components/Input";
import * as S from "./styled";
import {FlexBox} from "../../components/FlexBox";
import {Button} from "../../components/buttons/Button";
import { useParams} from "react-router-dom";
import authApi from "../../api/auth.api";


export const ResetPasswordRaw = (
  {
    AppStore,
  }
) => {

  const {code: codeFromQuery} = useParams();
  const [code, setCode] = useState(codeFromQuery)
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isReset, setIsReset] = useState(false);

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
            setCode(e.target.value);
            setCodeError('');
          }} style={{
            marginTop: '16px'
          }} name={'code'} placeholder={'Код'}/>

          <Input error={passwordError} onChange={e => {
            setPassword(e.target.value);
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
            authApi.resetPassword(code, password)
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
}

export const ResetPassword = inject('AppStore')(observer(ResetPasswordRaw));
