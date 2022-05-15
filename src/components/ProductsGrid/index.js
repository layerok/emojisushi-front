import {ProductCard} from "../ProductCard";
import * as S from "./styled";
import {FiltersButton} from "../buttons/FiltersButton";
import {SortOrderButton} from "../buttons/SortOrderButton";
import {FlexBox} from "../FlexBox";
import {LoadMoreButton} from "../buttons/LoadMoreButton";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";

export const ProductsGrid = (
    {
        products
    }
) => {
    const breakpoint = useBreakpoint();
    return <>
        <S.Header>
            <S.Title>Роллы</S.Title>
            {breakpoint === 'pc' && (
                <FlexBox>
                    <FiltersButton text={"Фильтры"}/>
                    <SortOrderButton text={"Сначала дешевые"} style={{marginLeft: "67px"}}/>
                </FlexBox>
            )}
        </S.Header>
        <S.Grid>
            {products.map((product) => {
                return <ProductCard key={product.id} product={product}/>
            })}
        </S.Grid>
        <S.Footer>
            <LoadMoreButton text={"Показать еще..."}/>
        </S.Footer>
    </>
}