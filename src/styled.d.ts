// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      backgroundColor: string;
      textColor: string;
      dotColor: string;
      borderColor: string;
    };
  }
}
