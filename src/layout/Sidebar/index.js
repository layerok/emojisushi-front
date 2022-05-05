import * as S from "./styled";
import {SearchInput} from "../../components/SearchInput";
import {useState} from "react";
import categoriesJSON from "../../common/mock/data/categories.json";

export const Sidebar = () => {

    const [categories, ] = useState(categoriesJSON)

    return (
        <S.Sidebar>
            <div>
                <SearchInput/>
            </div>
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

        </S.Sidebar>
    );
}