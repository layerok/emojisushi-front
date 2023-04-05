import * as S from "./styled";
import { AddToCartButton } from "../buttons/AddToCartButton";
import { Price } from "../Price";
import { Favorite } from "../Favorite";
import { useIsMobile } from "~common/hooks/useBreakpoint";
import { IngredientsTooltip } from "../tooltips/IngredientsTooltip";
import { EqualHeightElement } from "react-equal-height";
import { Loader } from "../Loader";
import { SvgIcon } from "../svg/SvgIcon";
import { LogoSvg } from "../svg/LogoSvg";
import { Switcher } from "../Switcher";
import { useEffect, useMemo, useState } from "react";
import { InfoTooltip } from "../InfoTooltip";
import { useTranslation } from "react-i18next";
import { Product } from "~models/Product";
import Skeleton from "react-loading-skeleton";
import { Variant } from "~models/Variant";
import { CartProduct } from "~models/CartProduct";
import { useCartProducts } from "~hooks/use-cart";
import { useFetcher, useParams } from "react-router-dom";
import { useCitySlug, useLang, useSpotSlug } from "~hooks";
import { FetcherWithComponents } from "react-router-dom";
import { IGetWishlistResponse } from "~api/wishlist.api";
import { WishlistLoaderResolvedDeferredData } from "~pages/Wishlist";

export const findInCart = (
  items: CartProduct[],
  product: Product,
  variant?: Variant
) => {
  if (product.inventoryManagementMethod === "variant") {
    return items.find(
      (cartProduct) =>
        cartProduct.productId === product.id &&
        cartProduct.variantId === variant?.id
    );
  }
  return items.find((cartProduct) => cartProduct.productId === product.id);
};

export const ProductCard = ({
  product,
  showSkeleton = false,
}: {
  product?: Product;
  showSkeleton?: boolean;
}) => {
  const cartProducts = useCartProducts();
  const wishlistFetcher = useFetcher<IGetWishlistResponse>();

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
    () => (product ? findInCart(cartProducts, product, variant) : undefined),
    [product, variant]
  );

  return (
    <S.Wrapper>
      <Loader loading={wishlistFetcher.state === "submitting"} />
      <FavoriteButton
        fetcher={wishlistFetcher}
        showSkeleton={showSkeleton}
        cartProduct={cartProduct}
        product={product}
      />
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
  fetcher,
  showSkeleton = false,
}: {
  cartProduct?: CartProduct;
  product?: Product;
  fetcher: FetcherWithComponents<IGetWishlistResponse>;
  showSkeleton?: boolean;
}) => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 33 : 25;
  const count = cartProduct?.quantity || 0;
  const loadFetcher =
    useFetcher() as FetcherWithComponents<WishlistLoaderResolvedDeferredData>;

  const { spotSlug, citySlug, lang } = useParams();

  const handleToggleFavorite = async () => {
    fetcher.submit(
      {
        quantity: count + "",
        product_id: product.id + "",
      },
      {
        action: `${lang}/${citySlug}/${spotSlug}/wishlist/add`,
        method: "post",
      }
    );
  };

  useEffect(() => {
    // I don't sure about that fetcher, it will fetch products, categories, wishlists if they are stale.
    // don't sure if such overhead is needed
    // todo: need to rethink this
    loadFetcher.load(`/${lang}/${citySlug}/${spotSlug}/wishlist`);
  }, []);

  if (showSkeleton) {
    return null;
  }

  return (
    <S.Favorite onClick={handleToggleFavorite}>
      <Favorite
        width={iconSize + "px"}
        isFavorite={product.isInWishlists(
          fetcher.data || loadFetcher.data?.items?.[1] || []
        )}
      />
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
  const oldPrice = product?.getOldPrice(variant);
  const newPrice = product?.getNewPrice(variant);
  const fetcher = useFetcher();

  const lang = useLang();
  const spot = useSpotSlug();
  const city = useCitySlug();

  const isPending = ["submitting"].includes(fetcher.state);

  const count = cartProduct?.quantity || 0;

  const handleAdd = () => {
    return async (quantity: number) => {
      fetcher.submit(
        {
          product_id: product.id + "",
          variant_id: variant?.id + "",
          quantity: quantity + "",
        },
        {
          action: `/${lang}/${city}/${spot}/cart/update`,
          method: "post",
        }
      );
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
        pending={isPending}
        handleAdd={handleAdd()}
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
