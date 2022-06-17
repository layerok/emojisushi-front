import * as S from "./styled";
import {useId} from "react";

const Option = (
    {
        option,
        index,
        length,
        idAccessor,
        nameAccessor,
        handleChange,
        selected,
        name
    }
) => {

    const internal_id = useId()



    return <>
        <S.Input
            length={length}
            index={index}
            id={internal_id}
            value={option[idAccessor]}
            type={"radio"}
            name={name}
            checked={selected}
            onChange={handleChange}
        />
        <S.Label htmlFor={internal_id}>{option[nameAccessor]}</S.Label>
    </>;
}

export const Switcher = (
    {
        options = [],
        name,
        handleChange,
        selected,
        nameAccessor = "name",
        idAccessor = "id",
        ...rest
    }
) => {

    const isSelected = (option) => {
        return typeof selected === 'function' ? selected(option): selected;
    }

    if(!options.length) {
        return "";
    }

    return <S.Wrapper {...rest}>
        {options.map((option, index) => (
            <Option  option={option}
                     length={options.length}
                     index={index}
                     idAccessor={idAccessor}
                     nameAccessor={nameAccessor}
                     name={name}
                     handleChange={(e) => handleChange({e, index, option})}
                     selected={isSelected(option)}
                     key={index}
            />
        ))}
        <S.Slide length={options.length}>
            {options.reduce((acc, option) => {
                if(isSelected(option)) {

                    return option[nameAccessor]
                }
                return acc;
            }, "")}
        </S.Slide>
    </S.Wrapper>
}