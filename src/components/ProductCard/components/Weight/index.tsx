import * as S from "./styled";
import { InfoTooltip } from "~components";
import { useTranslation } from "react-i18next";
import { Product } from "~models";
import Skeleton from "react-loading-skeleton";

type TWeightProps = {
  product?: Product;
  loading?: boolean;
};

export const Weight = ({ product, loading = false }: TWeightProps) => {
  const weight = product?.weight;
  const weightWithUnit = weight !== 0 ? weight + "г" : "";
  const { t } = useTranslation();
  if (loading) {
    return <Skeleton width={50} height={15} />;
  }
  return (
    <InfoTooltip label={t("menu.weightComment")}>
      <S.Weight>
        {weightWithUnit}
        {weight !== 0 && (
          <span
            style={{
              fontSize: "12px",
              position: "relative",
              top: "-3px",
            }}
          >
            ?
          </span>
        )}
      </S.Weight>
    </InfoTooltip>
  );
};
