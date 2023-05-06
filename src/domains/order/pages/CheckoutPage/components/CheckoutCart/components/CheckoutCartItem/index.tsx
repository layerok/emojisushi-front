import { CartProduct } from "~models";
import * as S from "./styled";
import {
  FlexBox,
  If,
  IngredientsTooltip,
  LogoSvg,
  Price,
  SvgIcon,
} from "~components";
import Skeleton from "react-loading-skeleton";

type CheckoutCartItemProps = {
  item: CartProduct;
  loading?: boolean;
};

export const CheckoutCartItem = ({
  item,
  loading = false,
}: CheckoutCartItemProps) => {
  const { quantity, product, nameWithMods } = item;
  const { ingredients, mainImage: img, weight } = product;

  return (
    <S.Item>
      <Image src={img} loading={loading} />

      <S.Content>
        <S.Name>{loading ? <Skeleton /> : nameWithMods}</S.Name>
        <S.Description>
          <FlexBox>
            <Count loading={loading} quantity={quantity} />
            <If condition={weight !== 0}>
              <Delimeter loading={loading} />
            </If>
            <Weight loading={loading} weight={weight} />
          </FlexBox>
          <If condition={ingredients.length > 0}>
            <IngredientsTooltip items={ingredients} />
          </If>
        </S.Description>
        <Price_ loading={loading} item={item} />
      </S.Content>
    </S.Item>
  );
};

const Delimeter = ({ loading }) => {
  if (loading) {
    return (
      <Skeleton
        style={{
          margin: "0 10px",
        }}
        width={1}
        height={13}
      />
    );
  }
  return <S.Delimiter />;
};

const Count = ({ loading, quantity }) => {
  return (
    <S.Count>
      {loading ? <Skeleton width={30} /> : quantity + " " + "шт"}{" "}
    </S.Count>
  );
};

const Weight = ({ weight, loading }) => {
  const formatted = weight === 0 ? "" : weight + "г";
  return (
    <S.Weight>{loading ? <Skeleton width={30} /> : formatted} &nbsp;</S.Weight>
  );
};

const Image = ({ src, loading = false }) => {
  return (
    <S.Image src={loading ? undefined : src}>
      {loading ? (
        <Skeleton width="100%" height="100%" />
      ) : (
        <If condition={!src}>
          <SvgIcon color={"white"} width={"80%"} style={{ opacity: 0.05 }}>
            <LogoSvg />
          </SvgIcon>
        </If>
      )}
    </S.Image>
  );
};

const Price_ = ({
  item,
  loading = false,
}: {
  item: CartProduct;
  loading?: boolean;
}) => {
  if (loading) {
    return <Skeleton width={50} height={24} />;
  }
  const { product, variant } = item;
  const oldPrice = product.getOldPrice(variant)?.price_formatted;
  const newPrice = product.getNewPrice(variant)?.price_formatted;
  return (
    <S.Price>
      <Price newPrice={newPrice} oldPrice={oldPrice} />
    </S.Price>
  );
};
