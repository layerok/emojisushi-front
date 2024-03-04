// import original module declarations
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      brand: string;
      brandDelimiter: string;
      ukrainianFlag: {
        sky: string;
        wheat: string;
      };
      fg: {
        default: string;
        muted: string;
        brandContrast: string;
      };
      danger: {
        canvas: string;
      };
      canvas: {
        default: string;
        inset: string;
        inset2: string;
        inset3: string;
        inset4: string;
        inset5: string;
      };
      border: {
        default: string;
      };
      skeleton: {
        baseColor: string;
        highlightColor: string;
      };
    };
    borderRadius: {
      default: string;
      smooth: string;
      lessSmooth: string;
      almostSquare: string;
    };
    shadows: {
      brand: string;
      brandSofter: string;
      canvasShadow: string;
      canvasInset2Shadow: string;
      canvasInsetShadow: string;
    };

    zIndices: {
      popovers: number;
      modals: number;
      sticky: number;
      tooltips: number;
      preloader: number;
    };

    components: {
      input: {
        placeholder: string;
      };
    };

    gradients: {
      fade: string;
    };
  }
}
