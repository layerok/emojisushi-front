import Skeleton from "react-loading-skeleton";
import { ICategory } from "~api/menu.api.types";
import { LogoSvg } from "~components/svg/LogoSvg";
import { SvgIcon } from "~components/svg/SvgIcon";
import { useCity, useCitySlug, useLang, useSpot, useSpotSlug } from "~hooks";
import * as S from "./styled";

const Image = ({ category }: { category?: ICategory }) => {
  const imageElement = category?.image?.path ? (
    <img src={category.image.path} alt="" />
  ) : (
    <SvgIcon color={"white"} width={"80%"}>
      <LogoSvg />
    </SvgIcon>
  );
  return imageElement;
};

export const Category = ({ category }: { category?: ICategory }) => {
  const lang = useLang();
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const to =
    "/" + [lang, citySlug, spotSlug, "category", category?.slug].join("/");

  return (
    <S.Item>
      <S.Link to={category ? to : undefined}>
        <S.Image>
          {category ? <Image category={category} /> : <Skeleton />}
        </S.Image>
        <span>{category?.name ?? <Skeleton />}</span>
      </S.Link>
    </S.Item>
  );
};
