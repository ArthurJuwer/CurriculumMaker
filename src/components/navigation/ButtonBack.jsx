"use client";

import { useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import { STEP_NAVIGATION_BACK } from "@/lib/routes";
import { validateStep1, validateStep2, validateStep3 } from "@/lib/validation";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function ButtonBack() {
  const router = useRouter();
  const pathname = usePathname();
  const { values, setValues } = useContext(CurriculumContext);
  const [generalError, setGeneralError] = useState(values?.generalError);

  const biggestPageReached = values?.biggestPageReached || 1;

  const validateFields = () => {
    const step1Invalid = !validateStep1(values);
    const step2Invalid = !validateStep2(values);
    const step3Invalid = values?.formations ? !validateStep3(values) : false;

    if ((step1Invalid || step2Invalid || step3Invalid) && biggestPageReached >= 4) {
      setGeneralError("Preencha todos os campos obrigatórios para continuar.");
      return false;
    }
    return true;
  };

  const handleBackClick = () => {
    if (!validateFields()) return;

    setValues((prev) => ({ ...prev, generalError: "" }));
    const target = STEP_NAVIGATION_BACK[pathname];
    if (target) {
      router.push(target);
    } else {
      router.back();
    }
  };

  return (
    <>
      <button
        aria-label="Voltar"
        className="group flex items-center gap-1.5 lg:gap-2 h-[34px] lg:h-11 pl-1 pr-3 lg:pr-5 rounded-full bg-TitleGray text-white border border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.25)] active:scale-[0.96]"
        onClick={handleBackClick}
      >
        <span className="flex items-center justify-center size-6 lg:size-9 rounded-full bg-DefaultOrange text-white transition-transform duration-300 ease-out group-hover:-translate-x-0.5">
          <ChevronLeft className="size-3.5 lg:size-[18px]" strokeWidth={2.75} />
        </span>
        <span className="text-xs lg:text-sm font-semibold tracking-tight">Voltar</span>
      </button>
      <ErrorMessage message={generalError} onClose={() => setGeneralError("")} />
    </>
  );
}
