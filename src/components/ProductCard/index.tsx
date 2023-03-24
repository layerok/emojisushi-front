import * as S from "./styled";
import { AddToCartButton } from "../buttons/AddToCartButton";
import { Price } from "../Price";
import { Favorite } from "../Favorite";
import { useBreakpoint } from "~common/hooks/useBreakpoint";
import { IngredientsTooltip } from "../tooltips/IngredientsTooltip";
import { EqualHeightElement } from "react-equal-height";
import { observer } from "mobx-react";
import { Loader } from "../Loader";
import { SvgIcon } from "../svg/SvgIcon";
import { LogoSvg } from "../svg/LogoSvg";
import { Switcher } from "../Switcher";
import { useState } from "react";
import { InfoTooltip } from "../InfoTooltip";
import { useTranslation } from "react-i18next";
import { useCartStore } from "~hooks/use-cart-store";
import { useProductsStore } from "~hooks/use-categories-store";
import { useWishlistStore } from "~hooks/use-wishlist-store";
import { Product } from "~models/Product";

const ProductCardRaw = ({ product }: { product: Product }) => {
  const CartStore = useCartStore();
  const ProductsStore = useProductsStore();
  const WishlistStore = useWishlistStore();

  const { id, name, weight } = product;
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const iconSize = isMobile ? "33px" : "25px";
  const ingredients = product.ingredients;
  const img = product.mainImage;
  const { t } = useTranslation();

  const mod_groups = product.propertyValues
    .filter((value) => {
      return value.property?.options?.length > 0;
    })
    .reduce((acc, property) => {
      if (acc.includes(property.property_id)) {
        return acc;
      }
      return [...acc, property.property_id];
    }, [])
    .map((id) => {
      return product.propertyValues.find(
        (property) => property.property_id === id
      );
    });

  const initialModificatorsState = mod_groups.reduce((acc, group) => {
    return {
      ...acc,
      [group.property.id]: group.property.options[0].poster_id,
    };
  }, {});

  const [modificators, setModificators] = useState(initialModificatorsState);

  const getVariant = (product: Product) => {
    return product.variants.find((variant) => {
      return !!Object.values(modificators).includes("" + variant.posterId);
    });
  };

  const getCartProduct = (product: Product) => {
    if (product.inventoryManagementMethod === "variant") {
      return CartStore.items.find(
        (cartProduct) =>
          cartProduct.productId === product.id &&
          cartProduct.variantId === getVariant(product)?.id
      );
    }
    return CartStore.items.find(
      (cartProduct) => cartProduct.productId === product.id
    );
  };

  const oldPrice = product.getOldPrice(getVariant(product));
  const newPrice = product.getNewPrice(getVariant(product));

  const cartProduct = getCartProduct(product);
  const count = cartProduct?.quantity || 0;

  const handleAdd = (product_id) => {
    return (quantity) => {
      CartStore.addProduct({
        product_id,
        quantity,
        variant_id: getVariant(product)?.id,
      });
    };
  };

  return (
    <S.Wrapper>
      <Loader loading={WishlistStore.pending.includes(id)} />
      <S.Favorite
        onClick={() => {
          WishlistStore.addItem({
            product_id: id,
            quantity: count,
          }).then((res) => {
            const items = ProductsStore.items.map((item) => {
              if (item.id === id) {
                item.isFavorite = res.data.added;
              }
              return item;
            });

            ProductsStore.setItems(items);
          });
        }}
      >
        <Favorite width={iconSize} isFavorite={product.isFavorite} />
      </S.Favorite>
      <S.Image src={img}>
        {!img && (
          <SvgIcon color={"white"} width={"80%"} style={{ opacity: 0.05 }}>
            <LogoSvg />
          </SvgIcon>
        )}
      </S.Image>
      <EqualHeightElement name={"product-name"}>
        <S.Name>{name}</S.Name>
        {mod_groups.map((group) => (
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
      </EqualHeightElement>
      <EqualHeightElement name={"description"}>
        <S.Description>
          <InfoTooltip label={t("menu.weightComment")}>
            <S.Weight>
              {weight !== 0 ? weight + "г" : ""}&nbsp;
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
          {ingredients.length !== 0 && (
            <IngredientsTooltip items={ingredients} iconSize={iconSize} />
          )}
        </S.Description>
      </EqualHeightElement>

      <S.Footer>
        <Price oldPrice={oldPrice} newPrice={newPrice} />
        <AddToCartButton
          count={count}
          pending={CartStore.pending.includes(id)}
          handleAdd={handleAdd(id)}
        />
      </S.Footer>
    </S.Wrapper>
  );
};

export const ProductCard = observer(ProductCardRaw);
