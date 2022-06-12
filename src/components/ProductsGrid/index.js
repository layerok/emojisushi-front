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
import {useTranslation} from "react-i18next";
import {useDebounce} from "../../common/hooks/useDebounce";
import {Loader} from "../Loader";

const ProductsGridRaw = (
    {
        title = "Меню",
        items,
        handleLoadMore,
        loading,
        loadable,
        ProductsStore,
    }
) => {

    const breakpoint = useBreakpoint();

    const debouncedBreakpoint = useDebounce(() => {
        return breakpoint;
    }, 300)
    const {t} = useTranslation();
    return <div style={{position: "relative"}}>
        <Loader loading={ProductsStore.loading}/>
        <S.Header>
            <S.Title>{title}</S.Title>
            {breakpoint === 'pc' && (
                <FlexBox >
                    <FiltersModal>
                        <FiltersButton text={t('common.filters')}/>
                    </FiltersModal>
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
            ): t('common.not_found')}
        </EqualHeight>
        {loadable && (
            <S.Footer>
                <LoadMoreButton loading={loading} style={{cursor: 'pointer'}} text={t('common.show_more')} onClick={handleLoadMore}/>
            </S.Footer>
        )}
    </div>
}

export const ProductsGrid = inject('AppStore', 'ProductsStore')(observer(ProductsGridRaw));