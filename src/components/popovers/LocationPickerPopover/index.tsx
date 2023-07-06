import * as S from "./styled";
import { SvgIcon, CaretDownSvg, FlexBox, DropdownPopover } from "~components";
import MapLocationPinSrc from "~assets/ui/icons/map-location-pin.svg";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { ICity } from "~api/types";
import { getFromLocalStorage, setToLocalStorage } from "~utils/ls.utils";

type LocationPickerPopoverProps = {
  offset?: number;
  backgroundColor?: string;
  width?: string;
  loading?: boolean;
  cities?: ICity[];
};

export const LocationPickerPopover = ({
  offset = 0,
  backgroundColor = "#171717",
  width = "211px",
  cities,
  loading,
}: LocationPickerPopoverProps) => {
  const navigate = useNavigate();

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
    (option) => option.spot.slug === getFromLocalStorage("selectedSpotSlug")
  );
  const selectedIndex = options.indexOf(selectedOption);
  if (loading) {
    return <Skeleton width={width} height={40} />;
  }
  return (
    <DropdownPopover
      backgroundColor={backgroundColor}
      width={width}
      offset={offset}
      options={options}
      selectedIndex={selectedIndex}
      onSelect={({ close, option, index }) => {
        setToLocalStorage("selectedSpotId", option.spot.id);
        setToLocalStorage("selectedSpotSlug", option.spot.slug);
        navigate("/category");
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
  );
};
