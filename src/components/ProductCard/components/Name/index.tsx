import * as S from "./styled";
import { Product } from "~models";
import Skeleton from "react-loading-skeleton";

type TNameProps = {
  product?: Product;
  loading?: boolean;
};

export const Name = ({ loading = false, product }: TNameProps) => {
  return <S.Name>{loading ? <Skeleton /> : product.name}</S.Name>;
};
