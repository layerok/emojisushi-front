import { ButtonCounter, ButtonOutline } from "~components";
import { useTranslation } from "react-i18next";

type AddToCartButtonProps = {
  loading: boolean;
  count: number;
  handleAdd: (count: number) => void;
  submitting: boolean;
};

export const AddToCartButton = ({
  count,
  handleAdd,
  loading = false,
  submitting = false,
}: AddToCartButtonProps) => {
  const { t } = useTranslation();

  if (count) {
    return (
      <ButtonCounter
        handleIncrement={() => {
          handleAdd(1);
        }}
        handleDecrement={() => {
          handleAdd(-1);
        }}
        count={count}
      />
    );
  }
  return (
    <ButtonOutline
      loading={loading}
      submitting={submitting}
      onClick={() => {
        handleAdd(1);
      }}
    >
      {t("order.order_btn")}
    </ButtonOutline>
  );
};
