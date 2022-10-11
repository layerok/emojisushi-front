import * as S from "./styled";
import {useState} from "react";
import {CheckSvg} from "../svg/CheckSvg";
import {SvgIcon} from "../svg/SvgIcon";


export const Checkbox = (
    {
        children,
        initialChecked,
        name,
        onChange,
        error
    }
) => {
    const [checked, setChecked] = useState(initialChecked);


    return (
        <S.LabelCheck>
            <S.Checkbox  type="checkbox" name={name} onChange={(e)=>{
                setChecked(e.target.checked)
                onChange && onChange(e.target.checked);
            }} />
            <S.LabelCheckbox>
                {(checked) && (
                    <SvgIcon width={"17px"} height={"12px"}>
                        <CheckSvg/>
                    </SvgIcon>
                )}
            </S.LabelCheckbox>
            <S.Text>
                {children}
            </S.Text>
            { error && (
                <S.Error>
                    {error}
                </S.Error>
            )}
        </S.LabelCheck>

    )
}