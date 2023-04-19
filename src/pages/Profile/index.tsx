import { CabinetLayout } from "~layout/CabinetLayout";
import { useEffect, useState } from "react";
import { observer, useLocalObservable } from "mobx-react";
import * as S from "./styled";
import {
  FlexBox,
  Input,
  Dropdown,
  ButtonDark,
  ButtonOutline,
} from "~components";
import { useAuthStore } from "~hooks";
import { useNavigate } from "react-router-dom";
import {
  DAY_OPTIONS,
  MONTH_OPTIONS,
  SEX_OPTIONS,
  YEAR_OPTIONS,
} from "~pages/Profile/constants";

import { TextInputModel, FormModel } from "~common/models";
import { useTranslation } from "react-i18next";

const EditForm = observer(
  ({ cancelEditing }: { cancelEditing: () => void }) => {
    const AuthStore = useAuthStore();
    const user = AuthStore.user;
    const customer = user.customer;
    const { t } = useTranslation();

    const form = useLocalObservable(
      () =>
        new FormModel({
          fields: {
            name: new TextInputModel("name", {
              value: user.name,
            }),
            surname: new TextInputModel("surname", {
              value: user.surname,
            }),
            phone: new TextInputModel("phone", {
              value: user.phone,
            }),
          },
          onSubmit(fields, done, error) {
            user.name = fields.name.value;
            customer.firstName = fields.name.value;
            user.surname = fields.surname.value;
            customer.lastName = fields.surname.value;
            user.phone = fields.phone.value;

            user
              .save()
              .then(() => {
                cancelEditing();
              })
              .catch((e) => {
                error(e);
              })
              .finally(() => {
                done();
              });
          },
        })
    );

    return (
      <form {...form.asProps}>
        <FlexBox justifyContent={"space-between"}>
          <Input
            style={{ width: "calc(50% - 10px)" }}
            label={t("common.first_name")}
            {...form.fields.name.asProps}
          />
          <Input
            style={{ width: "calc(50% - 10px)" }}
            label={t("common.last_name")}
            {...form.fields.surname.asProps}
          />
        </FlexBox>
        <FlexBox
          justifyContent={"space-between"}
          style={{
            marginTop: "10px",
          }}
        >
          <Input
            style={{ width: "calc(50% - 10px)" }}
            label={t("common.email")}
            name={"email"}
            value={AuthStore.user.email}
            disabled={true}
          />
          <Input
            style={{ width: "calc(50% - 10px)" }}
            label={t("common.phone")}
            {...form.fields.phone.asProps}
          />
        </FlexBox>

        {/*        <S.Birth>
            <S.Birth.Heading>Дата Рождения</S.Birth.Heading>
            <S.Birth.Properties>
                <S.Birth.Property>
                    <S.Birth.Label>День</S.Birth.Label>
                    <Dropdown
                      width={"100px"}
                      initiallySelectedValue={1}
                      options={DAY_OPTIONS}
                    />

                </S.Birth.Property>
                <S.Birth.Property>
                    <S.Birth.Label>Месяц</S.Birth.Label>
                    <Dropdown width={"128px"}
                              initiallySelectedValue={1}
                              options={MONTH_OPTIONS}
                    />

                </S.Birth.Property>

                <S.Birth.Property>
                    <S.Birth.Label>Год</S.Birth.Label>
                    <Dropdown
                      width={"107px"}
                      initiallySelectedValue={1976}
                      options={YEAR_OPTIONS}
                    />

                </S.Birth.Property>

            </S.Birth.Properties>

        </S.Birth>

        <S.Sex>
            <S.Sex.Label>Пол</S.Sex.Label>
            <Dropdown
              width={"128px"}
              initiallySelectedValue={"male"}
              options={SEX_OPTIONS}
            />
        </S.Sex>

        <S.HorizontalBar/>*/}

        <FlexBox
          style={{
            marginTop: "30px",
          }}
        >
          <ButtonOutline
            {...form.asSubmitButtonProps}
            style={{
              marginRight: "16px",
            }}
          >
            {" "}
            {t("common.save")}
          </ButtonOutline>
          <ButtonDark
            onClick={() => {
              cancelEditing();
            }}
          >
            {t("common.cancel")}
          </ButtonDark>
        </FlexBox>
      </form>
    );
  }
);

const ProfilePreview = ({ startEditing }: { startEditing: () => void }) => {
  const AuthStore = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <S.Properties>
      <S.Property>
        <S.Property.Label>{t("common.first_name")}</S.Property.Label>
        <S.Property.Value>{AuthStore.user.fullName}</S.Property.Value>
      </S.Property>

      <S.Property>
        <S.Property.Label>{t("common.email")}</S.Property.Label>
        <S.Property.Value>{AuthStore.user.email}</S.Property.Value>
      </S.Property>
      <S.Property>
        <S.Property.Label>{t("common.phone")}</S.Property.Label>
        <S.Property.Value>{AuthStore.user.phone}</S.Property.Value>
      </S.Property>

      <S.BtnGroup>
        <ButtonDark
          onClick={() => {
            startEditing();
          }}
          minWidth={"309px"}
        >
          {t("account.profile.editProfile")}
        </ButtonDark>
        <S.BtnWrapper>
          <ButtonDark
            onClick={() => {
              navigate("/account/recover-password");
            }}
            minWidth={"202px"}
          >
            {t("account.profile.changePassword")}
          </ButtonDark>
        </S.BtnWrapper>
      </S.BtnGroup>
    </S.Properties>
  );
};

export const Profile = () => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const { t } = useTranslation();

  return (
    <CabinetLayout title={t("account.profile.title")}>
      {editModeEnabled ? (
        <EditForm cancelEditing={() => setEditModeEnabled(false)} />
      ) : (
        <ProfilePreview startEditing={() => setEditModeEnabled(true)} />
      )}
    </CabinetLayout>
  );
};

export const Component = Profile;
Object.assign(Component, {
  displayName: "LazyProfile",
});
