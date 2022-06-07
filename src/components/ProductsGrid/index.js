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
        ProductsStore,
        title = "Меню",
        categorySlug
    }
) => {
    const breakpoint = useBreakpoint();
    const handleLoadMore = () => {

        const settings = {
            offset: 0,
            limit: ProductsStore.items.length + ProductsStore.offset,
        }
        if(categorySlug) {
            settings.category_slug = categorySlug;
        }
        ProductsStore.fetchItems(settings);
    }
    return <>
        <S.Header>
            <S.Title>{title}</S.Title>
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
        <EqualHeight updateOnChange={breakpoint}>
            <S.Grid>
                {ProductsStore.items.map((product) => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </S.Grid>
        </EqualHeight>
        {ProductsStore.meta.total > ProductsStore.items.length && (
            <S.Footer>
                <LoadMoreButton loading={ProductsStore.loading} style={{cursor: 'pointer'}} text={"Показать еще..."} onClick={handleLoadMore}/>
            </S.Footer>
        )}

    </>
}

export const ProductsGrid = inject('CategoriesStore', 'ProductsStore', 'AppStore')(observer(ProductsGridRaw));