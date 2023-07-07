import * as S from "./styled";
import Skeleton from "react-loading-skeleton";
import { ICity } from "~api/types";
import { MapPinSvg, SvgIcon } from "~components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Cities = ({ items }: { items: ICity[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <S.Cities>
      {items.map((city, index) => (
        <S.City key={index}>
          <span>{city.name}</span>
          <S.Spots>
            {city.spots.map((spot, index) => (
              <S.Spot.Link
                key={index}
                to={"/category"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/category");
                }}
              >
                <S.Spot.Inner>
                  <S.Spot.Content>
                    <S.Spot.Head>
                      {t("common.address")}
                      <SvgIcon width={"15px"} color={"#FFE600"}>
                        <MapPinSvg />
                      </SvgIcon>
                    </S.Spot.Head>
                    {spot?.address}
                  </S.Spot.Content>
                </S.Spot.Inner>
              </S.Spot.Link>
            ))}
          </S.Spots>
        </S.City>
      ))}
    </S.Cities>
  );
};

export const CitiesSkeleton = () => {
  return (
    <S.Cities>
      <S.City>
        <span>
          <Skeleton width={170} />
        </span>
        <S.Spots>
          <S.Spot.Link to={undefined}>
            <S.Spot.Inner>
              <S.Spot.Content>
                <S.Spot.Head>
                  <Skeleton width={50} />
                  <SvgIcon width={"15px"} color={"#FFE600"}>
                    <MapPinSvg />
                  </SvgIcon>
                </S.Spot.Head>
                <Skeleton />
              </S.Spot.Content>
            </S.Spot.Inner>
          </S.Spot.Link>
          <S.Spot.Link to={undefined}>
            <S.Spot.Inner>
              <S.Spot.Content>
                <S.Spot.Head>
                  <Skeleton width={50} />
                  <SvgIcon width={"15px"} color={"#FFE600"}>
                    <MapPinSvg />
                  </SvgIcon>
                </S.Spot.Head>
                <Skeleton />
              </S.Spot.Content>
            </S.Spot.Inner>
          </S.Spot.Link>
        </S.Spots>
      </S.City>
    </S.Cities>
  );
};
