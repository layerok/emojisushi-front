import styled, {css} from "styled-components";
import {ifProp, prop} from "styled-tools";

const Dropdown = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
`

const Reference = styled.div`
  display: flex;
  width: ${prop('width')}px;
  align-items: center;
  background-color: #1C1C1C;
  height: 40px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: ${ifProp('open', ifProp({placement: 'bottom'}, "15px 15px 0 0", "0 0 15px 15px"), "15px")};
  color: white;
`

const Content = styled.div`
  background-color: #1C1C1C;
  width: ${prop('width')}px;
  ${ifProp({
    placement: 'bottom'
  }, css`
    border-top: ${ifProp('open', "1px solid #2D2D2D")};
    border-radius: 0 0 15px 15px;
  `, css`
    border-bottom: ${ifProp('open', "1px solid #2D2D2D")};
    border-radius: 15px 15px 0 0;
  `)};
`


export {
    Reference,
    Dropdown,
    Content
}