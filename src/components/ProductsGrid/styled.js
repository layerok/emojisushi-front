import styled from "styled-components";
import media from "../../common/custom-media";

const Grid = styled.div`
  display: grid;
  column-gap: 30px;
  row-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  
  ${media.lessThan('pc')`
    grid-template-columns: 1fr 1fr;
    width: 541px;
    margin: 30px auto 0;
  `}
  
  ${media.lessThan('tablet')`
    width: 100%;
    grid-template-columns: 1fr;
  `}
`

export {
    Grid
}