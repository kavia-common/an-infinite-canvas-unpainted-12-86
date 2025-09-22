import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UIContext = createContext(null);

// PUBLIC_INTERFACE
export function UIProvider({ children }) {
  /** Handles theme and basic UI state. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('blu_theme');
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('blu_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const value = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// PUBLIC_INTERFACE
export function useUI() {
  /** Hook to use UIContext */
  return useContext(UIContext);
}
