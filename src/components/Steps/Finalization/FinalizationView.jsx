"use client";

import { createElement, useContext, useEffect, useState } from "react";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import Curriculum from "@/components/curriculum/Curriculum";
import MobileCurriculumPreview from "@/components/curriculum/MobileCurriculumPreview";
import TopMarker from "@/components/navigation/TopMarker";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Title from "@/components/ui/Title";
import Score from "@/components/score/Score";
import ColorSwatch from "@/components/steps/models/ColorSwatch";
import FinalizationInput from "./FinalizationInput";
import FinalizationSelect from "./FinalizationSelect";

const COLORS = [
  "A1A1A1",
  "AF9B94",
  "1E1E1E",
  "4F1213",
  "12384F",
  "124F2B",
  "A8890D",
];

export default function FinalizationView() {
  const { values, setValues } = useContext(CurriculumContext);
  const [color, setColor] = useState(values?.color);
  const [model, setModel] = useState(values?.model);
  const [languageCurriculum, setLanguageCurriculum] = useState("pt");
  const [biggestPageReached, setBiggestPageReached] = useState(values?.biggestPageReached);
  const [textTitle, setTextTitle] = useState(values?.textTitle || "28px");
  const [textSubTitle, setTextSubTitle] = useState(values?.textSubTitle || "20px");
  const [textCorp, setTextCorp] = useState(values?.textCorp || "12px");
  const [sizeFile, setSizeFile] = useState("PDF");
  const [nameCurriculum, setNameCurriculum] = useState(values?.nameCurriculum || "");
  const [generalError, setGeneralError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setValues((prev) => ({ ...prev, elementsMoved: 0 }));
  }, []);

  useEffect(() => {
    setBiggestPageReached(4);
    setValues((prev) => ({
      ...prev,
      model,
      color,
      textTitle,
      textSubTitle,
      textCorp,
      sizeFile,
      nameCurriculum,
      biggestPageReached: 4,
      languageCurriculum,
    }));
  }, [
    model,
    color,
    textTitle,
    textSubTitle,
    textCorp,
    sizeFile,
    languageCurriculum,
    nameCurriculum,
    setValues,
  ]);

  const labelsLeftSelects = [
    { label: "Modelo", options: ["1", "2"], defaultValue: `${model}`, setVariable: setModel },
    {
      label: "Idioma do Currículo",
      options: ["Português", "Inglês", "Italiano"],
      setVariable: setLanguageCurriculum,
      disabled: true,
    },
    {
      label: "Fonte Títulos",
      options: ["22px", "24px", "26px", "28px", "30px", "32px", "34px"],
      defaultValue: values?.textTitle,
      setVariable: setTextTitle,
    },
    {
      label: "Fonte Subtítulos",
      options: ["14px", "16px", "18px", "20px", "22px", "24px", "26px"],
      defaultValue: values?.textSubTitle,
      setVariable: setTextSubTitle,
    },
    {
      label: "Fonte Corpo",
      options: ["6px", "8px", "10px", "12px", "14px", "16px", "18px"],
      defaultValue: values?.textCorp,
      setVariable: setTextCorp,
    },
  ];

  const gerarPDF = async () => {
    if (!nameCurriculum) {
      setGeneralError("O arquivo precisa ter um nome.");
      return;
    }
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const [{ pdf }, { default: CurriculumPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/curriculum/pdf/CurriculumPdfDocument"),
      ]);

      const blob = await pdf(
        createElement(CurriculumPdfDocument, { values })
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${nameCurriculum}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setGeneralError("Erro ao gerar o PDF. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="xl:h-dvh xl:overflow-hidden min-h-dvh w-full bg-DefaultGray">
      <TopMarker stepsAtual="0" />
      <div className="2xl:px-32 xl:px-16 px-4 2xl:py-8 xl:py-6 py-6 flex xl:flex-row flex-col xl:h-[calc(100dvh-5rem)] 2xl:h-[calc(100dvh-7rem)] gap-y-2 xl:gap-x-24 2xl:gap-x-40 justify-center overflow-x-hidden xl:pb-6 pb-28">
        <div className="xl:hidden block">
          <Score isLast />
        </div>
        <div className="flex flex-col 2xl:gap-y-4 gap-y-2 2xl:w-[22%]">
          <Title title="Alterações Rápidas" last />
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <h2 className="uppercase text-TitleGray font-semibold">Cor de Destaque</h2>
              <div className="flex gap-x-5">
                {COLORS.map((c, index) => (
                  <ColorSwatch
                    key={index}
                    backgroundColor={c}
                    isRounded="rounded-full"
                    onClick={() => setColor(c)}
                    isSelected={c === color}
                  />
                ))}
              </div>
            </div>

            {labelsLeftSelects.map((item, index) => (
              <FinalizationSelect
                id={index}
                key={index}
                label={item.label}
                options={item.options}
                defaultValue={item.defaultValue}
                disabled={item.disabled}
                onChange={(e) => item.setVariable(e.target.value)}
              />
            ))}
          </div>
        </div>

        <div className="hidden xl:block border-2 border-BorderInputGray xl:w-[40%] 2xl:w-[33%] xl:mt-8 2xl:mt-0 xl:min-h-full 2xl:h-[80dvh] xl:h-auto">
          <div className="flex flex-col xl:flex-row items-center justify-center h-full w-full">
            <div className="block xl:w-full xl:min-h-0 h-full w-full">
              <Curriculum isLast />
            </div>
          </div>
        </div>

        <div className="flex flex-col 2xl:gap-y-4 gap-y-2 2xl:w-[22%]">
          <div className="mt-2 -mb-2">
            <Title title="Opções Pra Baixar" last />
          </div>
          
          <div className="flex flex-col gap-y-4">
            <FinalizationInput
              id="name-curriculum"
              value={nameCurriculum}
              label="Nome do Arquivo"
              placeholder="ex: meu-curriculo"
              onChange={(e) => setNameCurriculum(e.target.value)}
            />

            <button
              className="w-full p-4 rounded-xl bg-DefaultOrange text-white uppercase text-sm tracking-wider font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={gerarPDF}
              disabled={isGenerating}
            >
              {isGenerating ? "Gerando..." : "Gerar PDF"}
            </button>

            <div className="xl:block hidden">
              <Score isLast />
            </div>
          </div>
        </div>
      </div>

      <MobileCurriculumPreview isFinal />

      <ErrorMessage message={generalError} onClose={() => setGeneralError("")} />
    </div>
  );
}
