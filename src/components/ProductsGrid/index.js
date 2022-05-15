import {ProductCard} from "../ProductCard";
import * as S from "./styled";

export const ProductsGrid = (
    {
        products
    }
) => {
    return <S.Grid>
        {products.map((product) => {
            return <ProductCard key={product.id} product={product}/>
        })}
    </S.Grid>
}