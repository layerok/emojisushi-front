import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {CaretDownSvg} from "../../svg/CaretDownSvg";
import {FlexBox} from "../../FlexBox";
import {DropdownPopover} from "../DropdownPopover";
import { observer} from "mobx-react";
import {useSpotsStore} from "~hooks/use-spots-store";
import MapLocationPinSrc from "~assets/ui/icons/map-location-pin.svg"
import {useSpot} from "~hooks/use-spot";
import {useNavigate} from "react-router-dom";

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
  const spot = useSpot();
  const navigate = useNavigate();
  const selectedIndex = SpotsStore.items.indexOf(spot)

  return (
    <>
      <DropdownPopover
        backgroundColor={backgroundColor}
        width={width}
        offset={offset}
        options={SpotsStore.items}
        selectedIndex={selectedIndex}
        onSelect={({close, option, index}) => {
          navigate('/' + option.slug + '/category/roli')
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
