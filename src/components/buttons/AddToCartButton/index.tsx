import Skeleton from "react-loading-skeleton";
import { ButtonCounter, ButtonOutline } from "~components";
import { useTranslation } from "react-i18next";

type AddToCartButtonProps = {
  loading: boolean;
  count: number;
  pending: boolean;
  handleAdd: (count: number) => void;
};

export const AddToCartButton = ({
  pending,
  count,
  handleAdd,
  loading = false,
}: AddToCartButtonProps) => {
  const { t } = useTranslation();

  if (loading) {
    return <Skeleton width={130} height={40} borderRadius={10} />;
  }

  if (count && !pending) {
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
      loading={pending}
      onClick={() => {
        if (!pending) {
          handleAdd(1);
        }
      }}
    >
      {t("order.order_btn")}
    </ButtonOutline>
  );
};
