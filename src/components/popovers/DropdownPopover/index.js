import * as S from "./styled";
import {Popover} from "../Popover";
import {cloneElement, useEffect, useState} from "react";

export const DropdownPopover = (
    {
        onSelect,
        options = [],
        offset = 0,
        open = false,
        nameAccessor = "name",
        idAccessor = "id",
        selectedIndex,
        children,
        backgroundColor="#171717",
        width = "100%"
    }
) => {

    const [selectedOption, setSelectedOption] = useState(options[selectedIndex]);

    useEffect(() => {
        setSelectedOption(options[selectedIndex]);
    }, [selectedIndex, options])

    const handleSelect = ({ close, option, index}) => {
        onSelect && onSelect({close, option, index});
    }

    const renderChildren = () => {
        if(typeof children === 'function') {
            return children({ selectedOption})
        } else {
            return cloneElement(children);
        }
    }

    return (
        <>
            <Popover offset={offset} open={open} render={({close}) => (
                <S.Options width={width} backgroundColor={backgroundColor}>
                    {options.map((option, index) => (
                        <S.Option onClick={() => handleSelect({close, option, index})} key={option[idAccessor]}>
                            {option[nameAccessor]}
                        </S.Option>
                    ))}

                </S.Options>
            )}>
                <div style={{cursor: 'pointer'}}>
                    {options.length > 0 && selectedOption && renderChildren()}
                </div>

            </Popover>

        </>
    );
}