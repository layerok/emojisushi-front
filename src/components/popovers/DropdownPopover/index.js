import * as S from "./styled";
import {Popover} from "../Popover";
import {cloneElement, useEffect, useState} from "react";

export const DropdownPopover = (
    {
        onSelect,
        options = [],
        asFlatArray = false,
        offset = 0,
        open = false,
        nameAccessor = "name",
        idAccessor = "id",
        selectedIndex,
        children,
        backgroundColor="#171717",
        resolveOptionName: resolveOptionNamePassed,
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

    const resolveOptionName = ({option}) => {
        if(resolveOptionNamePassed) {
            return resolveOptionNamePassed({option})
        }
        return asFlatArray ? option:  option[nameAccessor]
    }

    const resolveOptionId = ({option}) => {
        return asFlatArray ? option:  option[idAccessor]
    }

    return (
        <>
            <Popover offset={offset} open={open} render={({close}) => (
                <S.Options width={width} backgroundColor={backgroundColor}>
                    {options.map((option, index) => (
                        <S.Option onClick={() => handleSelect({close, option, index})} key={resolveOptionId({option, index})}>
                            {resolveOptionName({option, index})}
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