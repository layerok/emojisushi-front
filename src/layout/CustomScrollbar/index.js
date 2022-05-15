import { Scrollbars } from 'react-custom-scrollbars';
import {useWindowSize} from "react-use";
import * as S from "./styled";

export const CustomScrollbars = (
    {
        children,
        autoHide = false,
    }
) => {
    const windowSize = useWindowSize();
    return <Scrollbars
        autoHide={false}
        autoHideTimeout={1000}
        style={{height: windowSize.height}}
        renderTrackVertical={({style: {width, ...restStyle}, ...props}) => (<S.TrackVertical {...props} style={restStyle} />)}
        renderThumbVertical={({style, ...props}) => (<S.ThumbVertical {...props} />)}
    >
        {children}
    </Scrollbars>
}