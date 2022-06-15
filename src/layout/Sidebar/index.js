import * as S from "./styled";
import {VerticalMenu} from "../VerticalMenu";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {HorizontalMenu} from "../HorizontalMenu";
import {FiltersButton} from "../../components/buttons/FiltersButton";
import {FlexBox} from "../../components/FlexBox";
import {UnderVerticalMenu} from "../UnderVerticalMenu";
import {SortingPopover} from "../../components/popovers/SortingPopover";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDebounce} from "../../common/hooks/useDebounce";
import {FiltersModal} from "../../components/modals/FiltersModal";

export const SidebarRaw = (
    {
        CategoriesStore,
        ProductsStore,
    }
) => {

    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';

    useEffect(() => {
        CategoriesStore.fetchItems();
    }, [])

    const debouncedFetch = useDebounce((e) => {

            ProductsStore.fetchItems({
                ...ProductsStore.lastParams,
                filter: "&category_id=" + CategoriesStore.items.map(_=>_.id).join('.')
            });
    }, 500)

    const {t} = useTranslation();
    return (
        <S.Sidebar>
            <FlexBox
                style={{width:"100%"}}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={isMobile ? 'column': 'row'}
            >

                <S.SearchInput  handleInput={(e) => {
                    ProductsStore.setSearch(e.target.value);
                    debouncedFetch()
                }} value={ProductsStore.search}/>


                {breakpoint !== 'pc' && (
                    <FlexBox justifyContent={isMobile ? 'space-between': 'flex-end'} style={{
                        width: "100%"
                    }}>
           {/*             <FiltersModal>
                            <FiltersButton text={t('common.filters')} />
                        </FiltersModal>*/}
                        <div style={{
                            marginLeft: "30px"
                        }}>
                            <SortingPopover/>
                        </div>
                    </FlexBox>
                )}
            </FlexBox>
            {breakpoint === 'pc' ? (
                <>
                    <VerticalMenu categories={CategoriesStore.items}/>
                    <UnderVerticalMenu/>
                </>
            ): (
                <HorizontalMenu categories={CategoriesStore.items}/>
            )}

        </S.Sidebar>
    );
}

export const Sidebar = inject('CategoriesStore', 'ProductsStore')(observer(SidebarRaw));