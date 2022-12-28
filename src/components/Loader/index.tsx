import styled from "styled-components"
import FadeLoader from "react-spinners/FadeLoader";

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: #141414;
  opacity: 0.7;
  z-index: 100;
`
const override = {
    position: 'absolute',
    left: '50%',
    top: '50%'
};

export const Loader = ({loading}) => {

    return loading && <Overlay>
        <FadeLoader
          color={"#FFE600"}
          width={2}
          height={12}
          margin={10}
          loading={true}
          // @ts-ignore
          css={override}
        />
    </Overlay>
}
