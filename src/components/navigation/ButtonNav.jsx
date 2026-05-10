"use client";

import { Fragment, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import { STEPS } from "@/lib/routes";
import { validateStep1, validateStep2, validateStep3 } from "@/lib/validation";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function ButtonNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { values } = useContext(CurriculumContext);
  const [visibleLabel, setVisibleLabel] = useState(null);
  const [generalError, setGeneralError] = useState(values?.generalError);

  const biggestPageReached = values?.biggestPageReached || 1;

  const validateFields = () => {
    const step1Invalid = !validateStep1(values);
    const step2Invalid = !validateStep2(values);
    const step3Invalid = !validateStep3(values);

    if ((step1Invalid || step2Invalid || step3Invalid) && biggestPageReached >= 4) {
      setGeneralError("Preencha Todos os campos");
      return false;
    }
    return true;
  };

  const handleNavigation = (link) => {
    if (!validateFields()) return;
    router.push(link);
  };

  return (
    <>
      <div className="xl:flex hidden items-center justify-center absolute left-1/2 transform -translate-x-1/2">
        {STEPS.map((item, index) => {
          const isStepActive = item.step <= biggestPageReached;
          const isCurrentStep = pathname === item.link;

          return (
            <Fragment key={item.step}>
              <div className="flex items-center justify-center relative">
                {isStepActive ? (
                  <div className="cursor-pointer" onClick={() => handleNavigation(item.link)}>
                    <div
                      className={`2xl:size-12 size-11 rounded-full flex items-center justify-center 2xl:text-2xl xl:text-xl text-white cursor-pointer ${
                        isCurrentStep ? "bg-StrongGray" : "bg-TitleGray"
                      }`}
                      onMouseEnter={() => setVisibleLabel(item.step)}
                      onMouseLeave={() => setVisibleLabel(null)}
                    >
                      {item.step}
                    </div>
                  </div>
                ) : (
                  <div
                    className="2xl:size-12 size-11 bg-BorderInputGray rounded-full flex items-center justify-center 2xl:text-2xl xl:text-xl text-white cursor-not-allowed"
                    onMouseEnter={() => setVisibleLabel(item.step)}
                    onMouseLeave={() => setVisibleLabel(null)}
                  >
                    {item.step}
                  </div>
                )}
                {(isCurrentStep || visibleLabel === item.step) && (
                  <span className="text-xs absolute top-14 bg-white text-black w-auto px-2 py-1 rounded-md shadow-lg">
                    {isCurrentStep ? "ATUAL" : item.label}
                  </span>
                )}
              </div>
              {index < STEPS.length - 1 && (
                <span
                  className={`w-28 h-1 ${
                    isStepActive ? "bg-TitleGray" : "bg-BorderInputGray"
                  }`}
                />
              )}
            </Fragment>
          );
        })}
      </div>
      <ErrorMessage message={generalError} onClose={() => setGeneralError("")} />
    </>
  );
}
