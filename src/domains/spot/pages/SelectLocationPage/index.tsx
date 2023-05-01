import * as S from "./styled";
import { MapPinSvg, LogoSvg, SvgIcon } from "~components";
import { useTranslation } from "react-i18next";
import { Cities, CitiesSkeleton } from "./components/City";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { City } from "~models";
import { IGetCitiesRes } from "~api/types";
import { queryClient } from "~query-client";
import { citiesQuery } from "~queries/cities.query";

export const SelectLocationPage = () => {
  const { t } = useTranslation();
  const { cities } = useLoaderData() as any;

  return (
    <S.Locations>
      <S.Locations.Container>
        <S.Locations.Head>
          <S.LogoWrapper>
            <SvgIcon width={"100%"}>
              <LogoSvg />
            </SvgIcon>
          </S.LogoWrapper>

          <S.Locations.Label>
            {t("spotsModal.title")}
            <S.MapWrapper>
              <SvgIcon width={"100%"} color={"white"}>
                <MapPinSvg />
              </SvgIcon>
            </S.MapWrapper>
          </S.Locations.Label>
        </S.Locations.Head>
        <S.Locations.Body>
          <Suspense fallback={<CitiesSkeleton />}>
            <Await
              resolve={cities}
              errorElement={<p>Error loading locations</p>}
            >
              {(cities: IGetCitiesRes) => (
                <Cities items={cities.data.map((json) => new City(json))} />
              )}
            </Await>
          </Suspense>
        </S.Locations.Body>
      </S.Locations.Container>
    </S.Locations>
  );
};

export const Component = SelectLocationPage;

Object.assign(Component, {
  displayName: "LazySelectLocationPage",
});

export const loader = () => {
  return defer({
    cities:
      queryClient.getQueryData(citiesQuery.queryKey) ??
      queryClient.fetchQuery(citiesQuery),
  });
};
