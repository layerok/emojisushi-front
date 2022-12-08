import styled from "styled-components";
import {ifProp, prop} from "styled-tools";


const DropDown = styled.div`
  background: #1C1C1C;
  box-shadow: 0px 0px 15px rgba(34, 34, 34, 0.3);
  border-radius: ${ifProp("active", "10px 10px 0 0", "10px 10px 10px 10px")};
  width: ${prop("width","76px")};
  position: relative;
  height: 40px;
  margin-top: ${prop("marginTop", "0")};
`


const DropDownBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 15px;
  cursor: pointer;
  user-select: none;
`

const DropDownContent = styled.div`
  background: #1C1C1C;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 0 0 10px 10px;
  user-select: none;  
  cursor: pointer;
  position: absolute;
  width: 100%;
  z-index: 3;
`

const HorizontalBar = styled.div`
  width: 100%;
  border: 1px solid #2D2D2D;
  border-radius: 5px;
`

const DropDownItem = styled.div`
  padding: 10px 10px 10px 15px;
  border-radius: 10px;
  :hover {
    background: #141414;
  }
`


export {
    DropDown,
    DropDownBtn,
    DropDownContent,
    DropDownItem,
    HorizontalBar,
}