import * as S from "./styled";
import { SvgIcon, CaretDownSvg, FlexBox, DropdownPopover } from "~components";
import MapLocationPinSrc from "~assets/ui-icons/map-location-pin.svg";
import { ICity } from "@layerok/emojisushi-js-sdk";
import { observer } from "mobx-react";
import { appStore } from "~stores/appStore";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { citiesQuery } from "~queries/cities.query";
import { LOCATION_CONFIRMED_SEARCH_PARAM } from "~common/constants";
import { useTheme } from "styled-components";

type LocationPickerPopoverProps = {
  offset?: number;
  backgroundColor?: string;
  width?: string;
  cities?: ICity[];
};

export const LocationPickerPopover = observer(
  (props: LocationPickerPopoverProps) => {
    const theme = useTheme();
    const {
      offset = 0,
      backgroundColor = theme.colors.canvas.inset,
      width = "211px",
    } = props;
    const location = useLocation();
    const { data: cities, isLoading } = useQuery(citiesQuery);

    const options = (cities?.data || []).map((city) => ({
      id: city.slug,
      name: city.name,
    }));

    const selectedOption = options.find(
      (option) => option.id === appStore.city.slug
    );
    const selectedIndex = options.indexOf(selectedOption);
    return (
      <DropdownPopover
        backgroundColor={backgroundColor}
        width={width}
        offset={offset}
        options={options}
        selectedIndex={selectedIndex}
        onSelect={({ option, index }) => {
          const city = cities.data.find((city) => city.slug === option.id);
          window.location.href =
            city.frontend_url +
            location.pathname +
            `?${LOCATION_CONFIRMED_SEARCH_PARAM}=true`;
        }}
      >
        {({ selectedOption }) => (
          <S.Container>
            <FlexBox alignItems={"center"}>
              <S.Icon>
                <img src={MapLocationPinSrc} alt="location picker" />
              </S.Icon>
              <S.Label>{selectedOption?.name}</S.Label>
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
  }
);
