import Skeleton from "react-loading-skeleton";
import { ICategory } from "~api/menu.api.types";
import { SvgIcon, LogoSvg } from "~components";
import * as S from "./styled";
import { useParams } from "react-router-dom";

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
  const { lang, spotSlug, citySlug } = useParams();
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
