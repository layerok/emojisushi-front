import * as S from "./styled";
import {useId, useState} from "react";

export const Switcher = (
    {
        options = [],
        name,
        handleChange,
        selectedIndex,
    }
) => {
    const Option = (
        {
            name: text,
            length,
            index,
            id
        }
    ) => {
        const internal_id = useId()
        return <>
            <S.Input
                length={length}
                index={index}
                id={internal_id}
                value={id}
                type={"radio"}
                name={name}
                checked={index === selectedIndex}
                onChange={(e) => handleChange({e, index})}
            />
            <S.Label htmlFor={internal_id}>{text}</S.Label>
        </>;
    }

    if(!options.length) {
        return "";
    }

    return <S.Wrapper>
        {options.map(({id, name}, index) => (
            <Option
                name={name}
                id={id}
                index={index}
                length={options.length}
                key={index}
            />
        ))}
        <S.Slide length={options.length}>
            {options[selectedIndex]['name']}
        </S.Slide>
    </S.Wrapper>
}