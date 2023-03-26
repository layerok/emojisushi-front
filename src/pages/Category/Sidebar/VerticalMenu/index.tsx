import * as S from "./styled";
import { useParams } from "react-router-dom";
import { Loader } from "~components/Loader";
import { useCategoriesStore } from "~hooks/use-products-store";
import { observer } from "mobx-react";
import { useCity, useLang, useSpot } from "~hooks";

const VerticalMenu = observer(() => {
  const { categorySlug } = useParams();
  const CategoriesStore = useCategoriesStore();
  const categories = CategoriesStore.publishedCategories;
  const city = useCity();
  const spot = useSpot();
  const lang = useLang();

  return (
    <nav style={{ width: "255px", position: "relative" }}>
      <Loader loading={CategoriesStore.loading} />
      <S.Categories>
        {categories.map((category) => {
          const active = categorySlug === category.slug;
          return (
            <S.Category
              to={
                "/" +
                lang +
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
      </S.Categories>
    </nav>
  );
});

export { VerticalMenu };
