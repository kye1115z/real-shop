import { createContext, useContext } from "react";
import type { ThemeContextType } from "../contexts/ThemeContext";

export function useTheme() {
  const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme는 ThemeProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
}
