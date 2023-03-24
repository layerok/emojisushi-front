import * as S from "./styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SvgIcon } from "~components/svg/SvgIcon";
import { HorizontalArrowsSvg } from "~components/svg/HorizontalArrowsSvg";
import { FlexBox } from "~components/FlexBox";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCity, useSpot } from "~hooks";

const HorizontalMenu = ({ categories = [] }) => {
  const { t } = useTranslation();
  const { categorySlug } = useParams();
  const city = useCity();
  const spot = useSpot();
  return (
    <nav>
      <S.Categories>
        <S.Hint>
          <FlexBox alignItems={"center"}>
            <SvgIcon width={"25px"}>
              <HorizontalArrowsSvg />
            </SvgIcon>
            <div style={{ marginLeft: "10px" }}>{t("common.swipe")}</div>
          </FlexBox>
        </S.Hint>

        <S.HorizontalContainer>
          {categories.map((category) => {
            const active = categorySlug === category.slug;
            return (
              <S.Category
                to={
                  "/" +
                  city.slug +
                  "/" +
                  spot.slug +
                  "/category/" +
                  category.slug
                }
                isActive={active}
                key={category.id}
              >
                {category.name}
              </S.Category>
            );
          })}
        </S.HorizontalContainer>
      </S.Categories>
    </nav>
  );
};

export { HorizontalMenu };
