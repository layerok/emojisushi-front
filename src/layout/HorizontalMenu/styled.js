import styled from "styled-components";
import {theme} from "styled-tools";

const Categories = styled.div`
  margin-top: 30px;
  .slick-slide {
    margin-right: 20px;
  }

  .slick-list {
    overflow: visible;
  }
`

const Category = styled.div`
  display: flex;
  margin-top: 20px;
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
}