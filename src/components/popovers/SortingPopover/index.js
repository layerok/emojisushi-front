import {DropdownPopover} from "../DropdownPopover";
import {SortOrderButton} from "../../buttons/SortOrderButton";
import {inject} from "mobx-react";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const SortingPopoverRaw = (
    {
        ProductsStore
    }
) => {
    const initialSelectedIndex = (ProductsStore?.meta?.sort_options || []).indexOf(ProductsStore.sort);
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex === -1 ? 0 : initialSelectedIndex);
    const {t} = useTranslation();
    return <DropdownPopover
        asFlatArray={true}
        options={ProductsStore.meta.sort_options}
        resolveOptionName={({option}) => {
            return t(`sort.${option}`)
        }}
        selectedIndex={selectedIndex}
        onSelect={({option, index, close}) => {
            close();
            setSelectedIndex(index);
            ProductsStore.setSort(option);
            ProductsStore.fetchItems({
                ...ProductsStore.lastParams,
                sort: option
            })
        }}
    >
        {({selectedOption}) => (
            <SortOrderButton text={t(`sort.${selectedOption}`)}/>
        )}
    </DropdownPopover>
}

export const SortingPopover = inject('ProductsStore')(SortingPopoverRaw);