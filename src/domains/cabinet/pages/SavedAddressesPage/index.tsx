import * as S from "./styled";
import {
  ButtonOutline,
  HeartSvg,
  CloseSvg,
  Input,
  SvgIcon,
  SpinnerSvg,
} from "~components";
import { authApi } from "~api";
import { IAddress, IUser } from "~api/types";
import { useTranslation } from "react-i18next";
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { User } from "~models";
import { requireUser } from "~utils/loader.utils";
import { useRef } from "react";
import { AxiosError } from "axios";

type ActionData = {
  errors: {
    lines: string[];
  };
};

type LoaderData = {
  user: IUser;
};

const Address = ({ address }: { address: IAddress }) => {
  const { user: userJson } = useLoaderData() as LoaderData;
  const user = new User(userJson);
  const customer = user.customer;
  const submit = useSubmit();
  const navigation = useNavigation();

  const isDefault = customer.isDefaultShippingAddress(address);

  const makeAddressDefault = () => {
    if (!isDefault) {
      const formData = new FormData();
      formData.append("type", "default");
      formData.append("id", address.id + "");

      submit(formData, {
        method: "post",
      });
    }
  };

  const deleteAddress = () => {
    const formData = new FormData();
    formData.append("type", "delete");
    formData.append("id", address.id + "");

    submit(formData, {
      method: "post",
    });
  };

  const deleting =
    navigation.formData?.get("type") === "delete" &&
    ["submitting", "loading"].includes(navigation.state) &&
    +navigation.formData?.get("id") === address.id;

  const makingDefault =
    navigation.formData?.get("type") === "default" &&
    ["submitting", "loading"].includes(navigation.state) &&
    +navigation.formData?.get("id") === address.id;

  return (
    <S.AddressWrapper>
      <Input
        disabled={true}
        name={"address"}
        value={address.lines}
        width={"350px"}
      />
      <S.IconWrapper>
        {deleting || makingDefault ? (
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
              color={isDefault ? "#FFE600" : "white"}
              hoverColor={"#FFE600"}
              style={{ marginLeft: "10px" }}
              onClick={makeAddressDefault}
            >
              <HeartSvg />
            </SvgIcon>
            <SvgIcon
              width={"25px"}
              clickable={true}
              hoverColor={"#CD3838;"}
              style={{ marginLeft: "10px" }}
              onClick={deleteAddress}
            >
              <CloseSvg />
            </SvgIcon>
          </>
        )}
      </S.IconWrapper>
    </S.AddressWrapper>
  );
};

export const SavedAddressesPage = () => {
  const { user: userJson } = useLoaderData() as any;
  const user = new User(userJson);
  const customer = user.customer;
  const { t } = useTranslation();

  const navigation = useNavigation();

  const isAddingAddress =
    navigation.formData?.get("type") === "add" &&
    ["submitting"].includes(navigation.state);

  const inputRef = useRef(null);

  const actionData = useActionData() as ActionData;

  return (
    <>
      {customer.addresses.map((address) => {
        return <Address key={address.id} address={address} />;
      })}

      <Form
        onSubmit={() => {
          setTimeout(() => {
            inputRef.current.value = "";
          });
        }}
        method="post"
      >
        <input name="name" value={user.fullName} type="hidden" />
        <input name="zip" value="65125" type="hidden" />
        <input name="city" value="Одеса" type="hidden" />
        <input name="two_letters_country_code" value="UA" type="hidden" />
        <input name="type" value="add" type="hidden" />
        <S.AddressWrapper>
          <Input
            ref={inputRef}
            placeholder={t("account.addresses.typeAddress")}
            error={actionData?.errors?.lines[0]}
            width={"350px"}
            name="lines"
          />
        </S.AddressWrapper>
        <S.ButtonWrapper>
          <ButtonOutline submitting={isAddingAddress} type="submit" width={""}>
            {t("account.addresses.addAddress")}
          </ButtonOutline>
        </S.ButtonWrapper>
      </Form>
    </>
  );
};

export const Component = SavedAddressesPage;
Object.assign(Component, {
  displayName: "LazySavedAddressesPage",
});

export const loader = async () => {
  // todo: user is fetched multiple type, fix this
  const user = await requireUser();

  return {
    user,
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type");

  try {
    if (type === "add") {
      const name = formData.get("name") + "";
      const lines = formData.get("lines") + "";
      const zip = formData.get("zip") + "";
      const city = formData.get("city") + "";
      const two_letters_country_code =
        formData.get("two_letters_country_code") + "";

      const data = {
        name,
        lines,
        zip,
        city,
        two_letters_country_code,
      };

      await authApi.addAddress(data);
    } else if (type === "default") {
      const id = +formData.get("id");
      await authApi.makeAddressDefault(id);
    } else if (type === "delete") {
      const id = +formData.get("id");
      await authApi.deleteAddress(id);
    }
  } catch (e) {
    if (e instanceof AxiosError && e.response.status === 422) {
      return {
        errors: e.response.data?.errors || {},
      };
    }
    throw e;
  }

  return null;
};
