import styled from "styled-components";

const TrackVertical = styled.div`
  position: absolute;
  width: 4px;
  background: #3D3D3D;
  right: 3px;
  bottom: 2px;
  top: 2px;
  border-radius: 3px;
  
`;

const ThumbVertical = styled.div`
  width: 6px;
  left: -1px;
  position: relative;
  cursor: pointer;
  background: #FFE600;
  box-shadow: 0 4px 15px rgba(255, 230, 0, 0.4);
  border-radius: 2px;
`;

export {
    TrackVertical,
    ThumbVertical
}