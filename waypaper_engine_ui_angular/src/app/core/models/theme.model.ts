export interface Theme {
  id: string;
  name: string;
  className: string;
  preview: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface ThemeWithDescription extends Theme {
  description: string;
  colors: ThemeColors;
}

