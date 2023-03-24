import * as S from "./styled";
import { SvgIcon } from "~components/svg/SvgIcon";
import { LogoSvg } from "~components/svg/LogoSvg";
import FadeLoader from "react-spinners/FadeLoader";
import { useBreakpoint } from "~common/hooks/useBreakpoint";

export const Preloader = () => {
  const breakpoint = useBreakpoint();
  const width = breakpoint === "mobile" ? "350px" : "540px";

  const override = {
    position: "absolute",
    left: "50%",
    top: "50%",
  };
  return (
    <S.Container>
      <SvgIcon color={"white"} width={width} style={{ opacity: 0.05 }}>
        <LogoSvg />
      </SvgIcon>
      <FadeLoader
        color={"#FFE600"}
        width={2}
        height={12}
        margin={10}
        loading={true}
        // @ts-ignore
        css={override}
      />
    </S.Container>
  );
};
