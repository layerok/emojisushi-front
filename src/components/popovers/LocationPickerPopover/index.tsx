import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {CaretDownSvg} from "../../svg/CaretDownSvg";
import {FlexBox} from "../../FlexBox";
import {DropdownPopover} from "../DropdownPopover";
import { observer} from "mobx-react";
import {useSpotsStore} from "~hooks/use-spots-store";
import {useAppStore} from "~hooks/use-app-store";
import {transaction} from "mobx";

import MapLocationPinSrc from "~assets/ui/icons/map-location-pin.svg"

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
  const AppStore = useAppStore();

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
            AppStore.setLoading(true);
            SpotsStore.changeSpot(option);
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
