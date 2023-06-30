import { ProductCard } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { Product } from "~models";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS_LIMIT_STEP } from "~domains/category/constants";
import { IGetCartRes, IGetWishlistRes } from "~api/types";
import { useMemo } from "react";

type TItemsProps = {
  loading?: boolean;
  items: Product[];
  cart?: IGetCartRes;
  wishlists?: IGetWishlistRes;
};

export const Items = ({
  loading = false,
  items = [],
  cart,
  wishlists,
}: TItemsProps) => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const skeletons = useMemo(
    () =>
      new Array(+searchParams.get("limit") || PRODUCTS_LIMIT_STEP).fill(null),
    [searchParams.get("limit")]
  );

  if (loading) {
    return (
      <S.Grid>
        {skeletons.map((_, i) => (
          <ProductCard key={i} loading />
        ))}
      </S.Grid>
    );
  }

  if (items.length === 0) {
    return <div>{t("common.not_found")}</div>;
  }
  return (
    <S.Grid>
      {items.map((product) => {
        return (
          <ProductCard
            wishlists={wishlists}
            cart={cart}
            key={product.id}
            product={product}
          />
        );
      })}
    </S.Grid>
  );
};
