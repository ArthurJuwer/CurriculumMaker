"use client";

import { useContext, useEffect } from "react";
import { CurriculumContext } from "@/contexts/CurriculumContext";

const SCORE_ITEMS = [
  "hasLinkedInBeenAdded",
  "hasContactInfoBeenAdded",
  "hasObjectiveBeenAdded",
  "hasFormationAndCertificationBeenAdded",
  "hasTwoLanguagesBeenAdded",
  "hasNameCurriculumBeenAdded",
];

const validateContactInfo = (type, value) => {
  if (!value) return false;
  if (type === "email") {
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    return (
      validDomains.some((domain) => value.includes(domain)) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    );
  }
  if (type === "telefone") {
    return /^[0-9]{10,15}$/.test(value);
  }
  return false;
};

export default function Score({ isLast }) {
  const { values, setValues } = useContext(CurriculumContext);

  const updateScore = (condition, fieldName) => {
    setValues((prev) => {
      if (!prev?.itemChecks) return prev;

      const itemIndex = prev.itemChecks.findIndex((item) => item.name === fieldName);
      if (itemIndex === -1) return prev;

      const updatedItemChecks = [...prev.itemChecks];
      if (condition && !prev.itemChecks[itemIndex].added) {
        updatedItemChecks[itemIndex] = { ...updatedItemChecks[itemIndex], added: true };
      } else if (!condition && prev.itemChecks[itemIndex].added) {
        updatedItemChecks[itemIndex] = { ...updatedItemChecks[itemIndex], added: false };
      }

      const addedItemsCount = updatedItemChecks.filter((item) => item.added).length;
      const newScore = addedItemsCount === 6 ? 100 : addedItemsCount * 18;

      return {
        ...prev,
        score: Math.max(0, newScore),
        itemChecks: updatedItemChecks,
      };
    });
  };

  const verificationLinkedin = values?.linkedin?.startsWith("https://www.linkedin.com/in/");
  const verificationContactEmail = validateContactInfo("email", values?.email);
  const verificationContactPhone = validateContactInfo("telefone", values?.telefone);
  const verificationContact = verificationContactEmail && verificationContactPhone;

  const verificationObjective =
    values?.objective?.trim() !== "" &&
    values?.objective !== "texto do objetivo." &&
    values?.objective !== undefined;

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
    if (!values?.itemChecks) {
      setValues((prev) => ({
        ...prev,
        itemChecks: SCORE_ITEMS.map((name) => ({ name, added: false })),
      }));
    }

    updateScore(verificationLinkedin, "hasLinkedInBeenAdded");
    updateScore(verificationContact, "hasContactInfoBeenAdded");
    updateScore(verificationObjective, "hasObjectiveBeenAdded");
    updateScore(verificationFormationAndCertification, "hasFormationAndCertificationBeenAdded");
    updateScore(verificationTwoLanguages, "hasTwoLanguagesBeenAdded");
    updateScore(verificationNameCurriculum, "hasNameCurriculumBeenAdded");
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
    values?.generalError,
  ]);

  const score = values?.score || 0;
  const borderClass =
    score < 36 ? "border-red-500" : score < 72 ? "border-yellow-600" : "border-green-600";
  const bgClass =
    score < 36 ? "bg-red-500" : score < 72 ? "bg-yellow-600" : "bg-green-600";

  return (
    <div
      className={`flex items-center justify-between ${
        isLast === true ? "border-none" : "border-b-4"
      } ${borderClass} 2xl:pb-4 pb-3`}
    >
      <div className="flex items-center gap-x-3">
        <span
          className={`2xl:h-9 h-8 w-16 ${bgClass} text-white flex items-center justify-center rounded-3xl font-semibold`}
        >
          {score}%
        </span>
        <p className="text-WeakGray text-base font-semibold">Pontuação do Currículo</p>
      </div>

      <div className="group 2xl:size-9 size-8 rounded-full bg-TitleGray text-xl text-white flex items-center justify-center relative">
        !
        <div
          className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute ${
            isLast ? "xl:right-[-260%] right-0 xl:top-28 top-36" : "right-8 xl:top-1/2 top-28"
          } transform -translate-y-1/2 mr-3 bg-white text-black p-4 rounded-md shadow-lg text-sm transition-opacity duration-300 w-max whitespace-nowrap z-50`}
        >
          <div className="flex flex-col xl:flex-row justify-between 2xl:gap-x-8 gap-x-4">
            <ul className="list-disc pl-5 space-y-2">
              <li className={`border-b border-gray-300 pb-1 ${verificationLinkedin ? "line-through" : ""}`}>
                Adicione o LinkedIn
              </li>
              <li className={`border-b border-gray-300 pb-1 ${verificationContact ? "line-through" : ""}`}>
                Preencha Informações de Contato
              </li>
              <li className={`border-b border-gray-300 pb-1 ${verificationObjective ? "line-through" : ""}`}>
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
              <li className={`border-b border-gray-300 pb-1 ${verificationTwoLanguages ? "line-through" : ""}`}>
                Tenha pelo menos 2 Idiomas
              </li>
              <li className={`border-b border-gray-300 pb-1 ${verificationNameCurriculum ? "line-through" : ""}`}>
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
          />
        </div>
      </div>
    </div>
  );
}
