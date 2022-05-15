import {ProductCard} from "../ProductCard";
import * as S from "./styled";

export const ProductsGrid = (
    {
        products
    }
) => {
    return <S.Grid>
        {products.map((product) => {
            return <ProductCard product={product}/>
        })}
    </S.Grid>
}