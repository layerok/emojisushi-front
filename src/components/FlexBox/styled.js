import styled, {css} from "styled-components";
import {prop} from "styled-tools";

const media = (breakpoint, content) => {
    return `@media(min-width: ${breakpoint}) { ${content} }`;
}

const generateMedia = (prop, resolve) => (props) => {
    if(!props[prop]) {
        return '';
    }
    return props[prop].reduce(resolve, '')
}

const Flex = styled.div`
  display: flex;
  align-items: ${prop('alignItems')};
  justify-content: ${prop('justifyContent')};
  flex-direction: ${prop('flexDirection')};
  ${generateMedia('responsive', (acc, breakpoint) => {
    return acc + media(breakpoint[0], css(breakpoint[1]))
})}
`

export {
    Flex
}