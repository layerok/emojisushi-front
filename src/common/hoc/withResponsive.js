import {css} from "styled-components";
import {useCallback} from "react";

const media = (breakpoint, content, mobileFirst = true) => {
    const constraint = mobileFirst ? 'min': 'max';
    return `@media(${constraint}-width: ${breakpoint}) { ${content} }`;
}

const defaultResolve = (breakpoint, props) => {
    return media(breakpoint[0], css(breakpoint[1]), props.mobileFirst)
}

const generateResponsive = (prop = 'responsive', resolve = defaultResolve) => (props) => {
    if(!props[prop]) {
        return '';
    }
    return props[prop].reduce((acc, item) => {
        return acc + resolve(item, props)
    }, '')
}

export const withResponsive = (Component) => {
    return (props) => {
        const generateResponsiveMemo = useCallback(() => generateResponsive,[]);
        return <Component generateResponsive={generateResponsiveMemo} {...props}/>
    };
}