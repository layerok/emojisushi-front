import * as S from "./styled";
import { AddToCartButton } from "../buttons/AddToCartButton";
import { Price } from "../Price";
import { Favorite } from "../Favorite";
import { useIsMobile } from "~common/hooks/useBreakpoint";
import { IngredientsTooltip } from "../tooltips/IngredientsTooltip";
import { EqualHeightElement } from "react-equal-height";
import { observer } from "mobx-react";
import { Loader } from "../Loader";
import { SvgIcon } from "../svg/SvgIcon";
import { LogoSvg } from "../svg/LogoSvg";
import { Switcher } from "../Switcher";
import { useMemo, useState } from "react";
import { InfoTooltip } from "../InfoTooltip";
import { useTranslation } from "react-i18next";
import { useCartStore } from "~hooks/use-cart-store";
import { useProductsStore } from "~hooks/use-categories-store";
import { useWishlistStore } from "~hooks/use-wishlist-store";
import { Product } from "~models/Product";
import Skeleton from "react-loading-skeleton";
import { Variant } from "~models/Variant";
import { CartProduct } from "~models/CartProduct";

const ProductCardRaw = ({
  product,
  showSkeleton = false,
}: {
  product?: Product;
  showSkeleton?: boolean;
}) => {
  const CartStore = useCartStore();
  const WishlistStore = useWishlistStore();
  const initialModificatorsState = product?.modGroups.reduce((acc, group) => {
    return {
      ...acc,
      [group.property.id]: group.property.options[0].poster_id,
    };
  }, {});

  const [modificators, setModificators] = useState(initialModificatorsState);

  const getVariant = (product: Product) => {
    return product?.variants.find((variant) => {
      return !!Object.values(modificators).includes("" + variant.posterId);
    });
  };

  const variant = useMemo(() => getVariant(product), [product, modificators]);

  const cartProduct = useMemo(
    () => (product ? CartStore.findInCart(product, variant) : undefined),
    [product, variant]
  );

  return (
    <S.Wrapper>
      <Loader loading={product ? WishlistStore.isPending(product) : false} />
      <FavoriteButton showSkeleton={showSkeleton} cartProduct={cartProduct} />
      <Image product={product} showSkeleton={showSkeleton} />

      <EqualHeightElement name={"product-name"}>
        <Name showSkeleton={showSkeleton} product={product} />
        <Modificators
          showSkeleton={showSkeleton}
          product={product}
          modificators={modificators}
          setModificators={setModificators}
        />
      </EqualHeightElement>
      <EqualHeightElement name={"description"}>
        <S.Description>
          <Weight product={product} showSkeleton={showSkeleton} />
          <Ingredients product={product} showSkeleton={showSkeleton} />
        </S.Description>
      </EqualHeightElement>

      <Footer
        cartProduct={cartProduct}
        product={product}
        variant={variant}
        showSkeleton={showSkeleton}
      />
    </S.Wrapper>
  );
};

const FavoriteButton = ({
  cartProduct,
  product,
  showSkeleton = false,
}: {
  cartProduct?: CartProduct;
  product?: Product;
  showSkeleton?: boolean;
}) => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 33 : 25;
  const ProductsStore = useProductsStore();
  const WishlistStore = useWishlistStore();
  const count = cartProduct?.quantity || 0;

  const handleToggleFavorite = () => {
    WishlistStore.addItem({
      product_id: product.id,
      quantity: count,
    }).then((res) => {
      const items = ProductsStore.items.map((item) => {
        if (item.id === product.id) {
          item.isFavorite = res.data.added;
        }
        return item;
      });

      ProductsStore.setItems(items);
    });
  };

  if (showSkeleton) {
    return null;
  }

  return (
    <S.Favorite onClick={handleToggleFavorite}>
      <Favorite width={iconSize + "px"} isFavorite={product?.isFavorite} />
    </S.Favorite>
  );
};

const Footer = ({
  showSkeleton = false,
  product,
  variant,
  cartProduct,
}: {
  showSkeleton?: boolean;
  product?: Product;
  variant?: Variant;
  cartProduct?: CartProduct;
}) => {
  const CartStore = useCartStore();
  const oldPrice = product?.getOldPrice(variant);
  const newPrice = product?.getNewPrice(variant);

  const count = cartProduct?.quantity || 0;

  const handleAdd = (product: Product, variant?: Variant) => {
    return (quantity) => {
      CartStore.addProduct({
        product_id: product.id,
        quantity,
        variant_id: variant?.id,
      });
    };
  };
  return (
    <S.Footer>
      <Price
        showSkeleton={showSkeleton}
        oldPrice={oldPrice}
        newPrice={newPrice}
      />
      <AddToCartButton
        showSkeleton={showSkeleton}
        count={count}
        pending={product ? CartStore.pending.includes(product.id) : false}
        handleAdd={handleAdd(product, variant)}
      />
    </S.Footer>
  );
};

const Image = ({
  showSkeleton = false,
  product,
}: {
  showSkeleton?: boolean;
  product: Product;
}) => {
  return showSkeleton ? (
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

const Name = ({
  showSkeleton = false,
  product,
}: {
  product?: Product;
  showSkeleton?: boolean;
}) => {
  return <S.Name>{showSkeleton ? <Skeleton /> : product.name}</S.Name>;
};

// todo: add types

const Modificators = ({
  product,
  modificators,
  setModificators,
  showSkeleton = false,
}: {
  product?: Product;
  modificators: any;
  setModificators: any;
  showSkeleton?: boolean;
}) => {
  if (showSkeleton) {
    return null;
  }

  return (
    <>
      {(product?.modGroups || []).map((group) => (
        <Switcher
          key={group.id}
          style={{ marginTop: "12px" }}
          handleChange={({ option }) => {
            setModificators((state) => {
              return {
                ...state,
                [group.property.id]: option.id,
              };
            });
          }}
          name={"modificator_" + group.property.id}
          options={group.property.options.map((option) => ({
            id: +option.poster_id,
            name: option.value,
          }))}
          selected={(option) => {
            if (!option) {
              return false;
            }
            return +modificators[group.property.id] === option.id;
          }}
        />
      ))}
    </>
  );
};

const Weight = ({
  product,
  showSkeleton = false,
}: {
  product?: Product;
  showSkeleton?: boolean;
}) => {
  const weight = product?.weight;
  const weightWithUnit = weight !== 0 ? weight + "г" : "";
  const { t } = useTranslation();
  if (showSkeleton) {
    return <Skeleton width={50} height={15} />;
  }
  return (
    <InfoTooltip label={t("menu.weightComment")}>
      <S.Weight>
        {weightWithUnit}
        <span
          style={{
            fontSize: "12px",
            position: "relative",
            top: "-3px",
          }}
        >
          ?
        </span>
      </S.Weight>
    </InfoTooltip>
  );
};

const Ingredients = ({
  product,
  showSkeleton = false,
}: {
  product?: Product;
  showSkeleton?: boolean;
}) => {
  const ingredients = product?.ingredients || [];
  const isMobile = useIsMobile();
  const iconSize = isMobile ? "33px" : "25px";
  if (showSkeleton) {
    return <Skeleton circle width={25} height={25} />;
  }
  return (
    ingredients.length !== 0 && (
      <IngredientsTooltip items={ingredients} iconSize={iconSize} />
    )
  );
};

export const ProductCard = observer(ProductCardRaw);
