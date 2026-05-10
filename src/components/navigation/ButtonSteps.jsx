"use client";

import { useEffect, useRef, useState } from "react";
import { STEPS } from "@/lib/routes";

export default function ButtonSteps({ steps }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const remainingCount = Number(steps);
  const currentStep = STEPS.length - remainingCount;
  const remainingSteps = STEPS.filter((s) => s.step > currentStep);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="2xl:h-12 xl:h-11 h-10 w-auto xl:px-6 px-4 bg-TitleGray text-white flex items-center gap-x-3 justify-center rounded-3xl text-sm relative"
      >
        <span className="xl:text-2xl text-xl font-semibold">{steps}</span> Etapas Restantes
      </button>
      {isOpen && (
        <div className="xl:hidden absolute right-0 top-full mt-2 bg-white text-TitleGray rounded-md shadow-lg p-3 text-sm z-50 w-max">
          {remainingSteps.length > 0 ? (
            <>
              <p className="font-semibold mb-2">Faltam:</p>
              <ul className="flex flex-col gap-y-2">
                {remainingSteps.map((s) => (
                  <li key={s.step} className="flex items-center gap-x-2">
                    <span className="size-5 rounded-full bg-TitleGray text-white text-xs font-semibold flex items-center justify-center">
                      {s.step}
                    </span>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="font-semibold">Todas as etapas concluídas</p>
          )}
        </div>
      )}
    </div>
  );
}
