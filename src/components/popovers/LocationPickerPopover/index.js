import * as S from "./styled";
import MapLocationPinSrc from "../../../assets/ui/icons/map-location-pin.svg"
import branches from "../../../common/mock/data/branches.json";
import {SvgIcon} from "../../svg/SvgIcon";
import {CaretDownSvg} from "../../svg/CaretDownSvg";
import {FlexBox} from "../../FlexBox";
import {DropdownPopover} from "../DropdownPopover";


export const LocationPickerPopover = () => {

    return (
        <>
            <DropdownPopover offset={22} options={branches} onSelect={({close}) => {
                close();
            }}>
                {({selectedOption}) => (
                    <S.Container>
                        <FlexBox alignItems={"center"}>
                            <S.Icon>
                                <img src={MapLocationPinSrc} alt="location picker"/>
                            </S.Icon>
                            <S.Label>
                                {selectedOption.name}
                            </S.Label>
                        </FlexBox>

                        <S.CaretDown>
                            <SvgIcon color={"white"} width={"10px"}>
                                <CaretDownSvg/>
                            </SvgIcon>
                        </S.CaretDown>
                    </S.Container>
                )}
            </DropdownPopover>

        </>
    );
}