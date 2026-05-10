"use client";

import { useEffect, useState } from "react";
import { Check, Trash, X } from "lucide-react";
import { isValidEmail, isValidPhone } from "@/lib/validation";

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

export default function Input({
  id,
  label,
  width,
  value,
  isLast,
  isSelect,
  onChange,
  onFocus,
  placeholder,
  number,
  email,
  year,
  yearNoRange,
  yearNoRangeIsBig,
  conclusion,
  onDelete,
  validateAllInputs,
  resetValidation,
  onValidationError,
  disabled,
}) {
  const [validationError, setValidationError] = useState(false);
  const [languageValue, setLanguageValue] = useState(value?.language || "");
  const [levelValue, setLevelValue] = useState(value?.level || "NATIVO");
  const [isEmpty, setIsEmpty] = useState(true);
  const [showContent, setShowContent] = useState(null);
  const [isOnFocus, setIsOnFocus] = useState(null);
  const [lastFocus, setLastFocus] = useState(null);

  const validateInput = (val, type) => {
    if (!val) {
      setIsEmpty(true);
      setValidationError(false);
      return false;
    }

    setIsEmpty(false);
    let error = false;

    if (type === "email") {
      error = !isValidEmail(val);
    } else if (type === "number") {
      error = !isValidPhone(val);
    } else if (type === "year") {
      const currentYear = new Date().getFullYear();
      const yearValue = parseInt(val, 10);
      error =
        isNaN(yearValue) ||
        yearValue < 1900 ||
        (!yearNoRange ? yearValue > currentYear : null);
    } else if (type === "linkedIn") {
      error = !val.startsWith("https://www.linkedin.com/in/");
    }

    setValidationError(error);
    onValidationError?.(error);
    return !error;
  };

  useEffect(() => {
    if (disabled) {
      setValidationError(false);
      setIsEmpty(true);
      onValidationError?.(false);
      return;
    }
    if (validateAllInputs) {
      const type = email
        ? "email"
        : number
        ? "number"
        : year
        ? "year"
        : isLast
        ? "linkedIn"
        : null;
      validateInput(value, type);
    }
  }, [validateAllInputs, value, disabled]);

  useEffect(() => {
    if (resetValidation) {
      setValidationError(false);
      setIsEmpty(true);
    }
  }, [resetValidation]);

  const handleChange = (e) => {
    const inputType = email
      ? "email"
      : number
      ? "number"
      : year
      ? "year"
      : isLast
      ? "linkedIn"
      : null;

    if (number && e.target.tagName === "INPUT") {
      e.target.value = formatPhone(e.target.value);
    }

    validateInput(e.target.value, inputType);

    if (isSelect) {
      if (e.target.tagName === "SELECT") {
        setLevelValue(e.target.value);
        onChange(languageValue, e.target.value);
      } else {
        setLanguageValue(e.target.value);
        onChange(e.target.value, levelValue);
      }
      return;
    }

    onChange(e);
  };

  const handleFocus = (e) => {
    onFocus?.(e);
    setIsOnFocus(e.target.id);
  };

  const handleBlur = (e) => {
    setLastFocus(e.target.id);
    setIsOnFocus(null);
  };

  useEffect(() => {
    if (!validationError && !isEmpty) {
      if (isOnFocus) {
        const timer = setTimeout(() => setShowContent(true), 1500);
        return () => clearTimeout(timer);
      } else if (lastFocus) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    } else {
      setShowContent(false);
    }
  }, [isOnFocus, lastFocus, validationError, isEmpty]);

  const onlyNumbers = year;

  return (
    <div className={`relative ${width} ${isLast ? "last:w-full" : ""}`}>
      <label
        htmlFor={`input-${id}`}
        className="absolute xl:text-base text-sm bottom-12 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0"
      >
        {label}
      </label>

      <input
        type={onlyNumbers ? "number" : number ? "tel" : "text"}
        inputMode={number ? "tel" : undefined}
        id={`input-${id}`}
        disabled={disabled}
        className={`border w-full
          ${
            isEmpty
              ? "border-BorderInputGray"
              : validationError || yearNoRangeIsBig || conclusion
              ? "border-red-600 outline-red-600"
              : `${isSelect ? "border-green-700" : "border-BorderInputGray"} outline-green-700`
          }
          ${
            onlyNumbers
              ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              : ""
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          bg-transparent 2xl:pl-4 p-4 pl-3 rounded-xl z-10
        `}
        onChange={handleChange}
        value={
          isSelect
            ? languageValue
            : number
            ? formatPhone(value || "")
            : value
        }
        placeholder={placeholder}
        aria-invalid={validationError ? "true" : "false"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={(e) => {
          if (year && e.target.value.length > 4) {
            e.target.value = e.target.value.slice(0, 4);
            handleChange(e);
          }
        }}
      />

      {showContent && !isSelect && !yearNoRangeIsBig && !conclusion && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 2xl:size-8 size-7 rounded-full bg-green-700 flex justify-center items-center">
          <Check className="text-white 2xl:size-6 size-5 mt-0.5 -rotate-2" />
        </div>
      )}

      {validationError && (
        <>
          <p className="absolute -bottom-6 right-50 xl:text-sm text-[0.55rem] text-red-600 z-40">
            {email
              ? "O e-mail informado não corresponde ao esperado."
              : number
              ? "O número informado não corresponde ao esperado."
              : year
              ? "Ano inválido."
              : isLast
              ? 'O link informado deve começar com "https://www.linkedin.com/in/".'
              : ""}
          </p>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 2xl:size-8 size-7 rounded-full bg-red-600 flex justify-center items-center">
            <X className="text-white 2xl:size-6 size-5" />
          </div>
        </>
      )}

      {isLast && !disabled && (
        <a
          className="absolute -bottom-5 right-0 text-sm text-DefaultOrange underline"
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/"
        >
          Acessar Linkedin
        </a>
      )}

      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="absolute -top-3 -right-3 p-1 bg-red-600 text-white rounded-full z-20"
        >
          <Trash className="w-5 h-5" />
        </button>
      )}

      {isSelect &&
        (id === 0 ? (
          <h1 className="absolute right-4 bottom-3 px-5 rounded-xl py-1 bg-transparent border border-BorderInputGray text-TitleGray font-semibold">
            NATIVO
          </h1>
        ) : (
          <select
            id={id}
            className="absolute right-4 bottom-3 px-5 rounded-xl py-1 bg-transparent border border-BorderInputGray text-TitleGray font-semibold"
            value={levelValue}
            onChange={handleChange}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
        ))}
    </div>
  );
}
