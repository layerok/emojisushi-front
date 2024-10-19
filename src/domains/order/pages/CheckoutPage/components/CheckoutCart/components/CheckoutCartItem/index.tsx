import { CartProduct } from "~models";
import * as S from "./styled";
import {
  AnimatedTooltip,
  FlexBox,
  InfoSvg,
  LogoSvg,
  Price,
  SvgIcon,
} from "~components";
import Skeleton from "react-loading-skeleton";
import { IngredientsTooltipContent } from "../IngredientsTooltipContent";

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

  const renderDelimeter = () => {
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

  const renderQuantity = () => {
    return (
      <S.Count>
        {loading ? <Skeleton width={30} /> : quantity + " " + "шт"}{" "}
      </S.Count>
    );
  };

  const renderWeight = () => {
    const formatted = weight === 0 ? "" : weight + "г";
    return (
      <S.Weight>
        {loading ? <Skeleton width={30} /> : formatted} &nbsp;
      </S.Weight>
    );
  };

  const renderImage = () => {
    if (loading) {
      return (
        <S.Image src={undefined}>
          <Skeleton width="100%" height="100%" />
        </S.Image>
      );
    }

    if (!img) {
      return (
        <S.Image src={img}>
          <SvgIcon color={"white"} width={"80%"} style={{ opacity: 0.05 }}>
            <LogoSvg />
          </SvgIcon>
        </S.Image>
      );
    }

    return <S.Image src={loading ? undefined : img} />;
  };

  const renderPrice = () => {
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

  const renderIngredientsTooltip = () => {
    if (ingredients.length < 1) {
      return null;
    }
    return (
      <AnimatedTooltip
        placement={"bottom-start"}
        label={<IngredientsTooltipContent items={ingredients} />}
      >
        <SvgIcon width="25px" color={"#999"}>
          <InfoSvg />
        </SvgIcon>
      </AnimatedTooltip>
    );
  };

  return (
    <S.Item>
      {renderImage()}

      <S.Content>
        <S.Name>{loading ? <Skeleton /> : nameWithMods}</S.Name>
        <S.Description>
          <FlexBox>
            {renderQuantity()}
            {weight !== 0 && renderDelimeter()}
            {renderWeight()}
          </FlexBox>

          {renderIngredientsTooltip()}
        </S.Description>
        {renderPrice()}
      </S.Content>
    </S.Item>
  );
};
