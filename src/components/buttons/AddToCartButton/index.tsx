import Skeleton from "react-loading-skeleton";
import { ButtonCounter } from "../../Counter";
import { ButtonOutline } from "../Button";
import { useTranslation } from "react-i18next";

type AddToCartButtonProps = {
  showSkeleton: boolean;
  count: number;
  pending: boolean;
  handleAdd: (count: number) => void;
};

export const AddToCartButton = ({
  pending,
  count,
  handleAdd,
  showSkeleton = false,
}) => {
  const { t } = useTranslation();

  if (showSkeleton) {
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
