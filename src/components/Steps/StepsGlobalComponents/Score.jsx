import React, { useState, useEffect } from "react";

export default function Score({ values, backValue, page, isLast }) {
  const [scoreValue, setScoreValue] = useState(values?.score || 0);

  const [hasLinkedInBeenAdded, setHasLinkedInBeenAdded] = useState(false);
  const [hasTwoStepBeenAdded, setHasTwoStepBeenAdded] = useState(false);
  const [hasObjectiveBeenAdded, setHasObjectiveBeenAdded] = useState(false);
  const [hasFormationAndCertificationBeenAdded, setHasFormationAndCertificationBeenAdded] = useState(false);
  const [hasTwoLanguagesBeenAdded, setHasTwoLanguagesBeenAdded] = useState(false);
  const [hasNameCurriculumBeenAdded, setHasNameCurriculumBeenAdded] = useState(false);

  const updateScore = (condition, setter, currentState) => {
    if (condition && !currentState) {
      setScoreValue((prev) => {
        const newScore = prev + (scoreValue === 90 ? 10 : 18);
        backValue(newScore); 
        return newScore;
      });
      setter(true);
    } else if (!condition && currentState) {
      setScoreValue((prev) => {
        const newScore = prev - (scoreValue === 100 ? 10 : 18);
        backValue(newScore);
        return newScore;
      });
      setter(false);
    }
  };

  
  const verificationLinkedin = values?.linkedin?.trim() !== "" && values?.linkedin !== undefined
  const verificationPage = page >= 2;
  const verificationObjectiveAndProjects = (values?.objective?.trim() !== "" && values?.objective !== "texto do objetivo.")

  && values?.projects?.some(
    (project) =>
      project?.title?.trim() !== "" &&
      project?.title !== "Projeto 1" || project?.title !== "Projeto 2" && 
      project?.category?.trim() !== "" &&
      project?.category !== "Categoria" &&
      project?.year?.trim() !== "" &&
      project?.year !== "ANO" &&
      project?.description?.trim() !== "" &&
      project?.description !== "descreva seu projeto aqui" 
  );
  const verificationFormationAndCertification = (values?.certifications?.length >= 1 &&
    values?.formations?.some(
      (formation) => 
        formation?.school?.trim() !== "" &&
        formation?.school !== "escola" && 
        formation?.title?.trim() !== "" &&
        formation?.title !== "titulo" &&
        formation?.yearEntry?.trim() !== "" &&
        formation?.yearEntry !== "ano entrada" &&
        formation?.yearLeave?.trim() !== "" &&
        formation?.yearEntry !== "ano saida" 
    )
  )
  const verificationTwoLanguages = (values?.languages?.length >= 2 &&
     values?.languages?.every(
      (language) =>
        language?.language !== "Língua" && language?.language !== ""
    )
  )
  const verificationNameCurriculum = (values?.nameCurriculum !== "" && values?.nameCurriculum !== undefined)

  console.log(verificationNameCurriculum)

  useEffect(() => {

    updateScore(
      verificationLinkedin &&
      page === 1,
      setHasLinkedInBeenAdded,
      hasLinkedInBeenAdded
    );
    updateScore(
      page === 2,
      setHasTwoStepBeenAdded,
      hasTwoStepBeenAdded
    );
    updateScore(
      verificationObjectiveAndProjects && page === 2,
      setHasObjectiveBeenAdded,
      hasObjectiveBeenAdded
    );
    updateScore(
      verificationFormationAndCertification &&
      page === 3,
      setHasFormationAndCertificationBeenAdded,
      hasFormationAndCertificationBeenAdded,
    )
    updateScore(
      verificationTwoLanguages &&
      page === 3,
      setHasTwoLanguagesBeenAdded,
      hasTwoLanguagesBeenAdded,
    )
    updateScore(
      verificationNameCurriculum && 
      page == 4,
      setHasNameCurriculumBeenAdded,
      hasNameCurriculumBeenAdded,
    )


  }, [values?.linkedin, values?.objective, values?.projects, values?.certifications, values?.formations, values?.languages, values?.nameCurriculum, page]);

  return (
    <div className={`flex items-center justify-between ${isLast === true ? 'border-none' : 'border-b-4'} ${scoreValue < 36 ? 'border-red-500' : scoreValue >= 36 && scoreValue < 72 ? 'border-yellow-600' : 'border-green-600'} pb-4`}>
      <div className="flex items-center gap-x-3">
      <span className={`h-9 w-16 ${scoreValue < 36 ? 'bg-red-500' : scoreValue >= 36 && scoreValue < 72 ? 'bg-yellow-600' : 'bg-green-600'} text-white flex items-center justify-center rounded-3xl font-semibold`}>
          {scoreValue}%
        </span>
        <p className="text-WeakGray text-base font-semibold">
          Pontuação do Currículo
        </p>
      </div>

      <div className="group w-9 h-9 rounded-full bg-TitleGray text-xl text-white flex items-center justify-center relative">
        !
        <div className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute ${isLast ? 'right-[-260%] top-28' : 'right-full top-1/2'} transform -translate-y-1/2 mr-3 bg-white text-black p-4 rounded-md shadow-lg text-sm transition-opacity duration-300 w-max whitespace-nowrap`}>
          <div className="flex justify-between gap-x-8">
            <ul className="list-disc pl-5 space-y-2">
              <li
                className={`border-b border-gray-300 pb-1 ${
                  verificationLinkedin ? "line-through" : ""
                }`}
              >
                Adicione o LinkedIn
              </li>
              <li
                className={`border-b border-gray-300 pb-1 ${
                  verificationPage  ? "line-through" : ""
                }`}
              >
                Passe para segunda etapa
              </li>
              <li
                className={`border-b border-gray-300 pb-1 ${
                  verificationObjectiveAndProjects ? "line-through" : ""
                }`}
              >
                Preencha Objetivo e Experiências
              </li>
            </ul>

            <ul className="list-disc pl-5 space-y-2">
              <li className={`border-b border-gray-300 pb-1 ${
                  verificationFormationAndCertification ? "line-through" : ""
                }`}
              >
                Adicione uma Formação e Certificação
              </li>
              <li className={`border-b border-gray-300 pb-1 ${
                  verificationTwoLanguages ? "line-through" : ""
                }`}
              >
                Tenha pelo menos 2 Idiomas
              </li>
              <li className={`border-b border-gray-300 pb-1 ${
                  verificationNameCurriculum ? "line-through" : ""
                }`}
              >
                Coloque um nome para o arquivo
              </li>
            </ul>
          </div>

          <div className={`absolute ${isLast ? '-top-1.5 left-[81.5%] -translate-y-1/2 -rotate-90 border-[10px]' : 'top-1/2 left-full -translate-y-1/2 border-[6px]'}    border-transparent border-l-white`}></div>
        </div>
      </div>
    </div>
  );
}
