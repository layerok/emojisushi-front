import {ProductCard} from "../ProductCard";
import * as S from "./styled";
import {FlexBox} from "../FlexBox";
import {LoadMoreButton} from "../buttons/LoadMoreButton";
import {useBreakpoint} from "~common/hooks/useBreakpoint";
import { EqualHeight } from 'react-equal-height';
import {SortingPopover} from "../popovers/SortingPopover";
import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {useDebounce} from "~common/hooks/useDebounce";
import {Loader} from "../Loader";
import {useProductsStore} from "~hooks/use-categories-store";

const ProductsGridRaw = (
    {
        title = "Меню",
        items,
        handleLoadMore,
        loading,
        loadable,
    }
) => {
    const ProductsStore = useProductsStore();
    const breakpoint = useBreakpoint();

    const debouncedBreakpoint = useDebounce(() => {
        return breakpoint;
    }, 300)
    const {t} = useTranslation();
    return <div style={{position: "relative"}}>
        <Loader loading={ProductsStore.loading}/>
        <S.Header>
            <S.Title>{ProductsStore.search ? `${t('search.everywhere')} "${ProductsStore.search}"` : title}</S.Title>
            {breakpoint === 'pc' && (
                <FlexBox >
 {/*                   <FiltersModal>
                        <FiltersButton text={t('common.filters')}/>
                    </FiltersModal>*/}
                    <div style={{marginLeft: "67px"}}>
                        <SortingPopover/>
                    </div>
                </FlexBox>
            )}
        </S.Header>
        <EqualHeight updateOnChange={debouncedBreakpoint}>
            {items.length !== 0 ? (
                <S.Grid>
                    {items.map((product) => {
                        return <ProductCard key={product.id} product={product}/>
                    })}
                </S.Grid>
            ): loading ? t('products.loading'): t('common.not_found')}
        </EqualHeight>
        {loadable && (
            <S.Footer>
                <LoadMoreButton loading={loading} style={{cursor: 'pointer'}} text={t('common.show_more')} onClick={handleLoadMore}/>
            </S.Footer>
        )}
    </div>
}

export const ProductsGrid = observer(ProductsGridRaw);
