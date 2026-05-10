"use client";

import { createContext, useEffect, useState } from "react";

const STORAGE_KEY = "curriculumValues";
const MIGRATION_FLAG = "curriculumStorageMigratedV1";
const LEGACY_KEYS = ["formations", "languages", "certifications", "objective", "projects"];

export const CurriculumContext = createContext(null);

export function CurriculumProvider({ children }) {
  const [values, setValues] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(MIGRATION_FLAG) !== "1") {
        LEGACY_KEYS.forEach((key) => window.localStorage.removeItem(key));
        window.localStorage.setItem(MIGRATION_FLAG, "1");
      }
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setValues(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (values !== null) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }
  }, [values, hydrated]);

  return (
    <CurriculumContext.Provider value={{ values, setValues, hydrated }}>
      {children}
    </CurriculumContext.Provider>
  );
}
