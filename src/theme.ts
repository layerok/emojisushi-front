import { addAlphaToHexadecimal } from "~utils/addAlphaToHexadecimal";
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
    };
    shadows: {
      brand: string;
      brandSofter: string;
    };

    components: {
      input: {
        placeholder: string;
      };
    };
  }
}

const palette = {
  yellow: {
    400: "#f1da00",
    500: "#ffe600",
  },
  grey: {
    800: "#616161",
  },
} as const;

const ukrainianFlag = {
  sky: "#3459DD",
  wheat: "#ffe600",
};

const components = {
  input: {
    placeholder: palette.grey[800],
  },
};

export const theme: DefaultTheme = {
  colors: {
    brand: palette.yellow[500],
    brandDelimiter: palette.yellow[400],
    ukrainianFlag: ukrainianFlag,
  },
  shadows: {
    brand: addAlphaToHexadecimal(palette.yellow[500], 50),
    brandSofter: addAlphaToHexadecimal(palette.yellow[500], 30),
  },

  components,
};
