import {ProductCard} from "../ProductCard";
import * as S from "./styled";
import {FiltersButton} from "../buttons/FiltersButton";
import {FlexBox} from "../FlexBox";
import {LoadMoreButton} from "../buttons/LoadMoreButton";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import { EqualHeight } from 'react-equal-height';
import {FiltersModal} from "../modals/FiltersModal";
import {SortingPopover} from "../popovers/SortingPopover";
import {inject, observer} from "mobx-react";

const ProductsGridRaw = (
    {
        CategoriesStore,
        ProductsStore
    }
) => {
    const breakpoint = useBreakpoint();
    return <>
        <S.Header>
            <S.Title>{CategoriesStore.name}</S.Title>
            {breakpoint === 'pc' && (
                <FlexBox >
                    <FiltersModal>
                        <FiltersButton text={"Фильтры"}/>
                    </FiltersModal>
                    <div style={{marginLeft: "67px"}}>
                        <SortingPopover/>
                    </div>
                </FlexBox>
            )}
        </S.Header>
        <EqualHeight>
            <S.Grid>
                {ProductsStore.items.map((product) => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </S.Grid>
        </EqualHeight>

        <S.Footer>
            <LoadMoreButton text={"Показать еще..."}/>
        </S.Footer>
    </>
}

export const ProductsGrid = inject('CategoriesStore', 'ProductsStore')(observer(ProductsGridRaw));