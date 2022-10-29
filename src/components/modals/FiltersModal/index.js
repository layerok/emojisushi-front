import {cloneElement} from "react";
import {CheckboxFilter} from "../../CheckboxFilter";
import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {MagnifierSvg} from "../../svg/MagnifierSvg";
import {Modal} from "../Modal";
import {inject} from "mobx-react";
import {useTranslation} from "react-i18next";
import {productsService} from "../../../services/products.service";

export const FiltersModalRaw = (
    {
        children,
        ProductsStore
    }
) => {

    const records = ProductsStore.filters || [];
    const handleOnChange = ({e, item}) => {
        const {slug} = item;
        const checked = e.target.checked;
        const selectedFilters = getFilter(checked);
        ProductsStore.setSelectedFilters(selectedFilters);

        function getFilter(state) {
            if(state) {
                return [...ProductsStore.selectedFilters, slug]
            } else {
                return ProductsStore.selectedFilters.filter(f => f !== slug)
            }
        }

        productsService.fetchItems({
            ...ProductsStore.lastParams
        })

    }


    const {t} = useTranslation();
    return <Modal render={({close}) => (
        <S.Wrapper>
            <S.FilterMagnifier>
                <S.Text>
                    {t('filtersModal.search_filters')}
                </S.Text>
                <SvgIcon width={"25px"} style={{marginLeft: "13px"}}>
                    <MagnifierSvg/>
                </SvgIcon>
            </S.FilterMagnifier>
            <S.CheckboxWrapper>
                {records.map((item) => (
                    <CheckboxFilter
                        checked={ProductsStore.selectedFilters.includes(item.slug)}
                        key={item.slug}
                        handleOnChange={(e) => handleOnChange({e, item})}
                    >
                        {item.name}
                    </CheckboxFilter>
                ))}
            </S.CheckboxWrapper>
        </S.Wrapper>
    )}>
        {cloneElement(children)}
    </Modal>;
}

export const FiltersModal = inject('ProductsStore')(FiltersModalRaw);

