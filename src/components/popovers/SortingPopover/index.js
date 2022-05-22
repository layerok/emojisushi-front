import {DropdownPopover} from "../DropdownPopover";
import {SortOrderButton} from "../../buttons/SortOrderButton";

const SORTING_OPTIONS = [
    {
        id: 0,
        name: "По умолчанию"
    },
    {
        id: 1,
        name: "Сначало дорогие"
    },
    {
        id: 2,
        name: "Сначало дешевые"
    },
    {
        id: 3,
        name: "Сначало новые"
    },
    {
        id: 4,
        name: "Сначало старые"
    },
]

export const SortingPopover = () => {
    return <DropdownPopover options={SORTING_OPTIONS} onSelect={({close}) => {
        close();
    }}>
        {({selectedOption}) => (
            <SortOrderButton text={selectedOption.name}/>
        )}
    </DropdownPopover>
}