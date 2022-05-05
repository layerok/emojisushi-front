import styled from "styled-components";
import {prop} from "styled-tools";

const Flex = styled.div`
  display: flex;
  align-items: ${prop('alignItems')};
  justify-content: ${prop('justifyContent')};
  flex-direction: ${prop('flexDirection')};
  ${(props) => props.generateResponsive()}
`

export {
    Flex
}