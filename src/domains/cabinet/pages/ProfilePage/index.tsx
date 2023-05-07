import { useEffect, useState } from "react";
import * as S from "./styled";
import { FlexBox, Input, ButtonDark, ButtonOutline } from "src/components";
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import { useTranslation } from "react-i18next";
import { User } from "src/models";
import { requireUser } from "~utils/loader.utils";
import { authApi } from "~api";
import { AxiosError } from "axios";

type ActionData =
  | {
      errors?: Record<string, string[]>;
      ok?: boolean;
    }
  | undefined;

const EditForm = ({ cancelEditing }: { cancelEditing: () => void }) => {
  const { user: userJson } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const user = new User(userJson);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const actionData = useActionData() as ActionData;

  useEffect(() => {
    // react-router has to provide an alternative way of handling successful form submission
    // it will be more linear than useEffect, that I have to use now
    // https://github.com/remix-run/react-router/discussions/10013
    if (actionData?.ok) {
      cancelEditing();
    }
  }, [actionData]);

  return (
    <Form method="post">
      <FlexBox justifyContent={"space-between"}>
        <Input
          style={{ width: "calc(50% - 10px)" }}
          label={t("common.first_name")}
          defaultValue={user.name}
          name="name"
          error={actionData?.errors?.name?.[0]}
        />
        <Input
          style={{ width: "calc(50% - 10px)" }}
          label={t("common.last_name")}
          defaultValue={user.surname}
          name="surname"
          error={actionData?.errors?.surname?.[0]}
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
          value={user.email}
          disabled={true}
        />
        <Input
          style={{ width: "calc(50% - 10px)" }}
          label={t("common.phone")}
          defaultValue={user.phone}
          error={actionData?.errors?.phone?.[0]}
          name="phone"
        />
      </FlexBox>

      <FlexBox
        style={{
          marginTop: "30px",
        }}
      >
        <ButtonOutline
          submitting={navigation.state === "submitting"}
          style={{
            marginRight: "16px",
          }}
        >
          {" "}
          {t("common.save")}
        </ButtonOutline>
        <ButtonDark onClick={cancelEditing}>{t("common.cancel")}</ButtonDark>
      </FlexBox>
    </Form>
  );
};

const ProfilePreview = ({ startEditing }: { startEditing: () => void }) => {
  const { user: userJson } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const user = new User(userJson);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <S.Properties>
      <S.Property>
        <S.Property.Label>{t("common.first_name")}</S.Property.Label>
        <S.Property.Value>{user.fullName}</S.Property.Value>
      </S.Property>

      <S.Property>
        <S.Property.Label>{t("common.email")}</S.Property.Label>
        <S.Property.Value>{user.email}</S.Property.Value>
      </S.Property>
      <S.Property>
        <S.Property.Label>{t("common.phone")}</S.Property.Label>
        <S.Property.Value>{user.phone}</S.Property.Value>
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

export const ProfilePage = () => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const navigation = useNavigation();
  let actionData = useActionData();

  return editModeEnabled ? (
    <EditForm cancelEditing={() => setEditModeEnabled(false)} />
  ) : (
    <ProfilePreview
      startEditing={() => {
        actionData = undefined;
        setEditModeEnabled(true);
      }}
    />
  );
};

export const Component = ProfilePage;
Object.assign(Component, {
  displayName: "LazyProfilePage",
});

export const loader = async () => {
  const user = await requireUser();

  return {
    user,
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const surname = formData.get("surname");
  const phone = formData.get("phone");
  const data = {
    name: name + "",
    surname: surname + "",
    phone: phone + "",
  };

  try {
    await authApi.updateUser(data);
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response.status === 422) {
        return {
          errors: e.response.data.errors,
        };
      }
    }
    throw e;
  }
  return {
    ok: true,
  };
};
