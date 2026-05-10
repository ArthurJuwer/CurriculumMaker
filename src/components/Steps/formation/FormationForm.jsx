"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash } from "lucide-react";
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
import CertificationCard from "./CertificationCard";
import SectionSubtitle from "./SectionSubtitle";

const DEFAULT_FORMATION = {
  school: "escola",
  title: "titulo",
  yearEntry: "ano entrada",
  yearLeave: "ano saida",
};

const DEFAULT_LANGUAGE = { language: "Língua", level: "NATIVO" };

const FORMATION_INPUTS = [
  { label: "Escola", placeholder: "ex: Universidade Unisinos Porto Alegre", category: "school" },
  { label: "Ano Entrada", placeholder: "ex: 2020", category: "yearEntry", year: true },
  { label: "Título", placeholder: "ex: Graduação Administração", category: "title" },
  {
    label: "Ano Saída",
    placeholder: "ex: 2024",
    category: "yearLeave",
    year: true,
    yearNoRange: true,
  },
];

const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

const isValidDate = (dateStr) => {
  if (!DATE_REGEX.test(dateStr)) return false;
  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  );
};

export default function FormationForm() {
  const router = useRouter();
  const { values, setValues, hydrated: contextHydrated } = useContext(CurriculumContext);

  const [generalError, setGeneralError] = useState("");
  const [generalErrorModal, setGeneralErrorModal] = useState(null);
  const [biggestPageReached, setBiggestPageReached] = useState(values?.biggestPageReached);
  const [invalidFormationsConfer, setInvalidFormations] = useState(null);
  const [formations, setFormations] = useState([DEFAULT_FORMATION]);
  const [languages, setLanguages] = useState([DEFAULT_LANGUAGE]);
  const [certifications, setCertifications] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificationInputs, setCertificationInputs] = useState({
    name: "",
    workload: "",
    conclusion: "",
  });

  useEffect(() => {
    if (!contextHydrated || hydrated) return;
    setFormations(values?.formations || [DEFAULT_FORMATION]);
    setLanguages(values?.languages || [DEFAULT_LANGUAGE]);
    setCertifications(values?.certifications || []);
    setBiggestPageReached(values?.biggestPageReached);
    setHydrated(true);
  }, [contextHydrated, values, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (values?.biggestPageReached < 3) {
      setBiggestPageReached(3);
    }

    setValues((prev) => ({
      ...prev,
      formations,
      languages,
      certifications,
      biggestPageReached,
    }));
  }, [formations, languages, certifications, biggestPageReached, setValues, hydrated]);

  const handleSubmit = () => {
    const allFieldsFilled =
      formations.every(
        (formation) =>
          formation.school !== "escola" &&
          formation.school.trim() !== "" &&
          formation.title !== "titulo" &&
          formation.title.trim() !== "" &&
          formation.yearEntry !== "ano entrada" &&
          formation.yearEntry.trim() !== "" &&
          formation.yearLeave !== "ano saida" &&
          formation.yearLeave.trim() !== ""
      ) &&
      languages.every(
        (language) => language.language !== "Língua" && language.language.trim() !== ""
      );

    const invalidFormations = formations.filter(
      (formation) => parseInt(formation.yearEntry, 10) > parseInt(formation.yearLeave, 10)
    );

    setInvalidFormations(invalidFormations.map((_, index) => index));

    if (!allFieldsFilled) {
      setGeneralError("Preencha todos os campos obrigatórios para continuar.");
      return;
    }
    if (invalidFormations.length > 0) {
      setGeneralError(
        `Verifique as datas: o ano de entrada não pode ser maior que o ano de saída (${invalidFormations.length} formação(ões)).`
      );
      return;
    }

    setValues(values);
    router.push(ROUTES.finalization);
  };

  const addFormation = () => {
    setFormations([...formations, DEFAULT_FORMATION]);
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: "", level: "A1" }]);
  };

  const addCertification = () => {
    const { name, workload, conclusion } = certificationInputs;

    if (!name || !workload || !conclusion) {
      setGeneralErrorModal("Preencha todos os campos obrigatórios para continuar.");
      return;
    }

    if (!isValidDate(conclusion)) {
      setGeneralErrorModal("Data inválida. Use o formato DD/MM/YYYY.");
      return;
    }

    setCertifications([...certifications, certificationInputs]);
    setCertificationInputs({ name: "", workload: "", conclusion: "" });
    setIsModalOpen(false);
  };

  const handleFormationChange = (e, index, field) => {
    setFormations((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: e.target.value };
      return next;
    });
  };

  const handleLanguagesChange = (newLanguage, newLevel, index) => {
    setLanguages((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], language: newLanguage, level: newLevel };
      return next;
    });
  };

  const handleCertificationChange = (e, field) => {
    const value = e.target.value;
    setCertificationInputs((prev) => ({ ...prev, [field]: value }));

    if (field === "conclusion") {
      if (value && !DATE_REGEX.test(value)) {
        setGeneralErrorModal("Data inválida. Utilize o formato DD/MM/AAAA.");
        return;
      }
      if (value && !isValidDate(value)) {
        setGeneralErrorModal("Data inválida. Verifique o valor informado.");
        return;
      }
      setGeneralErrorModal("");
    }
  };

  const deleteFormation = (index) => {
    setFormations((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteCertification = (id) => {
    setCertifications((prev) => prev.filter((_, index) => index !== id));
  };

  const deleteLanguage = (id) => {
    setLanguages((prev) => prev.filter((_, index) => index !== id));
  };

  return (
    <div className="min-h-dvh 2xl:h-dvh w-full bg-DefaultGray">
      <TopMarker stepsAtual={1} />
      <div className="2xl:px-32 2xl:py-14 xl:px-16 px-4 py-6 2xl:h-[calc(100dvh-7rem)] xl:h-[calc(100dvh-4.5rem)] flex justify-between 2xl:gap-x-32 gap-x-5">
        <div className="flex flex-col 2xl:gap-y-8 gap-y-3 xl:w-8/12 h-full">
          <Score />
          <div
            className="flex flex-col gap-y-8 xl:overflow-y-auto xl:overflow-x-hidden pb-28 xl:pb-0
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-gray-transparent
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-TitleGray
              dark:[&::-webkit-scrollbar-track]:bg-TitleGray
              dark:[&::-webkit-scrollbar-thumb]:bg-TitleGray pr-2"
          >
            <Title
              title="Formação e Competências"
              description="Esta seção destaca sua formação acadêmica, idiomas e certificações similares ao cargo desejado."
            />
            <div className="flex flex-col 2xl:flex-row">
              <div className="flex flex-col gap-y-4 2xl:w-8/12 -mt-6">
                <SectionSubtitle subtitle="Formação" />
                {formations?.map((formation, idx) => (
                  <div
                    key={idx}
                    className="border border-BorderInputGray rounded-xl px-2 py-7 flex flex-wrap w-full gap-x-4 gap-y-6 relative"
                  >
                    <div className="flex gap-x-4 gap-y-6 w-full flex-wrap">
                      {FORMATION_INPUTS.map((item, i) => (
                        <Input
                          key={item?.category}
                          id={item?.category}
                          label={item?.label}
                          value={
                            ["escola", "titulo", "ano entrada", "ano saida"].includes(
                              formation[item?.category]
                            )
                              ? ""
                              : formation[item?.category]
                          }
                          width={i % 2 === 0 ? "w-[calc(60%)]" : "w-[calc(40%-1rem)]"}
                          onChange={(e) => {
                            handleFormationChange(e, idx, item?.category);
                            setInvalidFormations("");
                          }}
                          placeholder={item?.placeholder}
                          isSelect={false}
                          year={item?.year}
                          yearNoRange={item?.yearNoRange}
                          yearNoRangeIsBig={
                            item?.yearNoRange ? invalidFormationsConfer?.includes(idx) : ""
                          }
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => deleteFormation(idx)}
                      className="absolute -top-4 xl:-right-2 right-0 p-2 bg-red-500 rounded-full text-white z-40"
                    >
                      <Trash className="w-6 h-6" />
                    </button>
                  </div>
                ))}
                <div className="w-full">
                  <button
                    onClick={addFormation}
                    className="border-b border-t border-BorderInputGray border-dashed w-full py-3 flex items-center gap-x-4"
                  >
                    <Plus className="p-1 w-10 h-10 bg-TitleGray text-white rounded-full" />
                    <h1 className="uppercase text-TitleGray font-semibold">
                      Adicionar Formação
                    </h1>
                  </button>
                </div>
              </div>
              <div className="2xl:w-4/12 2xl:px-4 2xl:-mb-14 mt-10">
                <div className="h-full relative">
                  <h1 className="text-2xl font-bold text-TitleGray absolute -top-4 2xl:left-[23%] left-4 bg-DefaultGray px-2">
                    Certificações
                  </h1>
                  <div className="border border-BorderInputGray h-full w-full rounded-2xl p-4 pt-6 flex flex-col justify-between items-end gap-y-2">
                    <div className="w-full flex 2xl:flex-col gap-y-2 gap-x-5">
                      {certifications?.map((item, index) => (
                        <CertificationCard
                          key={index}
                          id={index}
                          title={item?.name}
                          onDelete={(id) => deleteCertification(id)}
                        />
                      ))}
                    </div>
                    <button
                      className="uppercase bg-TitleGray w-full py-2 text-white rounded-2xl text-sm"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 w-full -mt-6">
              <SectionSubtitle subtitle="Idiomas" />
              <div className="flex gap-x-4 gap-y-6 w-full flex-wrap">
                {languages?.map((item, index) => (
                  <Input
                    key={index}
                    id={index}
                    label="Idioma"
                    width="xl:w-[calc(50%-1rem)] w-[calc(100%-4.5rem)]"
                    value={{
                      language: item.language !== "Língua" ? item.language : "",
                      level: item.level,
                    }}
                    isSelect
                    onChange={(newLanguage, newLevel) =>
                      handleLanguagesChange(newLanguage, newLevel, index)
                    }
                    placeholder={index === 0 ? "ex: Português" : "ex: Inglês"}
                    onDelete={index !== 0 ? deleteLanguage : null}
                  />
                ))}
                <button
                  className="bg-TitleGray size-14 rounded-xl text-white flex justify-center items-center"
                  onClick={addLanguage}
                >
                  <Plus className="size-8" />
                </button>
              </div>
              <ButtonNext onClick={handleSubmit} />
            </div>
          </div>
        </div>
        <div className="hidden xl:block 2xl:w-4/12 xl:w-5/12 min-h-[70dvh]">
          <Curriculum withPlaceholders />
        </div>
      </div>

      <MobileCurriculumPreview withPlaceholders />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl 2xl:w-4/12 xl:w-6/12 w-11/12 flex flex-col gap-y-8 relative">
            <h2 className="text-xl font-bold">Adicionar Certificação</h2>
            <div className="flex flex-col gap-y-8">
              <Input
                label="Nome da Certificação"
                value={certificationInputs?.name}
                onChange={(e) => handleCertificationChange(e, "name")}
                placeholder="ex: Curso de Administração Empresarial"
              />
              <Input
                label="Carga Horária"
                value={certificationInputs?.workload}
                onChange={(e) => handleCertificationChange(e, "workload")}
                placeholder="ex: 120h"
              />
              <Input
                label="Data"
                value={certificationInputs?.conclusion}
                onChange={(e) => handleCertificationChange(e, "conclusion")}
                placeholder="ex: 15/03/2021"
                conclusion={Boolean(generalErrorModal)}
              />
            </div>
            {generalErrorModal && (
              <p className="absolute bottom-20 left-9 text-sm text-red-600">
                {generalErrorModal}
              </p>
            )}
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setGeneralErrorModal("");
                }}
                className="px-4 py-2 bg-TitleGray text-white rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={addCertification}
                className={`px-4 py-2 ${
                  certificationInputs.name &&
                  certificationInputs.workload &&
                  certificationInputs.conclusion &&
                  !generalErrorModal
                    ? "bg-TitleGray"
                    : "bg-gray-400"
                } text-white rounded-lg`}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
      <ErrorMessage message={generalError} onClose={() => setGeneralError("")} />
    </div>
  );
}
