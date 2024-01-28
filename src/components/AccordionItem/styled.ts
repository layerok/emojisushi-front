import styled from "styled-components";
import media from "../../common/custom-media";

const Container = styled.div`
  padding: 15px;
  background: #1c1c1c;
  box-shadow: 0px 4px 15px rgba(28, 28, 28, 0.3);
  border-radius: 15px;
  width: 730px;
  font-size: 15px;
  ${media.lessThan("pc")`
    width: 350px;
        
  `}
`;

const MutedText = styled.p`
  color: #616161;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  ${media.lessThan("pc")`
    display: flex;
    align-items: center;    
  `}
`;

const HeaderMobileTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 286px;
  ${media.lessThan("pc")`
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 90px;
  `}
`;

const HeaderStatus = styled.p`
  color: #ffe600;
`;

const Pan = styled.div``;

const PanProps = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #2d2d2d;
  border-bottom: 1px solid #2d2d2d;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;

  ${media.lessThan("pc")`
    display: flex;
    flex-direction: column;   
  `}
`;

const PanPropsExceptStatus = styled.div`
  ${media.lessThan("pc")`
    border-bottom: 1px solid #2D2D2D; 
    padding-bottom: 10px;
  `}
`;
const PanPropsProp = styled.div`
  display: flex;
`;
const PanPropsPropLabel = styled.div`
  word-break: break-all;
  flex-shrink: 0;
  width: 201px;

  :first-child {
    padding-bottom: 10px;
  }

  ${media.lessThan("pc")`
    width: 210px;  
  `}
`;

const PanStatus = styled.div`
  display: flex;
  margin-right: 149px;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #2d2d2d;
  padding-left: 15px;

  ${media.lessThan("pc")`
    border-left: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0;
    padding-left: 0;
    padding-top: 10px;
  `}
`;

const PanStatusValue = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #ffe600;
  ${media.lessThan("pc")`
   word-break: break-word;
  `}
`;

const PanStatusLabel = styled.p``;

const PanPropsPropValue = styled.p`
  word-break: break-all;
  ${media.lessThan("pc")`
    display: flex;
    width: 95px;  
       margin-top: 5px;
  `}
`;

const PanProd = styled.div`
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #2d2d2d;
  padding-bottom: 10px;

  &:last-child {
    border: none;
    padding-bottom: 0;
  }
`;

const PanProdName = styled.p``;

const PanProdProp = styled.p`
  font-size: 13px;
  line-height: 16px;
`;

const PanProdImg = styled.img`
  width: 80px;
  height: 52px;
`;

const PanProdDescription = styled.div`
  display: flex;
  margin-top: 10px;
  width: 350px;
`;

const PanProdSect1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const PanVerticalStick = styled.div`
  border: 1px solid #ffffff;
  height: 13px;
  margin-left: 10px;
  margin-right: 10px;
`;

const PanProdPrice = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

const PanProdSect2 = styled.div`
  display: flex;
  ${media.lessThan("pc")`
    margin-top: 20px;
   
  `}
`;

const PanProdTotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 89px;
  ${media.lessThan("pc")`
    margin-top: 20px;
    justify-content: flex-start;
  `}
`;

const PanProdAmount = styled.p`
  font-size: 12px;
  line-height: 15px;
  color: #616161;
`;

const PanProdProps = styled.div`
  display: flex;
  width: 100%;
  ${media.lessThan("pc")`
    flex-direction: column;
  `}
`;

export {
  Container,
  MutedText,
  Header,
  HeaderStatus,
  HeaderMobileTextContainer,
  Pan,
  PanProd,
  PanProdPrice,
  PanProdProps,
  PanProdSect1,
  PanProdAmount,
  PanProdTotalPrice,
  PanProdImg,
  PanPropsPropValue,
  PanProdName,
  PanProdProp,
  PanProdSect2,
  PanProdDescription,
  PanProps,
  PanStatusValue,
  PanVerticalStick,
  PanStatus,
  PanStatusLabel,
  PanPropsPropLabel,
  PanPropsProp,
  PanPropsExceptStatus,
};
