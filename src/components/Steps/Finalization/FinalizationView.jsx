"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import Curriculum from "@/components/curriculum/Curriculum";
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
  const [imgData1, setImgData1] = useState(null);
  const [imgData2, setImgData2] = useState(null);
  const [mobileOpenCurriculum, setMobileOpenCurriculum] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const curriculumRef = useRef();

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

  useEffect(() => {
    if (!curriculumRef.current) return;
    let cancelled = false;
    import("html2canvas").then(({ default: html2canvas }) => {
      html2canvas(curriculumRef.current, { scale: 3 }).then((canvas) => {
        if (cancelled) return;
        const data = canvas.toDataURL("image/png");
        if (values?.currentPage === 1) setImgData1(data);
        else if (values?.currentPage === 2) setImgData2(data);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [values?.currentPage]);

  const labelsLeftSelects = [
    { label: "Modelo", options: ["1", "2"], defaultValue: `${model}`, setVariable: setModel },
    {
      label: "Idioma do Currículo",
      options: ["Português", "Inglês", "Italiano"],
      setVariable: setLanguageCurriculum,
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

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const pdfWidth = 210;
    const pdfHeight = 287;

    doc.addImage(imgData1, "PNG", 0, 0, pdfWidth, pdfHeight);
    if (values?.elementsMoved > 0 || values?.secondPage === true) {
      if (imgData2 == null) {
        setGeneralError("Visualize a segunda pagina. Confira se está tudo certo.");
      } else {
        doc.addPage();
        doc.addImage(imgData2, "PNG", 0, 0, pdfWidth, pdfHeight);
        doc.save(`${nameCurriculum}.pdf`);
      }
    } else {
      doc.save(`${nameCurriculum}.pdf`);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-DefaultGray">
      <TopMarker stepsAtual="0" />
      <div className="2xl:px-32 xl:px-16 px-4 2xl:py-14 py-6 flex xl:flex-row flex-col max-h-[100dvh] h-full gap-y-2 xl:gap-x-24 2xl:gap-x-40 justify-center overflow-x-hidden">
        <div className="xl:hidden block">
          <Score isLast />
        </div>
        <div
          className={`${
            mobileOpenCurriculum ? "hidden" : "flex"
          } flex flex-col 2xl:gap-y-4 gap-y-2 2xl:w-[22%]`}
        >
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
                onChange={(e) => item.setVariable(e.target.value)}
              />
            ))}
          </div>
        </div>

        <div className="xl:mt-8 mt-10 2xl:mt-0 min-h-full 2xl:h-[80dvh] xl:w-[40%] 2xl:w-[33%] border-2 border-BorderInputGray">
          <div
            ref={curriculumRef}
            className="flex flex-col xl:flex-row items-center justify-center h-full w-full"
          >
            <div
              className={`${
                mobileOpenCurriculum ? "block mt-6" : "hidden"
              } xl:w-full xl:block min-h-[70dvh] h-full w-full`}
            >
              <Curriculum isLast />
            </div>
          </div>
        </div>

        <div
          className={`${mobileOpenCurriculum ? "block mt-6" : "hidden"} flex justify-center`}
        >
          <button
            className="xl:hidden rounded-3xl w-36 h-12 bg-TitleGray text-white text-sm flex items-center justify-center gap-x-2"
            onClick={() => setMobileOpenCurriculum(false)}
          >
            <ArrowLeft />
            Voltar
          </button>
        </div>

        <div
          className={`${
            mobileOpenCurriculum ? "hidden" : "flex"
          } flex flex-col 2xl:gap-y-4 gap-y-2 2xl:w-[22%]`}
        >
          <Title title="Opções Pra Baixar" last />
          <div className="flex flex-col gap-y-4">
            <FinalizationInput
              id="name-curriculum"
              value={nameCurriculum}
              label="Nome do Arquivo"
              placeholder="ex: meu-curriculo"
              onChange={(e) => setNameCurriculum(e.target.value)}
            />
            <div className="flex items-center justify-center -mt-4">
              <button
                className="xl:hidden rounded-3xl mt-4 w-36 h-12 bg-TitleGray text-white text-sm flex items-center justify-center gap-x-2"
                onClick={() => setMobileOpenCurriculum(true)}
              >
                <ReceiptText strokeWidth={1.5} />
                Ver Currículo
              </button>
            </div>

            <button
              className="w-full p-4 rounded-xl bg-DefaultOrange text-white uppercase text-sm tracking-wider font-medium"
              onClick={gerarPDF}
            >
              Gerar PDF
            </button>

            <div className="xl:block hidden">
              <Score isLast />
            </div>
          </div>
        </div>
      </div>
      <ErrorMessage message={generalError} onClose={() => setGeneralError("")} />
    </div>
  );
}
