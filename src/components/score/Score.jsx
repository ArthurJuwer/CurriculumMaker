"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import { isValidEmail, isValidPhone } from "@/lib/validation";

const SCORE_ITEMS = [
  "hasLinkedInBeenAdded",
  "hasContactInfoBeenAdded",
  "hasObjectiveBeenAdded",
  "hasFormationAndCertificationBeenAdded",
  "hasTwoLanguagesBeenAdded",
  "hasNameCurriculumBeenAdded",
];

export default function Score({ isLast }) {
  const { values, setValues } = useContext(CurriculumContext);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

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

  const verificationLinkedin =
    values?.noLinkedin === true ||
    values?.linkedin?.startsWith("https://www.linkedin.com/in/");
  const verificationContactEmail = isValidEmail(values?.email);
  const verificationContactPhone = isValidPhone(values?.telefone);
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
    values?.noLinkedin,
    values?.objective,
    values?.projects,
    values?.certifications,
    values?.formations,
    values?.languages,
    values?.nameCurriculum,
    values?.generalError,
  ]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const score = values?.score || 0;
  const borderClass =
    score < 36 ? "border-red-500" : score < 72 ? "border-yellow-600" : "border-green-600";
  const bgClass =
    score < 36 ? "bg-red-500" : score < 72 ? "bg-yellow-600" : "bg-green-600";

  const linkedinLabel = values?.noLinkedin === true ? "Marcar “Não tenho LinkedIn”" : "Adicione o LinkedIn";

  return (
    <div
      className={`flex items-center justify-between ${
        isLast === true ? "border-none" : "border-b-4"
      } ${borderClass} 2xl:pb-4 pb-2.5`}
    >
      <div className="flex items-center gap-x-2.5">
        <span
          className={`2xl:h-9 h-7 2xl:w-16 w-14 ${bgClass} text-white flex items-center justify-center rounded-3xl font-semibold 2xl:text-base text-sm`}
        >
          {score}%
        </span>
        <p className="text-WeakGray 2xl:text-base text-sm font-semibold">Pontuação do Currículo</p>
      </div>

      <div ref={containerRef} className="relative">
        <button
          type="button"
          aria-label="Ver itens pendentes"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="2xl:size-9 size-7 rounded-full bg-TitleGray 2xl:text-xl text-lg text-white flex items-center justify-center"
        >
          !
        </button>
        {isOpen && (
          <div
            className="absolute right-0 top-full mt-3 bg-white text-black p-4 rounded-md shadow-lg text-sm z-50 w-[min(20rem,calc(100vw-2rem))] xl:w-max"
          >
            <div className="flex flex-col xl:flex-row 2xl:gap-x-8 xl:gap-x-4 gap-y-2">
              <ul className="list-disc pl-5 space-y-2">
                <li className={`border-b border-gray-300 pb-1 ${verificationLinkedin ? "line-through" : ""}`}>
                  {linkedinLabel}
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
            <div className="absolute -top-1.5 right-3 size-3 bg-white rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
}
