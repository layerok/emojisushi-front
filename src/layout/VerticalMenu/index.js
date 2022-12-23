import * as S from "./styled";
import { useParams} from "react-router-dom";

const VerticalMenu = (
  {
    categories = [],
  }
) => {
  const {categorySlug} = useParams();

  return (
    <nav style={{width: "255px"}}>
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
}

export {
  VerticalMenu
}
