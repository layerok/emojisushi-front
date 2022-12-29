import {observer, useLocalObservable} from "mobx-react";
import {CabinetLayout} from "../../layout/CabinetLayout";
import {useEffect} from "react";
import * as S from "./styled";
import {Input} from "~components/Input";
import {SvgIcon} from "~components/svg/SvgIcon";
import {CloseSvg} from "../../components/svg/CloseSvg";
import {HeartSvg} from "../../components/svg/HeartSvg";
import {ButtonOutline} from "~components/buttons/Button";
import {useAppStore} from "~hooks/use-app-store";
import {useAuthStore} from "~hooks/use-auth-store";
import {InputModel, TextInputModel} from "~common/InputModel";
import {FormModel} from "~common/FormModel";
import authApi from "~api/auth.api";
import {SpinnerSvg} from "~components/svg/SpinnerSvg";
import {IAddress} from "~api/auth.api.types";


const Address = observer(({
                            address
                          }: {
 address: IAddress
}) => {

  const AuthStore = useAuthStore();
  const user = AuthStore.user;
  const customer = user.customer;

  const state = useLocalObservable(() => ({
    loading: false,
    setLoading(state: boolean) {
      this.loading = state;
    }
  }))

  return <S.AddressWrapper>
    <Input
      disabled={true}
      name={'address'}
      value={address.lines} width={"350px"}
    />
    <S.IconWrapper>
      {state.loading ? (
        <SvgIcon style={{marginLeft:"10px"}} width={"25px"} color={"white"}>
          <SpinnerSvg/>
        </SvgIcon>
      ) : (
        <>
          <SvgIcon
            clickable={true}
            width={"25px"}
            color={customer.isDefaultShippingAddress(address) ? '#FFE600': 'white'}
            hoverColor={"#FFE600"}
            style={{marginLeft:"10px"}}
            onClick={() => {
              if(!state.loading && !customer.isDefaultShippingAddress(address)) {
                state.setLoading(true);
                authApi.makeAddressDefault(address.id).then(() => {
                  AuthStore.fetchUser().finally(() => {
                    state.setLoading(false);
                  })
                }).catch(() => {
                  state.setLoading(false);
                })
              }
            }}
          >
            <HeartSvg/>
          </SvgIcon>
          <SvgIcon
            width={"25px"}
            clickable={true}
            hoverColor={"#CD3838;"}
            style={{marginLeft:"10px"}}
            onClick={() => {
              if(!state.loading) {
                state.setLoading(true);
                authApi.deleteAddress(address.id).then(() => {
                  AuthStore.fetchUser().finally(() => {
                    state.setLoading(false);
                  })
                }).catch(() => {
                  state.setLoading(false);
                })
              }
            }}
          >
            <CloseSvg/>
          </SvgIcon>
        </>
      )}

    </S.IconWrapper>
  </S.AddressWrapper>
})

export const SavedAddresses = observer(() => {
  const AppStore = useAppStore()
  const AuthStore = useAuthStore();
  const user = AuthStore.user;
  const customer = user.customer;
  const state = useLocalObservable(() => ({
    form: new FormModel({
      fields: {
        lines: new TextInputModel('lines')
      },
      onSubmit(formData: FormData, done, error) {
        authApi.addAddress({
          name: user.fullName,
          lines: state.form.fields.lines.value,
          zip: '65125',
          city: 'Одеса',
          two_letters_country_code: 'UA'
        }).then(() => {
          return AuthStore.fetchUser().finally(() => {
            done(true)
          })
        }).catch((e) => {
          error(e)
          done();
        })
      }
    }),

  }))


  useEffect(() => {
    AppStore.setLoading(false);
  }, [])



  return (
    <CabinetLayout title={"Сохраненные адреса"}>
      {customer.addresses.map((address) => {
        return <Address key={address.id} address={address}/>
      })}

      <form {...state.form.asFormProps}>
        <S.AddressWrapper>
          <Input
            placeholder={"Введіть адрес"}
            width={"350px"}
            {...state.form.fields.lines.asProps}
          />
        </S.AddressWrapper>
        <S.ButtonWrapper>
          <ButtonOutline {...state.form.asSubmitButtonProps} width={""}>
            Добавить адрес
          </ButtonOutline>
        </S.ButtonWrapper>
      </form>

    </CabinetLayout>

  )


})
