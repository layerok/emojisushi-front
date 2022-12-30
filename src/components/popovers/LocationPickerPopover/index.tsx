import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {CaretDownSvg} from "../../svg/CaretDownSvg";
import {FlexBox} from "../../FlexBox";
import {DropdownPopover} from "../DropdownPopover";
import { observer} from "mobx-react";
import {useSpotsStore} from "~hooks/use-spots-store";
import {transaction} from "mobx";

import MapLocationPinSrc from "~assets/ui/icons/map-location-pin.svg"
import {useCategoriesStore} from "~hooks/use-products-store";
import {useProductsStore} from "~hooks/use-categories-store";
import {useCartStore} from "~hooks/use-cart-store";

export const LocationPickerPopoverRaw = (
  {
    offset = 0,
    backgroundColor = "#171717",
    width = "211px",
  }: {
    offset?: number;
    backgroundColor?: string;
    width?: string;
  }
) => {
  const SpotsStore = useSpotsStore();
  const CategoriesStore = useCategoriesStore();
  const ProductsStore = useProductsStore();
  const CartStore = useCartStore();

  return (
    <>
      <DropdownPopover
        backgroundColor={backgroundColor}
        width={width}
        offset={offset}
        options={SpotsStore.items}
        selectedIndex={SpotsStore.selectedIndex}
        onSelect={({close, option, index}) => {
          transaction(() => {
            transaction(() => {
              SpotsStore.select(option, () => {
                SpotsStore.setUserSelectedSpot(true);
                Promise.all([
                  CartStore.fetchItems(),
                  ProductsStore.fetchItems(ProductsStore.lastParams),
                  CategoriesStore.fetchItems()
                ])
              });
            })
          })
          close();
        }}
      >
        {({selectedOption}) => (
          <S.Container>
            <FlexBox alignItems={"center"}>
              <S.Icon>
                <img src={MapLocationPinSrc} alt="location picker"/>
              </S.Icon>
              <S.Label>
                {selectedOption.name}
              </S.Label>
            </FlexBox>

            <S.CaretDown>
              <SvgIcon color={"white"} width={"10px"}>
                <CaretDownSvg/>
              </SvgIcon>
            </S.CaretDown>
          </S.Container>
        )}
      </DropdownPopover>

    </>
  );
}


export const LocationPickerPopover = observer(LocationPickerPopoverRaw)
