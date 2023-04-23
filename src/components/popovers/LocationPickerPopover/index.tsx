import * as S from "./styled";
import { SvgIcon, CaretDownSvg, FlexBox, DropdownPopover } from "~components";
import MapLocationPinSrc from "~assets/ui/icons/map-location-pin.svg";
import {
  Await,
  useAsyncValue,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Suspense } from "react";
import { IGetCitiesResponse } from "~api/access.api.types";
type LocationPickerPopoverProps = {
  offset?: number;
  backgroundColor?: string;
  width?: string;
};

export const LocationPickerPopover = (props: LocationPickerPopoverProps) => {
  const { width = "211px" } = props;

  const { cities } = useLoaderData() as any;

  return (
    <Suspense fallback={<Skeleton width={width} height={40} />}>
      <Await resolve={cities}>
        <AwaitedLocationPickerPopover {...props} />
      </Await>
    </Suspense>
  );
};

const AwaitedLocationPickerPopover = (props: LocationPickerPopoverProps) => {
  const cities = useAsyncValue() as IGetCitiesResponse;

  const { offset = 0, backgroundColor = "#171717", width = "211px" } = props;
  const navigate = useNavigate();
  const { lang, citySlug, spotSlug } = useParams();

  const options = cities.data
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
