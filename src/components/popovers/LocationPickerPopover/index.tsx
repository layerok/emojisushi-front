import * as S from "./styled";
import { SvgIcon, CaretDownSvg, FlexBox, DropdownPopover } from "~components";
import MapLocationPinSrc from "~assets/ui/icons/map-location-pin.svg";
import { ICity } from "~api/types";
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

    const options = (cities?.data || []).map((spot) => ({
      id: spot.slug,
      name: spot.name,
      url: spot.frontend_url,
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
        onSelect={({ close, option, index }) => {
          window.location.href =
            option.url +
            location.pathname +
            `?${LOCATION_CONFIRMED_SEARCH_PARAM}=true`;

          close();
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
