import * as S from "./styled";
import categoriesJSON from "../../common/mock/data/categories.json";
import {useState} from "react";

const VerticalMenu = () => {
    const [categories, ] = useState(categoriesJSON)
    return (
        <nav>
            <S.Categories>
                {
                    categories.map((category) =>(
                        <S.Category key={category.id}>
                            {category.name}
                        </S.Category>
                    ))
                }
            </S.Categories>
        </nav>
    );
}

export {
    VerticalMenu
}