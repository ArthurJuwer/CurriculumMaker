import React, { useEffect, useContext } from "react";
import { CurriculumContext } from "../../../context/CurriculumContext";

export default function Score({ isLast }) {
  const { values, setValues } = useContext(CurriculumContext);

const updateScore = (condition, fieldName) => {
  setValues((prev) => {
    const itemIndex = prev.itemChecks.findIndex(item => item.name === fieldName);
    
    const updatedItemChecks = [...prev.itemChecks];
    if (condition && !prev.itemChecks[itemIndex].added) {
      updatedItemChecks[itemIndex].added = true; 
    } else if (!condition && prev.itemChecks[itemIndex].added) {
      updatedItemChecks[itemIndex].added = false; 
    }

    const addedItemsCount = updatedItemChecks.filter(item => item.added).length;

    let newScore = prev.score;
    if (addedItemsCount === 6) {
      newScore = 100; 
    } else {

      newScore = addedItemsCount * 18; 
    }


if (newScore < 0) {
  newScore = 0;
}


    return {
      ...prev,
      score: newScore, 
      itemChecks: updatedItemChecks,
    };
  });
};

  const validateContactInfo = (type, value) => {
    let error = false;
  
    if (type === 'email') {

      const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com']; // Domínios válidos
      const isValidEmail =
        validDomains.some(domain => value?.includes(domain)) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value); 
      error = !isValidEmail;
    } else if (type === 'telefone') {
      const isValidNumber = /^[0-9]{10,15}$/?.test(value);
      error = !isValidNumber;
    }
  
    return !error; 
  };
  
  const verificationLinkedin = values?.linkedin?.startsWith("https://www.linkedin.com/in/");
  const verificationContactEmail = validateContactInfo('email', values?.email); // Validação de email
  const verificationContactPhone = validateContactInfo('telefone', values?.telefone); // Validação de telefone
  const verificationContact = verificationContactEmail && verificationContactPhone; // Contato válido se ambos forem válidos
  

  const verificationObjective =
    values?.objective?.trim() !== "" &&
    values?.objective !== "texto do objetivo." &&
    values?.objective !== undefined

  const verificationFormationAndCertification =
    values?.certifications?.length >= 1 &&
    values?.formations?.some(
      (formation) =>
        formation?.school?.trim() !== "" &&
        formation?.title?.trim() !== "" &&
        formation?.yearEntry?.trim() !== "" &&
        formation?.yearLeave?.trim() !== ""
    );
  const verificationTwoLanguages =
    values?.languages?.length >= 2 &&
    values?.languages?.every((language) => language?.language?.trim() !== "");
  const verificationNameCurriculum =
    values?.nameCurriculum?.trim() !== "" && values?.nameCurriculum !== undefined;

  useEffect(() => {
    // Se a estrutura de itemChecks não estiver definida, inicializa com valores padrão
    if (!values?.itemChecks) {
      setValues((prev) => ({
        ...prev,
        itemChecks: [
          { name: 'hasLinkedInBeenAdded', added: false },
          { name: 'hasContactInfoBeenAdded', added: false },
          { name: 'hasObjectiveBeenAdded', added: false },
          { name: 'hasFormationAndCertificationBeenAdded', added: false },
          { name: 'hasTwoLanguagesBeenAdded', added: false },
          { name: 'hasNameCurriculumBeenAdded', added: false },
        ],
      }));
    }

    updateScore(verificationLinkedin, 'hasLinkedInBeenAdded');
    updateScore(verificationContact, 'hasContactInfoBeenAdded');
    updateScore(verificationObjective, 'hasObjectiveBeenAdded');
    updateScore(verificationFormationAndCertification, 'hasFormationAndCertificationBeenAdded');
    updateScore(verificationTwoLanguages, 'hasTwoLanguagesBeenAdded');
    updateScore(verificationNameCurriculum, 'hasNameCurriculumBeenAdded');
  }, [
    values?.email,
    values?.telefone, 
    values?.linkedin,
    values?.objective,
    values?.projects,
    values?.certifications,
    values?.formations,
    values?.languages,
    values?.nameCurriculum,
    values?.generalError
  ]);

  return (
    <div
      className={`flex items-center justify-between ${
        isLast === true ? "border-none" : "border-b-4"
      } ${
        values?.score < 36
          ? "border-red-500"
          : values?.score >= 36 && values?.score < 72
          ? "border-yellow-600"
          : "border-green-600"
      } 2xl:pb-4 pb-3`}
    >
      <div className="flex items-center gap-x-3">
        <span
          className={`2xl:h-9 h-8 w-16 ${
            values?.score < 36
              ? "bg-red-500"
              : values?.score >= 36 && values?.score < 72
              ? "bg-yellow-600"
              : "bg-green-600"
          } text-white flex items-center justify-center rounded-3xl font-semibold`}
        >
          {values?.score || 0}%
        </span>
        <p className="text-WeakGray text-base font-semibold">
          Pontuação do Currículo
        </p>
      </div>

      <div className="group 2xl:size-9 size-8 rounded-full bg-TitleGray text-xl text-white flex items-center justify-center relative">
        !
        <div
          className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute ${
            isLast ? "right-[-260%] top-28" : "right-full top-1/2"
          } transform -translate-y-1/2 mr-3 bg-white text-black p-4 rounded-md shadow-lg text-sm transition-opacity duration-300 w-max whitespace-nowrap`}
        >
          <div className="flex justify-between 2xl:gap-x-8 gap-x-4">
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
                  verificationContact ? "line-through" : ""
                }`}
              >
                Preencha Informações de Contato
              </li>
              <li
                className={`border-b border-gray-300 pb-1 ${
                  verificationObjective ? "line-through" : ""
                }`}
              >
                Preencha o Objetivo
              </li>
            </ul>

            <ul className="list-disc pl-5 space-y-2">
              <li
                className={`border-b border-gray-300 pb-1 ${
                  verificationFormationAndCertification ? "line-through" : ""
                }`}
              >
                Adicione uma Formação e Certificação
              </li>
              <li
                className={`border-b border-gray-300 pb-1 ${
                  verificationTwoLanguages ? "line-through" : ""
                }`}
              >
                Tenha pelo menos 2 Idiomas
              </li>
              <li
                className={`border-b border-gray-300 pb-1 ${
                  verificationNameCurriculum ? "line-through" : ""
                }`}
              >
                Coloque um nome para o arquivo
              </li>
            </ul>
          </div>

  
          <div
            className={`absolute ${
              isLast
                ? "-top-1.5 left-[81.5%] -translate-y-1/2 -rotate-90 border-[10px]"
                : "top-1/2 left-full -translate-y-1/2 border-[6px]"
            } border-transparent border-l-white`}
          ></div>
        </div>
      </div>
    </div>
  );
}
