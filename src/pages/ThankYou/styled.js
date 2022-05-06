import styled from "styled-components";
import media from "../../common/custom-media";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Text = styled.p`
  width: 469px;
  font-size: 15px;
  text-align: center;
  margin-top: 0;
  ${media.lessThan("pc")`
      width: 350px;
    `
  }
`;
const MediumText = styled.p`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  ${media.lessThan("pc")`
      width: 350px;
    `
  }
`;

export {
    Center,
    Text,
    MediumText
}