import { observer, useLocalObservable } from "mobx-react";
import { CabinetLayout } from "~layout/CabinetLayout";
import * as S from "./styled";
import {
  ButtonOutline,
  HeartSvg,
  CloseSvg,
  Input,
  SpinnerSvg,
  SvgIcon,
} from "~components";
import { useAuthStore } from "~hooks/use-auth-store";
import { TextInputModel, FormModel } from "~common/models";
import { authApi } from "~api";
import { IAddress } from "~api/auth.api.types";
import { useTranslation } from "react-i18next";

const Address = observer(({ address }: { address: IAddress }) => {
  const AuthStore = useAuthStore();
  const user = AuthStore.user;
  const customer = user.customer;

  const state = useLocalObservable(() => ({
    loading: false,
    setLoading(state: boolean) {
      this.loading = state;
    },
  }));

  return (
    <S.AddressWrapper>
      <Input
        disabled={true}
        name={"address"}
        value={address.lines}
        width={"350px"}
      />
      <S.IconWrapper>
        {state.loading ? (
          <SvgIcon
            style={{ marginLeft: "10px" }}
            width={"25px"}
            color={"white"}
          >
            <SpinnerSvg />
          </SvgIcon>
        ) : (
          <>
            <SvgIcon
              clickable={true}
              width={"25px"}
              color={
                customer.isDefaultShippingAddress(address) ? "#FFE600" : "white"
              }
              hoverColor={"#FFE600"}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                if (
                  !state.loading &&
                  !customer.isDefaultShippingAddress(address)
                ) {
                  state.setLoading(true);
                  authApi
                    .makeAddressDefault(address.id)
                    .then(() => {
                      AuthStore.fetchUser().finally(() => {
                        state.setLoading(false);
                      });
                    })
                    .catch(() => {
                      state.setLoading(false);
                    });
                }
              }}
            >
              <HeartSvg />
            </SvgIcon>
            <SvgIcon
              width={"25px"}
              clickable={true}
              hoverColor={"#CD3838;"}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                if (!state.loading) {
                  state.setLoading(true);
                  authApi
                    .deleteAddress(address.id)
                    .then(() => {
                      AuthStore.fetchUser().finally(() => {
                        state.setLoading(false);
                      });
                    })
                    .catch(() => {
                      state.setLoading(false);
                    });
                }
              }}
            >
              <CloseSvg />
            </SvgIcon>
          </>
        )}
      </S.IconWrapper>
    </S.AddressWrapper>
  );
});

export const SavedAddresses = observer(() => {
  const AuthStore = useAuthStore();
  const user = AuthStore.user;
  const customer = user.customer;
  const { t } = useTranslation();
  const state = useLocalObservable(() => ({
    form: new FormModel({
      fields: {
        lines: new TextInputModel("lines"),
      },
      onSubmit(fields, done, error) {
        authApi
          .addAddress({
            name: user.fullName,
            lines: fields.lines.value,
            zip: "65125",
            city: "Одеса",
            two_letters_country_code: "UA",
          })
          .then(() => {
            return AuthStore.fetchUser().finally(() => {
              done(true);
            });
          })
          .catch((e) => {
            error(e);
            done();
          });
      },
    }),
  }));

  return (
    <CabinetLayout title={t("account.addresses.title")}>
      {customer.addresses.map((address) => {
        return <Address key={address.id} address={address} />;
      })}

      <form {...state.form.asProps}>
        <S.AddressWrapper>
          <Input
            placeholder={t("account.addresses.typeAddress")}
            width={"350px"}
            {...state.form.fields.lines.asProps}
          />
        </S.AddressWrapper>
        <S.ButtonWrapper>
          <ButtonOutline {...state.form.asSubmitButtonProps} width={""}>
            {t("account.addresses.addAddress")}
          </ButtonOutline>
        </S.ButtonWrapper>
      </form>
    </CabinetLayout>
  );
});

export const Component = SavedAddresses;
Object.assign(Component, {
  displayName: "LazySavedAddresses",
});
