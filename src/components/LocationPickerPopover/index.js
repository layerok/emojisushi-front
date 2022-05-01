import * as S from "./styled";
import MapLocationPinSrc from "../../assets/ui/icons/map-location-pin.svg"
import CaretDownSrc from "../../assets/ui/icons/caret-down.svg"
import {Popover} from "../Popover";


export const LocationPickerPopover = () => {


    return (
        <>
            <Popover render={() => (
                <S.Options  >
                    <S.Option>
                        Одесса, Базарная 69
                    </S.Option>
                    <S.Option>
                        Одесса, Базарная 69
                    </S.Option>
                </S.Options>
            )}>
                <S.Container  >
                    <S.Icon>
                        <img src={MapLocationPinSrc} alt="location picker"/>
                    </S.Icon>
                    <S.Label>
                        Одесса, Базарная 69
                    </S.Label>
                    <S.CaretDown>
                        <img src={CaretDownSrc} alt="caret down"/>
                    </S.CaretDown>
                </S.Container>

            </Popover>

        </>
    );
}