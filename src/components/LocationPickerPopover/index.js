import * as S from "./styled";
import MapLocationPinSrc from "../../assets/ui/icons/map-location-pin.svg"
import {Popover} from "../Popover";
import branches from "../../common/mock/data/branches.json";
import {useState} from "react";
import {SvgIcon} from "../svg/SvgIcon";
import {CaretDownSvg} from "../svg/CaretDownSvg";
import {FlexBox} from "../FlexBox";
import {useBoolean} from "@huse/boolean";


export const LocationPickerPopover = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, methods] = useBoolean(false);
    const [forceClosed, setForceClosed] = useState(false);

    const handleClick = (index) => {
        setSelectedIndex(index);
        setForceClosed(true);
    }

    return (
        <>
            <Popover open={forceClosed ? false : open} setOpen={methods.toggle} render={() => (
                <S.Options  >
                    {branches.map(({name, id}, i) => (
                        <S.Option onClick={() => handleClick(i)} key={id}>
                            {name}
                        </S.Option>
                    ))}

                </S.Options>
            )}>
                <S.Container onClick={() => setForceClosed(false)} >
                    <FlexBox alignItems={"center"}>
                        <S.Icon>
                            <img src={MapLocationPinSrc} alt="location picker"/>
                        </S.Icon>
                        <S.Label>
                            {branches[selectedIndex].name}
                        </S.Label>
                    </FlexBox>

                    <S.CaretDown>
                        <SvgIcon color={"white"} width={"10px"}>
                            <CaretDownSvg/>
                        </SvgIcon>
                    </S.CaretDown>
                </S.Container>

            </Popover>

        </>
    );
}