import styled from "styled-components";

const Container = styled.div`
  background: #141414;
  border-radius: ${({ theme }) => theme.borderRadius.smooth};
  width: 75px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Item = styled.div`
  color: #b6b6b6;
  font-weight: 400;
  cursor: pointer;
`;

export { Item, Container };
