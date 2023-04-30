import styled from "styled-components";
import media from "src/common/custom-media";

const BtnGroup = styled.div`
  display: flex;
  margin-top: 15px;
  ${media.lessThan("pc")`
    display: flex;
    flex-direction: column;
    
  `}
`;

const BtnWrapper = styled.div`
  margin-left: 20px;
  ${media.lessThan("pc")`
    margin-left: 0;
    margin-top: 20px;   
    
  `}
`;

const Properties = styled.div`
  width: 634px;

  background: #1c1c1c;
  box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  margin-top: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;

  ${media.lessThan("pc")`
    width: 350px;
   
  `}
`;

const Property = styled.div`
  display: flex;
  line-height: 18px;
  font-size: 15px;
  padding-top: 10px;
  :first-child {
    padding-top: 0;
  }
`;

Property.Label = styled.div`
  color: #616161;
  width: 270px;
  flex-shrink: 0;
  ${media.lessThan("pc")`
    width: 175px;
    
  `}
`;

Property.Value = styled.div`
  color: #ffffff;
  word-break: break-all;
`;

export const Birth = styled.div`
  margin-top: 30px;
`;

Birth.Heading = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
`;

Birth.Label = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #616161;
`;

Birth.Properties = styled.div`
  display: flex;
`;

Birth.Property = styled.div`
  margin-left: 35px;
  margin-top: 20px;
  :first-child {
    margin-left: 0;
  }
  ${media.lessThan("pc")`
   margin-left: 19px;
  `}
`;

const Sex = styled.div`
  margin-top: 20px;
`;
Sex.Label = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #616161;
`;

const HorizontalBar = styled.div`
  border: 1px solid #2d2d2d;
  margin-top: 30px;
`;

export { Properties, BtnGroup, BtnWrapper, Sex, HorizontalBar, Property };
