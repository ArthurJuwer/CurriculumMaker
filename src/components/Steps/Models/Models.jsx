import ModelsColors from "./ModelsColors";
import ButtonBack from "../StepsGlobalComponents/ButtonBack";
import { useContext, useEffect, useState } from "react";
import ModelsThemes1 from "./ModelsThemes/ModelsThemes1";
import ModelsThemes2 from "./ModelsThemes/ModelsThemes2";
import { CurriculumContext } from "../../../context/CurriculumContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Models() {
  const { values, setValues } = useContext(CurriculumContext);
  const [generalError, setGeneralError] = useState(values?.generalError);

  const [isMd, setIsMd] = useState(false);
  const [atualPageSlide, setAtualPageSlide] = useState(1); // Página inicial

  // Função para verificar se a tela está no breakpoint md ou maior
  const checkIfMd = () => {
    const mediaQuery = window.matchMedia("(min-width: 768px)"); // md no Tailwind é 768px
    setIsMd(mediaQuery.matches); // Verifica se a query é verdadeira
  };

  useEffect(() => {
    checkIfMd();
    setGeneralError('');
    setValues(prev => ({
      ...prev,
      generalError,
    }));
  }, []);

  const colors = [
    { color: "A1A1A1" },
    { color: "AF9B94" },
    { color: "1E1E1E" },
    { color: "4F1213" },
    { color: "12384F" },
    { color: "124F2B" },
    { color: "A8890D" },
  ];

  const [colorPass, setColorPass] = useState(colors[0].color);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const valuesModel = {
    model: "1",
    color: colorPass,
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
      {
        language: "Português",
        level: "NATIVO",
      },
      {
        language: "Inglês",
        level: "B1",
      },
    ],
    certifications: [
      {
        name: "Certificação em Gestão de Projetos",
        workload: "30",
        conclusion: "2021",
      },
    ],
  };

  

  const goToSlide = () => {
    atualPageSlide == 1 ? setAtualPageSlide(atualPageSlide + 1) : setAtualPageSlide(atualPageSlide - 1)
    
  };

  return (
    <div className="h-dvh w-full bg-DefaultGray flex flex-col py-16 items-center gap-y-8">
      <h1 className="text-StrongGray text-center font-bold 2xl:text-4xl xl:text-3xl text-2xl lg:w-1/3 w-11/12 mt-5 lg:mt-0">
        Escolha entre estes currículos de alta aprovação
      </h1>
      <div className="p-2 bg-WeakLightGray lg:w-auto w-10/12 flex justify-center xl:gap-x-5 gap-x-4">
        {colors.map((handleColor, index) => (
          <ModelsColors
            key={index}
            backgroundColor={handleColor.color}
            onClick={() => {
              setColorPass(handleColor.color);
              setSelectedIndex(index);
            }}
            isSelected={selectedIndex === index}
          />
        ))}
      </div>
      <div className="absolute lg:top-14 lg:left-20 top-5 left-5">
        <ButtonBack />
      </div>

      <div className="relative flex justify-center items-center gap-x-12 w-full h-screen">
        {!isMd && (
          <>
            <ChevronLeft
              className="text-white bg-TitleGray absolute left-1 rounded-full pr-0.5"
              onClick={goToSlide}
            />
            <ChevronRight
              className="text-white bg-TitleGray absolute right-1 text-center rounded-full pl-0.5"
              onClick={goToSlide}
            />
          </>
        )}

        <div
          className={`${
            atualPageSlide === 1 ? (isMd ? "w-1/4" : "w-10/12") : "hidden"
          } flex h-full justify-center items-center`}
        >
          <ModelsThemes1 key={1} valuesCurriculum={valuesModel} />
        </div>
        
        <div
          className={`${
            (isMd || atualPageSlide === 2) ? (isMd ? "w-1/4" : "w-10/12") : "hidden"
          } h-full justify-center items-center`}
        >
          <ModelsThemes2 key={2} valuesCurriculum={valuesModel} />
        </div>
      </div>
    </div>
  );
}
