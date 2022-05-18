import styled from "styled-components";

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const Phones = styled.div`
  display: flex;
  margin-top: 33px;
  align-items: center;
`;

const Phone = styled.span`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const Socials = styled.div`
  display: flex;
  margin-top: 20px;
`

export {
    Title,
    Wrapper,
    Phones,
    Phone,
    Socials,
}