// src/color-mode.jsx
import React from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Button, IconButton } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";

// Provider that adds a "class" (light/dark) to <html>, used by Chakra v3's _dark styles
export function ColorModeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

// Hook to read/toggle color mode
export function useColorMode() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mode = resolvedTheme ?? theme ?? "light";
  return {
    colorMode: mode,
    setColorMode: setTheme,
    toggleColorMode: () => setTheme(mode === "light" ? "dark" : "light"),
  };
}

// Hook that returns a value based on the current color mode
export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark ?? light : light;
}

// Ready-made toggle button (text)
export function ColorModeButton(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      variant="ghost"
      onClick={toggleColorMode}
      leftIcon={colorMode === "light" ? <Moon size={16} /> : <Sun size={16} />}
      {...props}
    >
      {colorMode === "light" ? "Dark mode" : "Light mode"}
    </Button>
  );
}

// Ready-made toggle icon button
export function ColorModeIconButton(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      variant="ghost"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
      {...props}
    />
  );
}
