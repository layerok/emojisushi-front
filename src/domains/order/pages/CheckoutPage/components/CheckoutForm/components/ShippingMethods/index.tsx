import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IShippingMethod, IUser } from "~api/types";
import { Dropdown, Input, Switcher } from "~components";
import * as SharedStyles from "../../shared/styled";

export const ShippingMethods = ({
  formik,
  items = [],
  loading = false,
  user,
}: {
  formik: any;
  loading?: boolean;
  items?: IShippingMethod[];
  user?: IUser | null;
}) => {
  const { t } = useTranslation();

  const getShippingType = () => {
    return items.find((item) => item.id === +formik.values.shipping_method_id);
  };

  const options = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: t("shippingMethods." + item.code, item.name),
      })),
    [items]
  );

  const isSelected = useCallback(
    (option) => {
      return option.id === getShippingType().id;
    },
    [getShippingType]
  );

  const handleChange = useCallback(
    ({ e, index }) => {
      formik.handleChange(e);
    },
    [formik]
  );
  return (
    <>
      <Switcher
        loading={loading}
        name={"shipping_method_id"}
        options={options}
        selected={isSelected}
        handleChange={handleChange}
      />
      {getShippingType()?.id === 2 && (
        <AddressDropdownOrInput user={user} formik={formik} />
      )}
    </>
  );
};

const AddressDropdownOrInput = ({
  formik,
  user,
}: {
  formik: any;
  user: IUser | null;
}) => {
  const { t } = useTranslation();

  const [showTextAddress, setShowTextAddress] = useState(
    (user && !user.customer.addresses.length) || !user
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {showTextAddress || !user?.customer.addresses.length ? (
        <SharedStyles.Control>
          <Input
            name={"address"}
            placeholder={t("checkout.form.address")}
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </SharedStyles.Control>
      ) : (
        <AddressDropdown user={user} formik={formik} />
      )}
      {user?.customer.addresses.length && (
        <button
          type={"button"}
          style={{
            color: "rgb(255, 230, 0)",
            fontSize: "10px",
            right: 0,
            top: "calc(100% + 2px)",
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowTextAddress((state) => !state);
            if (!showTextAddress) {
              formik.setFieldValue("address_id", null);
            } else {
              formik.setFieldValue("address", "");
            }
          }}
        >
          {showTextAddress
            ? t("checkout.selectSavedAddress")
            : t("checkout.inputAnotherAddress")}
        </button>
      )}
    </div>
  );
};

const AddressDropdown = observer(
  ({ formik, user }: { formik: any; user: IUser | null }) => {
    const options = useMemo(
      () =>
        user?.customer.addresses.map((address) => ({
          label: address.lines,
          value: address.id,
        })),
      [user]
    );

    const defaultAddress = user.customer.addresses.find(
      (address) => address.id === user.customer.default_shipping_address_id
    );

    const initialValue = defaultAddress?.id || options[0].value;

    const [value, setValue] = useState<number | string>(
      defaultAddress?.id || options[0].value
    );

    useEffect(() => {
      formik.setFieldValue("address_id", initialValue);
    }, []);

    return (
      <SharedStyles.Control>
        <Dropdown
          options={options}
          width={"350px"}
          value={value}
          onChange={(value) => {
            setValue(value);
            formik.setFieldValue("address_id", value);
          }}
        />
      </SharedStyles.Control>
    );
  }
);
