"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, Sparkles, X } from "lucide-react";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import { ROUTES } from "@/lib/routes";
import Curriculum from "@/components/curriculum/Curriculum";
import MobileCurriculumPreview from "@/components/curriculum/MobileCurriculumPreview";
import TopMarker from "@/components/navigation/TopMarker";
import ButtonNext from "@/components/ui/ButtonNext";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Title from "@/components/ui/Title";
import Score from "@/components/score/Score";

const DEFAULT_PROJECTS = [
  { title: "Projeto 1", category: "Categoria", year: "ANO", description: "descreva seu projeto aqui" },
  { title: "Projeto 2", category: "Categoria", year: "ANO", description: "descreva seu projeto aqui" },
];

const EMPTY_ERRORS = [
  { title: false, category: false, year: false, description: false },
  { title: false, category: false, year: false, description: false },
];

const TIPS = [
  "Evite detalhes excessivos e vá direto ao ponto.",
  "Seja realista quanto às suas metas profissionais.",
  "Seja claro sobre sua área de interesse.",
];

export default function PresentationForm() {
  const router = useRouter();
  const { values, setValues, hydrated: contextHydrated } = useContext(CurriculumContext);
  const [generalError, setGeneralError] = useState(null);
  const [biggestPageReached, setBiggestPageReached] = useState(values?.biggestPageReached);
  const [objective, setObjective] = useState(values?.objective || "texto do objetivo.");
  const [projects, setProjects] = useState(values?.projects || DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(0);
  const [projectErrors, setProjectErrors] = useState(EMPTY_ERRORS);
  const [tipsModalOpen, setTipsModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!contextHydrated || hydrated) return;
    setObjective(values?.objective || "texto do objetivo.");
    setProjects(values?.projects || DEFAULT_PROJECTS);
    setBiggestPageReached(values?.biggestPageReached);
    setHydrated(true);
  }, [contextHydrated, values, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (values?.biggestPageReached < 2) {
      setBiggestPageReached(2);
    }
  }, [hydrated]);

  useEffect(() => {
    if (!tipsModalOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [tipsModalOpen]);

  const validateAllInputs = () => {
    const currentYear = new Date().getFullYear();
    const errors = projects.map((project, index) => ({
      title: project?.title === `Projeto ${index + 1}`,
      category: project?.category === "Categoria",
      year:
        !project?.year ||
        isNaN(project?.year) ||
        Number(project?.year) < 1900 ||
        Number(project?.year) > currentYear,
      description: project?.description === "descreva seu projeto aqui",
    }));
    setProjectErrors(errors);
  };

  useEffect(() => {
    validateAllInputs();
  }, [selectedProject, projects]);

  useEffect(() => {
    if (!hydrated) return;
    setValues((prev) => ({
      ...prev,
      objective,
      projects,
      biggestPageReached,
    }));
  }, [objective, projects, biggestPageReached, setValues, hydrated]);

  const handleProjectChange = (index, field, value) => {
    setProjects((prev) =>
      prev.map((project, idx) => (idx === index ? { ...project, [field]: value } : project))
    );
  };

  const handleSubmit = () => {
    validateAllInputs();
    const hasProjectErrors = projectErrors.some((error) => Object.values(error).includes(true));
    const isObjectiveEmpty = objective === "texto do objetivo." || objective === "";

    if (isObjectiveEmpty) {
      setGeneralError("Preencha todos os campos obrigatórios para continuar.");
      return;
    }
    if (hasProjectErrors) {
      setGeneralError("Verifique os campos destacados antes de prosseguir.");
      return;
    }

    setValues((prev) => ({ ...prev, objective, projects }));
    router.push(ROUTES.formation);
  };

  return (
    <div className="min-h-dvh w-full bg-DefaultGray">
      <TopMarker stepsAtual="2" />
      <div className="2xl:px-32 2xl:py-14 xl:px-16 px-4 py-6 2xl:h-[calc(100dvh-7rem)] xl:h-[calc(100dvh-4.5rem)] flex justify-between 2xl:gap-x-32 xl:gap-x-5">
        <div className="flex flex-col 2xl:gap-y-8 gap-y-3 xl:w-8/12 h-full">
          <Score />
          <div
            className="h-full flex flex-col gap-y-8 xl:overflow-y-auto pb-28 xl:pb-0
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-gray-transparent
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-TitleGray
              dark:[&::-webkit-scrollbar-track]:bg-TitleGray
              dark:[&::-webkit-scrollbar-thumb]:bg-TitleGray pr-2"
          >
            <Title
              title="Apresentação Pessoal"
              description="Essa seção permite mostrar suas metas profissionais e sua trajetória de experiências relevantes."
            />
            <div className="max-h-full w-full flex xl:flex-row flex-col justify-between 2xl:gap-x-5 gap-x-3 gap-y-4">
              <TextArea
                id={0}
                label="Objetivo"
                width="xl:w-7/12 w-full"
                value={objective !== "texto do objetivo." ? objective : ""}
                onChange={(e) => {
                  setObjective(e.target.value);
                  if (objective.length >= 120) {
                    setGeneralError(
                      "Atenção: você está se aproximando do limite máximo de caracteres."
                    );
                  }
                }}
                placeholder="ex: Conseguir uma posição como assistente administrativo, contribuindo com minhas habilidades de gestão e atendimento para a empresa."
              />
              <div className="xl:bg-TitleGray xl:text-white text-TitleGray 2xl:p-5 xl:py-2 xl:px-5 p-0 rounded-2xl h-full xl:w-5/12 w-full flex flex-col 2xl:gap-y-3 gap-y-2">
                <div className="flex items-center justify-between gap-2 xl:mt-2">
                  <h1 className="2xl:text-xl xl:text-base text-sm font-medium flex items-center gap-2">
                    <Sparkles
                      size={16}
                      strokeWidth={2}
                      className="xl:hidden text-DefaultOrange"
                    />
                    Experimente estas dicas:
                  </h1>
                  <button
                    type="button"
                    onClick={() => setTipsModalOpen(true)}
                    aria-label="Ver dicas"
                    className="xl:hidden relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br from-TitleGray to-StrongGray text-white text-xs font-medium shadow-md ring-1 ring-white/10 active:scale-95 transition-transform"
                  >
                    <Lightbulb size={14} strokeWidth={2} className="text-DefaultOrange" />
                    Ver dicas
                  </button>
                </div>
                <ul className="hidden xl:flex xl:list-disc xl:pl-5 2xl:text-sm xl:text-xs text-white flex-col gap-y-3 font-normal">
                  {TIPS.map((tip, index) => (
                    <li key={index} className="xl:list-item">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-transparent border border-BorderInputGray rounded-lg w-full p-5 pb-4 -mt-4 flex gap-x-4 relative xl:flex-row flex-col gap-y-5">
              <label className="absolute -top-3 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0">
                Projeto {selectedProject + 1}
              </label>
              <div className="xl:w-1/12 flex xl:flex-col gap-y-2">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    className={`xl:h-1/2 h-12 w-full xl:rounded-xl ${
                      index === 1 ? "ml-4 xl:ml-0" : ""
                    } rounded-lg text-xl text-white ${
                      selectedProject === index ? "bg-TitleGray" : "bg-NormalGray"
                    }`}
                    onClick={() => setSelectedProject(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="xl:w-11/12 flex flex-col gap-y-4">
                <div className="flex flex-wrap xl:flex-nowrap gap-x-2 gap-y-4 xl:gap-y-0">
                  <Input
                    id={`title-${selectedProject}`}
                    width="w-xl:5/12 w-full"
                    label="Titulo do Projeto"
                    onChange={(e) => handleProjectChange(selectedProject, "title", e.target.value)}
                    value={
                      projects[selectedProject]?.title === `Projeto ${selectedProject + 1}`
                        ? ""
                        : projects[selectedProject]?.title
                    }
                    error={projectErrors[selectedProject]?.title}
                    placeholder="ex: Documentação Administrativa"
                    validateAllInputs={validateAllInputs}
                  />
                  <Input
                    id={`category-${selectedProject}`}
                    width="xl:w-5/12 w-full"
                    label="Categoria"
                    onChange={(e) =>
                      handleProjectChange(selectedProject, "category", e.target.value)
                    }
                    value={
                      projects[selectedProject]?.category === "Categoria"
                        ? ""
                        : projects[selectedProject]?.category
                    }
                    error={projectErrors[selectedProject]?.category}
                    placeholder="ex: Administração"
                    validateAllInputs={validateAllInputs}
                  />
                  <Input
                    id={`year-${selectedProject}`}
                    width="xl:w-2/12 w-full"
                    label="Ano"
                    onChange={(e) => handleProjectChange(selectedProject, "year", e.target.value)}
                    value={
                      projects[selectedProject]?.year === "ANO"
                        ? ""
                        : projects[selectedProject]?.year
                    }
                    error={projectErrors[selectedProject]?.year}
                    placeholder="ex: 2022"
                    validateAllInputs={validateAllInputs}
                    year
                  />
                </div>
                <TextArea
                  id={`description-${selectedProject}`}
                  isLast
                  label="Descrição"
                  onChange={(e) => {
                    handleProjectChange(selectedProject, "description", e.target.value);
                    if (projects[selectedProject]?.description.length >= 120) {
                      setGeneralError(
                        "Cuidado você esta chegando perto do limite máximo de caracteres"
                      );
                    }
                  }}
                  value={
                    projects[selectedProject].description === "descreva seu projeto aqui"
                      ? ""
                      : projects[selectedProject].description
                  }
                  error={projectErrors[selectedProject]?.description}
                  placeholder="ex: Este documento tem como objetivo, organizar e padronizar os processos administrativos, garantindo eficiência e conformidade nas operações diárias."
                  validateAllInputs={validateAllInputs}
                />
              </div>
            </div>
            <div className="-mt-5">
              <ButtonNext onClick={handleSubmit} />
            </div>
          </div>
        </div>
        <div className="hidden xl:block 2xl:w-4/12 xl:w-5/12 min-h-[70dvh]">
          <Curriculum withPlaceholders />
        </div>
      </div>

      <MobileCurriculumPreview withPlaceholders />

      {/* MOBILE: Tips Popup */}
      <div
        onClick={() => setTipsModalOpen(false)}
        aria-hidden="true"
        className={`xl:hidden fixed inset-0 z-[60] bg-StrongGray/60 backdrop-blur-sm transition-opacity duration-300 ${
          tipsModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dicas para apresentação pessoal"
        className={`xl:hidden fixed z-[61] left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          tipsModalOpen
            ? "-translate-y-1/2 opacity-100 scale-100"
            : "-translate-y-[40%] opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-DefaultOrange/30 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full bg-gradient-to-tr from-TitleGray/15 to-transparent blur-2xl pointer-events-none" />

          <div className="relative px-6 pt-6 pb-2 flex items-start gap-4">
            <div className="relative shrink-0">
              <span className="absolute inset-0 rounded-2xl bg-DefaultOrange/30 blur-md" />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-DefaultOrange to-[#B84F0F] flex items-center justify-center shadow-lg">
                <Lightbulb size={22} strokeWidth={2} className="text-white" />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold text-StrongGray leading-tight">
                Experimente estas dicas
              </h3>
              <p className="text-xs text-WeakGray mt-0.5">
                Pequenas escolhas que fazem grande diferença
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTipsModalOpen(false)}
              aria-label="Fechar dicas"
              className="shrink-0 w-9 h-9 -mr-2 -mt-1 rounded-full bg-DefaultGray/60 hover:bg-DefaultGray active:scale-90 flex items-center justify-center transition-all"
            >
              <X size={18} className="text-TitleGray" strokeWidth={2} />
            </button>
          </div>

          <ol className="relative px-6 pb-6 pt-3 flex flex-col gap-2.5">
            {TIPS.map((tip, index) => (
              <li
                key={index}
                className={`flex items-start gap-3 p-3 rounded-2xl bg-DefaultGray/40 ring-1 ring-WeakLightGray/40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  tipsModalOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  transitionDelay: tipsModalOpen ? `${index * 80 + 120}ms` : "0ms",
                }}
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-TitleGray to-StrongGray text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  {index + 1}
                </span>
                <span className="text-sm text-StrongGray leading-snug pt-0.5">{tip}</span>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={() => setTipsModalOpen(false)}
            className="mx-6 mb-6 mt-1 w-[calc(100%-3rem)] h-11 rounded-full bg-gradient-to-br from-TitleGray to-StrongGray text-white text-sm font-medium shadow-lg active:scale-[0.98] transition-transform"
          >
            Entendi
          </button>
        </div>
      </div>

      <ErrorMessage message={generalError} onClose={() => setGeneralError("")} />
    </div>
  );
}
