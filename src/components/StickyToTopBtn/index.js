import {SvgIcon} from "../svg/SvgIcon";
import {ArrowUpSvg} from "../svg/ArrowUpSvg";
import {Sticky} from "../Sticky";
import {useWindowScroll} from "react-use";

export const StickyToTopBtn = () => {
    const scroll = useWindowScroll();
    return <Sticky show={scroll.y > 500}
                   bottom={"calc(7% + 130px)"}
                   right={"calc(2% + 32px)"}>

            <SvgIcon width={"34px"} onClick={() => {
                window.scrollTo(0,0);
            }}>
                <ArrowUpSvg/>
            </SvgIcon>


    </Sticky>
}