import styled from "styled-components";

const Search = styled.div`
  position: relative;
  width: 100%;
`;

const IconBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  transform-origin: center;
  padding: 0;
`;

export { Search, IconBtn };
