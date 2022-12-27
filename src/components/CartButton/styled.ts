import styled from "styled-components";

const Icon = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Price = styled.div`
  margin-right: 15px;
  flex-shrink: 0;
`;

const Delimiter = styled.div`
  height: 30px;
  width: 1px;
  background-color: #000;
  margin-right: 15px;
  flex-shrink: 0;
`

const Count = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

export {
    Price,
    Delimiter,
    Count,
    Icon
}