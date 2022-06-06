import {DropdownPopover} from "../DropdownPopover";
import {SortOrderButton} from "../../buttons/SortOrderButton";
import {useState} from "react";

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
    const [selectedIndex, setSelectedIndex] = useState(0);
    return <DropdownPopover options={SORTING_OPTIONS} selectedIndex={selectedIndex} onSelect={({close, index}) => {
        setSelectedIndex(index);
        close();
    }}>
        {({selectedOption}) => (
            <SortOrderButton text={selectedOption.name}/>
        )}
    </DropdownPopover>
}