import { FlexBox, Input, ButtonDark, ButtonOutline } from "src/components";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import { useTranslation } from "react-i18next";
import { requireUser } from "~utils/loader.utils";
import { authApi } from "~api";
import { AxiosError } from "axios";

type ActionData =
  | {
      errors?: Record<string, string[]>;
    }
  | undefined;

export const EditProfilePage = () => {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const actionData = useActionData() as ActionData;
  const navigate = useNavigate();
  return (
    <Form
      style={{
        marginTop: 20,
      }}
      method="post"
    >
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
          {t("common.save")}
        </ButtonOutline>
        <ButtonDark type="button" onClick={() => navigate("./../")}>
          {t("common.cancel")}
        </ButtonDark>
      </FlexBox>
    </Form>
  );
};

export const Component = EditProfilePage;
Object.assign(Component, {
  displayName: "LazyEditProfilePage",
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

  return redirect("./../");
};
