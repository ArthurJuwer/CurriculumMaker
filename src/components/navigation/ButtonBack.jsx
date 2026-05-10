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
      setGeneralError("Preencha Todos os campos");
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
        className="lg:h-12 py-2 lg:w-24 pl-4 h-10 w-[5.5rem] bg-TitleGray text-white flex items-center justify-center rounded-3xl relative"
        onClick={handleBackClick}
      >
        <ChevronLeft className="absolute left-1" />
        <h1>Voltar</h1>
      </button>
      <ErrorMessage message={generalError} onClose={() => setGeneralError("")} />
    </>
  );
}
