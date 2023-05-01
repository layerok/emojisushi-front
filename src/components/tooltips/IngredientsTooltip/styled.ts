import styled from "styled-components";
import media from "~common/custom-media";

const Wrapper = styled.div`
  width: 255px;
  border-radius: 15px;
  background: #343434;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  padding: 10px;
`;

const Title = styled.div``;

const List = styled.ul`
  margin-top: 15px;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-size: 13px;
  line-height: 16px;
  position: relative;

  :before {
    content: "";
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 100%;
    top: 7px;
    left: -12px;
  }
`;

const IconWrapper = styled.div`
  width: 25px;
  ${media.greaterThan("mobile")`
  width: 33px;
`}
`;

export { Wrapper, Title, List, ListItem, IconWrapper };
