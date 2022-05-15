import styled from "styled-components";
import {prop} from "styled-tools";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 255px;
  border-radius: 15px;
  background-color: #1C1C1C;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  padding: 22px 12px 18px;
`;

const Image = styled.div`
  background-image: url("${prop("src")}");
  width: 190px;
  height: 122px;
  margin: 0 auto;
`;

const Name = styled.div`
  margin-top: 30px;
`;

const Description = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;

`;

const Weight = styled.div`
  font-size: 13px;
  line-height: 16px;
`;

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Favorite = styled.div`
  position: absolute;
  top: 22px;
  right: 12px;

`


export {
    Wrapper,
    Image,
    Name,
    Description,
    Weight,
    Footer,
    Favorite
}