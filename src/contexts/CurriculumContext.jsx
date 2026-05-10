"use client";

import { createContext, useEffect, useState } from "react";

const STORAGE_KEY = "curriculumValues";

export const CurriculumContext = createContext(null);

const readStoredValues = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export function CurriculumProvider({ children }) {
  const [values, setValues] = useState(readStoredValues);

  useEffect(() => {
    if (values !== null) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }
  }, [values]);

  return (
    <CurriculumContext.Provider value={{ values, setValues }}>
      {children}
    </CurriculumContext.Provider>
  );
}
