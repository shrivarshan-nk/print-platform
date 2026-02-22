'use client';

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { CampusProvider } from "@/contexts/CampusContext";
import { ShopProvider } from "@/contexts/ShopContext";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f5576c",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: '"Geist", sans-serif',
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CampusProvider>
        <ShopProvider>
          {children}
        </ShopProvider>
      </CampusProvider>
    </ThemeProvider>
  );
}
