import { Scrollbars } from 'react-custom-scrollbars';
import * as S from "./styled";

export const CustomScrollbars = (
    {
        children,
        height,
        autoHide = false,
    }
) => {

    return <Scrollbars
        autoHide={autoHide}
        autoHideTimeout={1000}
        style={{height: height}}
        renderTrackVertical={({style: { width, ...restStyles}, ...props}) => {
            return (<S.TrackVertical {...props} style={{...restStyles}} />)
        }}
        renderThumbVertical={({style, ...props}) => (<S.ThumbVertical {...props} />)}
    >
        {children}
    </Scrollbars>
}