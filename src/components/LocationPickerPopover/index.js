import * as S from "./styled";
import MapLocationPinSrc from "../../assets/ui/icons/map-location-pin.svg"
import {Popover} from "../Popover";
import branches from "../../common/mock/data/branches.json";
import {useState} from "react";
import {SvgIcon} from "../svg/SvgIcon";
import {CaretDownSvg} from "../svg/CaretDownSvg";
import {FlexBox} from "../FlexBox";


export const LocationPickerPopover = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleClick = (index) => {
        setSelectedIndex(index);
    }

    return (
        <>
            <Popover offset={22} open={false}  render={() => (
                <S.Options  >
                    {branches.map(({name, id}, i) => (
                        <S.Option onClick={() => handleClick(i)} key={id}>
                            {name}
                        </S.Option>
                    ))}

                </S.Options>
            )}>
                <S.Container>
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