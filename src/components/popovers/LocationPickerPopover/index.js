import * as S from "./styled";
import MapLocationPinSrc from "../../../assets/ui/icons/map-location-pin.svg"
import {SvgIcon} from "../../svg/SvgIcon";
import {CaretDownSvg} from "../../svg/CaretDownSvg";
import {FlexBox} from "../../FlexBox";
import {DropdownPopover} from "../DropdownPopover";
import {inject, observer} from "mobx-react";
import LocalStorageApi from "../../../api/local-storage.api";
import CartApi from "../../../api/cart.api";


export const LocationPickerPopoverRaw = (
    {
        offset = 0,
        backgroundColor,
        width = "211px",
        SpotsStore,
        AppStore,
        CartStore,
        ProductsStore,
        CategoriesStore
    }
) => {

    return (
        <>
            <DropdownPopover
                backgroundColor={backgroundColor}
                width={width}
                offset={offset}
                options={SpotsStore.items}
                selectedIndex={SpotsStore.selectedIndex}
                onSelect={({close, option, index}) => {
                    AppStore.setLoading(true);
                    SpotsStore.setSelectedIndex(index);
                    SpotsStore.refresh();
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


export const LocationPickerPopover = inject('SpotsStore', 'CartStore', 'AppStore', 'ProductsStore', 'CategoriesStore')(observer(LocationPickerPopoverRaw))