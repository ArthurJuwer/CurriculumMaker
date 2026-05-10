"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import { ROUTES } from "@/lib/routes";
import StepNavigator from "./StepNavigator";

const STEPS = [
  { numberStep: "1", textStep: "Clique no botão" },
  { numberStep: "2", textStep: "Insira seus dados" },
  { numberStep: "3", textStep: "Baixe o currículo" },
];

export default function LandingView() {
  const [linkToGo, setLinkToGo] = useState(ROUTES.models);
  const { setValues } = useContext(CurriculumContext);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("curriculumValues") !== null) {
      setLinkToGo(ROUTES.selectMethod);
    }
    setValues((prev) => ({ ...prev, generalError: "" }));
  }, []);

  return (
    <div className="w-full h-dvh bg-DefaultGray flex flex-col justify-center items-center 2xl:gap-y-40 xl:gap-y-24 gap-y-16">
      <div className="flex flex-col justify-center items-center text-center gap-y-8">
        <h1 className="font-black 2xl:text-6xl lg:text-5xl text-3xl text-StrongGray xl:w-8/12 w-11/12">
          Monte seu Currículo Vencedor Gratuito e Rápido
        </h1>
        <p className="text-WeakGray xl:w-1/2 lg:w-3/5 w-4/5 xl:text-base text-sm">
          O aplicativo foi elaborado para atender às “regras de currículo” que os recrutadores
          valorizam. Diferencie-se e acelere sua contratação com um modelo comprovado na prática.
        </p>
        <Link href={linkToGo}>
          <button className="bg-DefaultOrange xl:p-4 xl:w-96 w-80 p-3 rounded-xl text-white shadow-2xl font-bold">
            Criar meu currículo
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        {STEPS.map((step, index) => (
          <StepNavigator
            key={index}
            numberStep={step.numberStep}
            textStep={step.textStep}
            isLastStep={index === STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
