import styled from "styled-components";
import { prop } from "styled-tools";
import media from "../../../../common/custom-media";

const Wrapper = styled.div`
  width: 540px;

  ${media.lessThan("pc")`
    width: 350px;
  `}

  ${media.lessThan("tablet")`
    margin-top: 30px;
    margin-bottom: 50px;
  `}
`;

const Item = styled.div`
  background: #1c1c1c;
  box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  padding: 22px 61px 22px 33px;
  display: flex;
  margin-top: 30px;
  :first-child {
    margin-top: 0;
  }

  ${media.lessThan("pc")`
    padding: 29px 15px;
  `}
`;

const Image = styled.div`
  width: 190px;
  height: 122px;
  background-image: url("${prop("src")}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  ${media.lessThan("pc")`
    width: 100px;
    height: 64px;
  `}
`;

const EditButton = styled.div`
  margin-top: 20px;
`;

const Content = styled.div`
  margin-left: 25px;
  width: 100%;
`;

const Name = styled.div`
  margin-top: 5px;
`;

const Description = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.lessThan("pc")`
    margin-top: 21px;
  `}
`;

const Weight = styled.div`
  font-size: 13px;
  line-height: 16px;
`;

const Count = styled.div`
  font-size: 13px;
  line-height: 16px;
`;

const Delimiter = styled.div`
  position: relative;
  top: 2px;
  height: 13px;
  width: 1px;
  background-color: white;
  margin: 0 10px;
`;

const Price = styled.div`
  margin-top: 30px;
  ${media.lessThan("pc")`
    margin-top: 10px;
  `}
`;

export {
  Item,
  Wrapper,
  Image,
  Content,
  Name,
  Description,
  Weight,
  Count,
  Delimiter,
  Price,
  EditButton,
};
