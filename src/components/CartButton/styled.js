import styled from "styled-components";

const CartButton = styled.button`
  min-width: 170px;
  height: 40px;
  background: #FFE600;
  box-shadow: 0 0 15px rgba(255, 230, 0, 0.3);
  border-radius: 10px;
  color: black;
  padding: 0 24px;
  border: none;
  cursor: pointer;
  display: inline-block;
`;

const Icon = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Price = styled.div`
  margin-right: 15px;
`;

const Delimiter = styled.div`
  height: 30px;
  width: 1px;
  background-color: #000;
  margin-right: 15px;
`

const Count = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

export {
    CartButton,
    Price,
    Delimiter,
    Count,
    Icon
}