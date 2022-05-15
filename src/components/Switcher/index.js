import * as S from "./styled";
import {useId, useState} from "react";

export const Switcher = (
    {
        options = [],
        name,
    }
) => {

    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleChange = (index) => {
        setSelectedIndex(index)
    }
    const Option = (
        {
            name,
            length,
            index
        }
    ) => {
        const id = useId()
       return <>
           <S.Input
               length={length}
               index={index}
               id={id}
               type={"radio"}
               name={name}
               checked={index === selectedIndex}
               onChange={() => handleChange(index)}
           />
           <S.Label htmlFor={id}>{name}</S.Label>
       </>
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
        <S.Slide>
            {options[selectedIndex]['name']}
        </S.Slide>
    </S.Wrapper>
}