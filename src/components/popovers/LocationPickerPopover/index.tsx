import * as S from "./styled";
import { SvgIcon } from "../../svg/SvgIcon";
import { CaretDownSvg } from "../../svg/CaretDownSvg";
import { FlexBox } from "../../FlexBox";
import { DropdownPopover } from "../DropdownPopover";
import MapLocationPinSrc from "~assets/ui/icons/map-location-pin.svg";
import {
  Await,
  useAsyncValue,
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { useCitySlug, useLang, useSpotSlug } from "~hooks";
import Skeleton from "react-loading-skeleton";
import { Suspense } from "react";
import { ICity } from "~api/access.api.types";
type LocationPickerPopoverProps = {
  offset?: number;
  backgroundColor?: string;
  width?: string;
};

export const LocationPickerPopover = (props: LocationPickerPopoverProps) => {
  const { width = "211px" } = props;

  const { citiesQuery } = useRouteLoaderData("ensureLocation") as any;

  return (
    <Suspense fallback={<Skeleton width={width} height={40} />}>
      <Await resolve={citiesQuery}>
        <AwaitedLocationPickerPopover {...props} />
      </Await>
    </Suspense>
  );
};

const AwaitedLocationPickerPopover = (props: LocationPickerPopoverProps) => {
  const citiesQuery = useAsyncValue() as any;

  const cities: ICity[] = citiesQuery.data;

  const { offset = 0, backgroundColor = "#171717", width = "211px" } = props;
  const navigate = useNavigate();
  const lang = useLang();
  const spotSlug = useSpotSlug();
  const citySlug = useCitySlug();

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
    (option) => option.city.slug === citySlug && option.spot.slug === spotSlug
  );
  const selectedIndex = options.indexOf(selectedOption);
  const location = useLocation();

  return (
    <>
      <DropdownPopover
        backgroundColor={backgroundColor}
        width={width}
        disable={false}
        offset={offset}
        options={options}
        selectedIndex={selectedIndex}
        onSelect={({ close, option, index }) => {
          const segments = location.pathname.split("/");
          // segments[0] is lang
          // segments[1] index is city
          // segments[2] index is spot
          const nextSegments = [
            lang,
            option.city.slug,
            option.spot.slug,
            ...segments.splice(4),
          ];
          const nextUrl = nextSegments.join("/");
          navigate("/" + nextUrl);
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
