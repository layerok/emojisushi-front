import * as S from "./styled";

const VerticalMenu = (
    {
        categories = []
    }
) => {

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