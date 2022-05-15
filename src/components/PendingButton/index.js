import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {SpinnerSvg} from "../svg/SpinnerSvg";

export const PendingButton = () => {
    return (<S.Button >
        <SvgIcon width={"25px"} color={"black"}>
            <SpinnerSvg/>
        </SvgIcon>
    </S.Button>)
}