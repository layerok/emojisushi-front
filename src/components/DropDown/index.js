import * as S from "./styled"
import {SvgIcon} from "../svg/SvgIcon";
import {CaretDownSvg} from "../svg/CaretDownSvg";
import {useState} from "react";


export const DropDown = (
    {
        options = [],
        width,
        marginTop,
        initialValue = [],
    }
) => {

    const [ active, setActive] = useState(false);
    const [selected, setSelected] = useState(initialValue);

    return (
        <S.DropDown marginTop={marginTop} selected={selected} setSelected={setSelected} width={width} active={active}>

            <S.DropDownBtn onClick={(e) => {
                setActive(!active)
            }}>
                {selected}

                <SvgIcon width={"15px"}>
                    <CaretDownSvg/>
                </SvgIcon>
            </S.DropDownBtn>
            {active && (
                <S.DropDownContent>
                    <S.HorizontalBar/>
                    {options.map(option => (
                            <S.DropDownItem onClick={ (e) => {
                                setSelected(option)
                                setActive(false)
                            }}>{option}</S.DropDownItem>
                        )
                    )}


                </S.DropDownContent>
            )}

        </S.DropDown>

    )
}