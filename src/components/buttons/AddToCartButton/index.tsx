import { ButtonCounter, Button } from "~components";
import { useTranslation } from "react-i18next";
import { ReactComponent as ShoppingBag } from "src/assets/ui-icons/shopping-bag.svg";

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
    <Button
      style={{
        width: 130,
      }}
      startAdornment={<ShoppingBag />}
      showSkeleton={loading}
      loading={submitting}
      onClick={() => {
        handleAdd(1);
      }}
    >
      {t("order.order_btn")}
    </Button>
  );
};
