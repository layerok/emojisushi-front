import * as S from "./styled";
import { useParams} from "react-router-dom";
import {Loader} from "~components/Loader";
import {useCategoriesStore} from "~hooks/use-products-store";
import {observer} from "mobx-react";

const VerticalMenu = observer((
  {
    categories = [],
  }
) => {
  const {categorySlug} = useParams();
  const CategoriesStore = useCategoriesStore();

  return (
    <nav style={{width: "255px", position: "relative"}}>
      <Loader loading={CategoriesStore.loading}/>
      <S.Categories>
        {
          categories.map((category) => {
            const active = categorySlug === category.slug;
            return (
              <S.Category
                to={'/category/' + category.slug}
                isActive={active}
                key={category.id} >
                {category.name}
              </S.Category>
            )
          })
        }
      </S.Categories>
    </nav>
  );
})

export {
  VerticalMenu
}
