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
        products,
        MenuStore: {
            category_name
        }
    }
) => {
    const breakpoint = useBreakpoint();
    return <>
        <S.Header>
            <S.Title>{category_name}</S.Title>
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
                {products.map((product) => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </S.Grid>
        </EqualHeight>

        <S.Footer>
            <LoadMoreButton text={"Показать еще..."}/>
        </S.Footer>
    </>
}

export const ProductsGrid = inject('MenuStore')(observer(ProductsGridRaw));