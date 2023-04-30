import { ProductCard } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { Product } from "~models";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS_LIMIT_STEP } from "~domains/category/constants";
import { IGetCartRes } from "~api/types";

type TItemsProps = {
  loading?: boolean;
  items: Product[];
  cart?: IGetCartRes;
};

export const Items = ({ loading = false, items = [], cart }: TItemsProps) => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  if (loading) {
    return (
      <S.Grid>
        {new Array(+searchParams.get("limit") || PRODUCTS_LIMIT_STEP)
          .fill(null)
          .map((_, index) => (
            <ProductCard key={index} loading />
          ))}
      </S.Grid>
    );
  }

  return (
    <>
      {items.length !== 0 ? (
        <S.Grid>
          {items.map((product) => {
            return (
              <ProductCard cart={cart} key={product.id} product={product} />
            );
          })}
        </S.Grid>
      ) : (
        t("common.not_found")
      )}
    </>
  );
};
