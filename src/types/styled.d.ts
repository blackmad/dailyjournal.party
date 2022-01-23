// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      backgroundColor: string;
      textColor: string;
      textBackgroundColor: string;
      dotColor: string;
      borderColor: string;
    };
    fontFamily: string;
    borderRadius: string;
  }
}
