"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import ButtonBack from "@/components/navigation/ButtonBack";
import ColorSwatch from "./ColorSwatch";
import ModelTheme1 from "./ModelTheme1";
import ModelTheme2 from "./ModelTheme2";

const COLORS = [
  "A1A1A1",
  "AF9B94",
  "1E1E1E",
  "4F1213",
  "12384F",
  "124F2B",
  "A8890D",
];

const SAMPLE_VALUES = (color) => ({
  model: "1",
  color,
  name: "Carlos Silva Souza",
  email: "carlos.silva@email.com",
  bairro: "Farroupilha",
  cidade: "Porto Alegre",
  estado: "RS",
  telefone: "(51) 99999-8888",
  linkedin: "https://www.linkedin.com/in/carlossilva",
  objective:
    "Busco oportunidades de liderança em áreas administrativas, onde possa aplicar minhas habilidades em gestão de equipes e processos, buscando sempre a melhoria contínua.",
  projects: [
    {
      title: "Automatização de Processos Administrativos",
      category: "Gestão de Projetos",
      year: "2023",
      description:
        "Liderança de um projeto de automação de processos administrativos que resultou na redução de 30% do tempo gasto em tarefas repetitivas.",
    },
    {
      title: "Redução de Custos Operacionais",
      category: "Gestão Financeira",
      year: "2022",
      description:
        "Implementação de estratégias que reduziram em 15% os custos operacionais anuais de uma empresa de médio porte.",
    },
  ],
  formations: [
    {
      school: "Universidade Federal do Rio Grande do Sul (UFRGS)",
      title: "Bacharel em Administração",
      yearEntry: "2015",
      yearLeave: "2019",
    },
  ],
  languages: [
    { language: "Português", level: "NATIVO" },
    { language: "Inglês", level: "B1" },
  ],
  certifications: [
    { name: "Certificação em Gestão de Projetos", workload: "30", conclusion: "2021" },
  ],
});

export default function ModelsView() {
  const { setValues } = useContext(CurriculumContext);
  const [isMd, setIsMd] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [colorPass, setColorPass] = useState(COLORS[0]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (e) => setIsMd(e.matches);
    setIsMd(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    setValues((prev) => ({ ...prev, generalError: "" }));
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const valuesModel = SAMPLE_VALUES(colorPass);

  const handleSliderScroll = (e) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    const index = Math.round(scrollLeft / clientWidth);
    if (index !== currentSlide) setCurrentSlide(index);
  };

  const goToSlide = (index) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: index * sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="h-dvh w-full overflow-hidden bg-DefaultGray flex flex-col 2xl:py-16 lg:py-14 py-4 items-center 2xl:gap-y-8 gap-y-2">
      <h1 className="text-StrongGray text-center font-bold 2xl:text-4xl xl:text-3xl text-xl lg:text-2xl lg:w-1/3 w-11/12 mt-10 lg:mt-0">
        Escolha entre estes currículos de alta aprovação
      </h1>
      <div className="p-1.5 lg:p-2 bg-WeakLightGray lg:w-auto w-9/12 2xl:flex 2xl:flex-row 2xl:static flex justify-center 2xl:gap-x-5 gap-x-2.5 lg:gap-x-4 lg:absolute lg:flex-col lg:gap-y-3 lg:right-10 lg:z-20">
        {COLORS.map((color, index) => (
          <ColorSwatch
            key={index}
            backgroundColor={color}
            onClick={() => {
              setColorPass(color);
              setSelectedIndex(index);
            }}
            isSelected={selectedIndex === index}
          />
        ))}
      </div>
      <div className="absolute lg:top-14 lg:left-20 top-4 left-4">
        <ButtonBack />
      </div>

      {isMd ? (
        <div className="relative flex justify-center items-stretch gap-x-12 w-full flex-1 min-h-0">
          <div className="w-1/4 flex justify-center items-stretch h-full">
            <ModelTheme1 valuesCurriculum={valuesModel} />
          </div>
          <div className="w-1/4 flex justify-center items-stretch h-full">
            <ModelTheme2 valuesCurriculum={valuesModel} />
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 min-h-0 flex flex-col items-center gap-y-3">
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            className="w-full flex-1 min-h-0 flex overflow-x-auto overflow-y-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="snap-center shrink-0 w-full flex justify-center items-center">
              <div className="w-10/12">
                <ModelTheme1 valuesCurriculum={valuesModel} />
              </div>
            </div>
            <div className="snap-center shrink-0 w-full flex justify-center items-center">
              <div className="w-10/12">
                <ModelTheme2 valuesCurriculum={valuesModel} />
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 items-center">
            {[0, 1].map((i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Ir para slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === i ? "w-6 bg-DefaultOrange" : "w-2 bg-WeakGray"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
