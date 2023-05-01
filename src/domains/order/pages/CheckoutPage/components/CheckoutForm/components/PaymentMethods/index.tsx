import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IPaymentMethod } from "~api/types";
import { Input, Switcher } from "~components";
import * as SharedStyles from "../../shared/styled";

export const PaymentMethods = ({
  formik,
  items = [],
  loading = false,
}: {
  formik: any;
  items?: IPaymentMethod[];
  loading?: boolean;
}) => {
  const { t } = useTranslation();

  const getPaymentType = () => {
    return items.find((item) => item.id === +formik.values.payment_method_id);
  };

  const options = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: t("paymentMethods." + item.code, item.name),
      })),
    [items]
  );

  const handleChange = useCallback(
    ({ e, index }) => {
      formik.handleChange(e);
    },
    [formik]
  );

  return (
    <>
      <SharedStyles.Control>
        <Switcher
          loading={loading}
          name={"payment_method_id"}
          options={options}
          handleChange={handleChange}
          selected={(option) => option.id === getPaymentType().id}
        />
      </SharedStyles.Control>
      {getPaymentType()?.code === "cash" && (
        <SharedStyles.Control>
          <Input
            loading={loading}
            name={"change"}
            placeholder={t("checkout.form.change")}
            onChange={formik.handleChange}
            value={formik.values.change}
          />
        </SharedStyles.Control>
      )}
    </>
  );
};
