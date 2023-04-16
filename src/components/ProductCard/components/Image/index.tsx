import * as S from "./styled";
import { LogoSvg, SvgIcon } from "~components";
import { Product } from "~models";
import Skeleton from "react-loading-skeleton";

export const Image = ({
  loading = false,
  product,
}: {
  loading?: boolean;
  product: Product;
}) => {
  return loading ? (
    <Skeleton width={"100%"} height={170} />
  ) : (
    <S.Image src={product?.mainImage}>
      {!product?.mainImage && (
        <SvgIcon color={"white"} width={"80%"} style={{ opacity: 0.05 }}>
          <LogoSvg />
        </SvgIcon>
      )}
    </S.Image>
  );
};
