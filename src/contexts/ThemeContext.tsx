"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ColorTheme = 'default' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'rose';
export type CardLayout = 'classic' | 'modern' | 'minimal' | 'detailed';
export type GraphDesign = 'circle' | 'progress' | 'bar' | 'minimal';

interface ThemeConfig {
  colorTheme: ColorTheme;
  cardLayout: CardLayout;
  graphDesign: GraphDesign;
}

interface ThemeContextType {
  themeConfig: ThemeConfig;
  setColorTheme: (theme: ColorTheme) => void;
  setCardLayout: (layout: CardLayout) => void;
  setGraphDesign: (design: GraphDesign) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'komari-theme-config';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return {
            colorTheme: 'default' as ColorTheme,
            cardLayout: 'classic' as CardLayout,
            graphDesign: 'circle' as GraphDesign,
          };
        }
      }
    }
    return {
      colorTheme: 'default' as ColorTheme,
      cardLayout: 'classic' as CardLayout,
      graphDesign: 'circle' as GraphDesign,
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeConfig));

      // Apply color theme to document root
      const root = document.documentElement;
      root.setAttribute('data-color-theme', themeConfig.colorTheme);
    }
  }, [themeConfig]);

  const setColorTheme = (theme: ColorTheme) => {
    setThemeConfig(prev => ({ ...prev, colorTheme: theme }));
  };

  const setCardLayout = (layout: CardLayout) => {
    setThemeConfig(prev => ({ ...prev, cardLayout: layout }));
  };

  const setGraphDesign = (design: GraphDesign) => {
    setThemeConfig(prev => ({ ...prev, graphDesign: design }));
  };

  return (
    <ThemeContext.Provider value={{ themeConfig, setColorTheme, setCardLayout, setGraphDesign }}>
      {children}
    </ThemeContext.Provider>
  );
};

