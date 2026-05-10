"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import { ROUTES } from "@/lib/routes";
import Curriculum from "@/components/curriculum/Curriculum";
import MobileCurriculumPreview from "@/components/curriculum/MobileCurriculumPreview";
import TopMarker from "@/components/navigation/TopMarker";
import ButtonNext from "@/components/ui/ButtonNext";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";
import Score from "@/components/score/Score";

const INPUTS = [
  { label: "Nome Completo", placeholder: "ex: João Carlos", key: "name" },
  { label: "Bairro", placeholder: "ex: Farroupilha", key: "bairro" },
  { label: "Cidade", placeholder: "ex: Porto Alegre", key: "cidade" },
  { label: "Estado", placeholder: "ex: RS", key: "estado" },
  { label: "Telefone", placeholder: "ex: (51) 00000-0000", key: "telefone", number: true },
  { label: "Email", placeholder: "ex: joaocarlos@gmail.com", key: "email", email: true },
  {
    label: "Linkedin",
    placeholder: "ex: https://www.linkedin.com/in/joaocarlos/",
    key: "linkedin",
  },
];

export default function HeaderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { values: contextValues, setValues } = useContext(CurriculumContext);

  const queryColor = searchParams.get("color");
  const queryModel = searchParams.get("model");

  const [validationErrors, setValidationErrors] = useState({});
  const [formState, setFormState] = useState({
    score: contextValues?.score || "",
    generalError: "",
    color: queryColor || contextValues?.color || "#124f2b",
    model: queryModel || contextValues?.model || 1,
    name: contextValues?.name || "Nome Completo",
    bairro: contextValues?.bairro || "Bairro",
    cidade: contextValues?.cidade || "Cidade",
    estado: contextValues?.estado || "Estado",
    telefone: contextValues?.telefone || "Telefone",
    email: contextValues?.email || "Email",
    linkedin: contextValues?.linkedin || "",
    noLinkedin: contextValues?.noLinkedin || false,
    biggestPageReached: contextValues?.biggestPageReached || 1,
  });

  useEffect(() => {
    if (contextValues) {
      setFormState((prev) => ({
        ...prev,
        ...contextValues,
        color: queryColor || contextValues?.color,
        model: queryModel || contextValues?.model,
      }));
    }
  }, []);

  useEffect(() => {
    setValues((prev) => ({ ...prev, ...formState }));
  }, [formState]);

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidationError = (id, error) => {
    setValidationErrors((prev) => ({ ...prev, [id]: error }));
  };

  const handleSubmit = () => {
    const allFieldsFilled = INPUTS.every(({ key, label }) => {
      if (key === "linkedin" && formState.noLinkedin) return true;
      return formState[key]?.trim() && formState[key] !== label;
    });
    const allFieldsValid = Object.values(validationErrors).every((error) => !error);

    if (!allFieldsFilled) {
      setFormState((prev) => ({ ...prev, generalError: "Preencha todos os campos" }));
      return;
    }

    if (!allFieldsValid) {
      setFormState((prev) => ({
        ...prev,
        generalError: "Corrija os erros antes de continuar",
      }));
      return;
    }

    router.push(ROUTES.presentation);
  };

  return (
    <div className="min-h-dvh w-full bg-DefaultGray">
      <TopMarker stepsAtual={3} />
      <div className="2xl:px-32 2xl:py-14 xl:px-16 px-4 py-6 2xl:h-[calc(100dvh-7rem)] xl:h-[calc(100dvh-4.5rem)] flex justify-between 2xl:gap-x-32 xl:gap-x-5">
        <div className="flex flex-col 2xl:gap-y-8 gap-y-3 xl:w-8/12 w-full h-full">
          <Score />
          <div
            className="h-full flex flex-col 2xl:gap-y-8 gap-y-4 xl:overflow-y-auto pb-28 xl:pb-0
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-gray-transparent
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-TitleGray
              dark:[&::-webkit-scrollbar-track]:bg-TitleGray
              dark:[&::-webkit-scrollbar-thumb]:bg-TitleGray pr-2"
          >
            <Title
              title="Cabeçalho"
              description="Eles permitem que os empregadores vejam como podem entrar em contato com você."
            />
            <div className="2xl:pt-5 pt-4 w-full flex flex-wrap 2xl:gap-x-4 gap-x-3 2xl:gap-y-10 gap-y-7 relative">
              {INPUTS.map(({ label, placeholder, key, email, number }, index) => {
                const isLinkedin = key === "linkedin";
                return (
                  <Input
                    key={index}
                    id={index}
                    label={label}
                    isLast={index === INPUTS.length - 1}
                    width={isLinkedin ? "w-full" : "w-[calc(50%-0.5rem)]"}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    value={
                      isLinkedin && formState.noLinkedin
                        ? ""
                        : formState[key] !== undefined && formState[key] !== label
                        ? formState[key]
                        : ""
                    }
                    email={email}
                    number={number}
                    disabled={isLinkedin && formState.noLinkedin}
                    onValidationError={(error) => handleValidationError(key, error)}
                  />
                );
              })}
              <label className="w-full flex items-center gap-x-2 -mt-3 select-none cursor-pointer text-sm text-TitleGray">
                <input
                  type="checkbox"
                  className="size-4 accent-DefaultOrange cursor-pointer"
                  checked={formState.noLinkedin}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormState((prev) => ({
                      ...prev,
                      noLinkedin: checked,
                      linkedin: checked ? "" : prev.linkedin,
                    }));
                    if (checked) handleValidationError("linkedin", false);
                  }}
                />
                Não tenho LinkedIn
              </label>
            </div>
            <ButtonNext onClick={handleSubmit} />
          </div>
        </div>
        <div className="hidden xl:block 2xl:w-4/12 xl:w-5/12 min-h-[70dvh]">
          <Curriculum withPlaceholders />
        </div>
      </div>

      <MobileCurriculumPreview withPlaceholders />

      <ErrorMessage
        message={formState.generalError}
        onClose={() => handleChange("generalError", "")}
      />
    </div>
  );
}
