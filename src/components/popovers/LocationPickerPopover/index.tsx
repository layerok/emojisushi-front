import * as S from "./styled";
import { SvgIcon } from "../../svg/SvgIcon";
import { CaretDownSvg } from "../../svg/CaretDownSvg";
import { FlexBox } from "../../FlexBox";
import { DropdownPopover } from "../DropdownPopover";
import { observer } from "mobx-react";
import MapLocationPinSrc from "~assets/ui/icons/map-location-pin.svg";
import { useSpot } from "~hooks/use-spot";
import { useNavigate } from "react-router-dom";
import { useCity } from "~hooks/use-city";
import { useCitiesStore } from "~hooks/use-cities-store";
import { useLang } from "~hooks";

export const LocationPickerPopoverRaw = ({
  offset = 0,
  backgroundColor = "#171717",
  width = "211px",
}: {
  offset?: number;
  backgroundColor?: string;
  width?: string;
}) => {
  const navigate = useNavigate();

  const cities = useCitiesStore().items;
  const selectedSpot = useSpot();
  const selectedCity = useCity();
  const lang = useLang();

  const options = cities
    .map((city) =>
      city.spots.map((spot) => ({
        name: city.name + ", " + spot.name,
        id: city.id + "-" + spot.id,
        city: city,
        spot: spot,
      }))
    )
    .flat();

  const selectedOption = options.find(
    (option) =>
      option.city.id === selectedCity.id && option.spot.id === selectedSpot.id
  );
  const selectedIndex = options.indexOf(selectedOption);
  return (
    <>
      <DropdownPopover
        backgroundColor={backgroundColor}
        width={width}
        disable={true}
        offset={offset}
        options={options}
        selectedIndex={selectedIndex}
        onSelect={({ close, option, index }) => {
          navigate(
            "/" +
              lang +
              "/" +
              option.city.slug +
              "/" +
              option.spot.slug +
              "/category/roli"
          );
          close();
        }}
      >
        {({ selectedOption }) => (
          <S.Container>
            <FlexBox alignItems={"center"}>
              <S.Icon>
                <img src={MapLocationPinSrc} alt="location picker" />
              </S.Icon>
              <S.Label>{selectedOption.name}</S.Label>
            </FlexBox>

            <S.CaretDown>
              <SvgIcon color={"white"} width={"10px"}>
                <CaretDownSvg />
              </SvgIcon>
            </S.CaretDown>
          </S.Container>
        )}
      </DropdownPopover>
    </>
  );
};

export const LocationPickerPopover = observer(LocationPickerPopoverRaw);
