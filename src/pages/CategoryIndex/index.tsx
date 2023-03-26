import { Link } from 'react-router-dom';
import * as S from './styled';

import { useCategoriesStore, useCity, useLang, useSpot } from '~hooks';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '~components/svg/SvgIcon';
import { useIsMobile } from '~common/hooks/useBreakpoint';
import { LogoSvg } from '~components/svg/LogoSvg';
import { ToteSvg } from '~components/svg/ToteSvg';

export const CategoryIndex = () => {
  const { t } = useTranslation();
  const categoriesStore = useCategoriesStore();
  const city = useCity();
  const selectedSpot = useSpot();
  const lang = useLang();
  const isMobile = useIsMobile();

  return (
    <S.Category>
      <S.Category.Container>
        <S.Category.Label>
          {t("categoryIndex.title")}
          <SvgIcon width={isMobile ? "20px" : "25px"} color={"white"}>
            <ToteSvg />
          </SvgIcon>
        </S.Category.Label>
        <S.Category.Items>
          <ul>
            {categoriesStore.publishedCategories
              .filter((category) => {
                const hidden = category.hide_categories_in_spot.find(
                  (spot) => spot.id === selectedSpot.id
                );
                return !hidden;
              })
              .map((category) => (
                <li>
                  <Link
                    to={
                      "/" +
                      lang +
                      "/" +
                      city.slug +
                      "/" +
                      selectedSpot.slug +
                      "/" +
                      "category" +
                      "/" +
                      category.slug
                    }
                  >
                    <S.Category.Image>
                      {category.image.path ? (
                        <img src={category.image.path} alt="" />
                      ) : (
                        <SvgIcon color={"white"} width={"80%"}>
                          <LogoSvg />
                        </SvgIcon>
                      )}
                    </S.Category.Image>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </S.Category.Items>
      </S.Category.Container>
    </S.Category>
  );
};

export const Component = CategoryIndex;

Object.assign(CategoryIndex, {
  displayName: 'LazyCategoryIndex',
});

export const shouldRevalidate = ({currentParams, nextParams}) => {
  return currentParams.lang !== nextParams.lang;
}
