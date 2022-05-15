import styled from "styled-components";
import {theme} from "styled-tools";

const Categories = styled.div`
  position: relative;
  padding-top: 50px;
  .slick-slide {
    margin-right: 20px;
  }

  .slick-list {
    overflow: visible;
  }
`

const Hint = styled.div`
  position: absolute;
  top: 15px;
  right: 0
`

const Category = styled.div`
  display: flex;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;


  &:hover {
    color: ${theme('link.active')}
  }

  flex-shrink: 0;
  border: 1px solid white;
  border-radius: 5px;
  padding: 9px 23px;

  &:hover {
    border: 1px solid ${theme('link.active')}
  }
`

export {
    Categories,
    Category,
    Hint
}