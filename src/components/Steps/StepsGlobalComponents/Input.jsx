import { useState, useEffect } from "react";
import { Check, Trash, X } from "lucide-react";

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
    onDelete,
    validateAllInputs,
    resetValidation,
    onValidationError, // Função de callback para enviar o erro de validação para o pai
}) {
    const validDomains = [
        '@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com',
        '@icloud.com', '@aol.com', '@live.com', '@msn.com',
        '@zoho.com', '@protonmail.com',
    ];

    const [validationError, setValidationError] = useState(false);
    const [languageValue, setLanguageValue] = useState(value?.language || "");
    const [levelValue, setLevelValue] = useState(value?.level || "NATIVO");
    const [isEmpty, setIsEmpty] = useState(true);

    // Função para validar o input com base no tipo
    const validateInput = (value, type) => {
        let error = false;

        if (!value) {
            setIsEmpty(true);
            setValidationError(false);
            return false;
        }

        setIsEmpty(false);

        if (type === 'email') {
            const isValidEmail =
                validDomains.some(domain => value.includes(domain)) &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            error = !isValidEmail;
        } else if (type === 'number') {
            const isValidNumber = /^[0-9]{10,15}$/.test(value);
            error = !isValidNumber;
        } else if (type === 'year') {
            const currentYear = new Date().getFullYear();
            const yearValue = parseInt(value, 10);
            error = isNaN(yearValue) || yearValue < 1900 || yearValue > currentYear;
        } else if (type === 'linkedIn') {
            const isValidLinkedIn = value.startsWith('https://www.linkedin.com/in/');
            error = !isValidLinkedIn;
        }

        setValidationError(error);

        // Enviar o estado de erro para o componente pai
        if (onValidationError) {
            onValidationError(error);
        }

        return !error;
    };

    useEffect(() => {
        if (validateAllInputs) {
            validateInput(value, email ? 'email' : number ? 'number' : year ? 'year' : isLast ? 'linkedIn' : null);
        }
    }, [validateAllInputs, value]);

    // Função para resetar a validação
    useEffect(() => {
        if (resetValidation) {
            setValidationError(false);
            setIsEmpty(true);
        }
    }, [resetValidation]);

    const handleChange = (e) => {
        const inputType = email
            ? 'email'
            : number
            ? 'number'
            : year
            ? 'year'
            : isLast
            ? 'linkedIn'
            : null;

        onChange(e); // Passa o valor para a função onChange externa
        validateInput(e.target.value, inputType);

        if (e.target.type === "text") {
            setLanguageValue(e.target.value);
            onChange(e.target.value, levelValue);
        } else if (e.target.tagName === "SELECT") {
            setLevelValue(e.target.value);
            onChange(languageValue, e.target.value);
        }
    };
    const [showContent,setShowContent] = useState(null)
    const [isOnFocus, setIsOnFocus] = useState(null); 
    const [lastFocus, setLastFocus] = useState(null);


    const handleFocus = (e) => {
        if (onFocus) {
            onFocus(e); 
        }
        setIsOnFocus(e.target.id);
    };

    const handleBlur = (e) => {
        setLastFocus(e.target.id);
        setIsOnFocus(null); 
    };

    useEffect(() => {
        if (!validationError && !isEmpty) {
            if (isOnFocus) {
                // Se o campo ainda estiver focado, aguarda 1,5s
                const timer = setTimeout(() => {
                    setShowContent(true);
                }, 1500);

                return () => clearTimeout(timer); // Limpa o timer ao sair
            } else if (lastFocus) {
                // Se o campo perdeu o foco, verifica instantaneamente
                setShowContent(true);
            } else {
                setShowContent(false);
            }
        } else {
            setShowContent(false);
        }
    }, [isOnFocus, lastFocus, validationError, isEmpty]);

    const onlyNumbers = number || year


    return (
        <div className={`relative ${width} ${isLast ? 'last:w-full' : ''}`}>
            <label
                htmlFor={`input-${id}`}
                className="absolute bottom-12 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0"
            >
                {label}
            </label>

            <input
                type={onlyNumbers ? 'number' : 'text'}
                id={`input-${id}`}
                className={`border w-full 
                    ${isEmpty ? 'border-BorderInputGray' : validationError ? 'border-red-600 outline-red-600' : `${isSelect ? 'border-green-700' : 'border-BorderInputGray'} outline-green-700`}
                    ${onlyNumbers ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}
                    bg-transparent p-4 rounded-xl z-10
                `}
                onChange={handleChange}
                value={isSelect ? languageValue : value}
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

            {showContent && !isSelect && (
                
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 size-8 rounded-full bg-green-700 flex justify-center items-center">
                    <Check className="text-white size-6 mt-0.5 -rotate-2 "/>
                </div>
            )}
            {validationError && (
                <>
                    <p className="absolute -bottom-6 right-50 text-sm text-red-600">
                        {email ? "O e-mail informado não corresponde ao esperado." :
                        number ? "O número informado não corresponde ao esperado." :
                        year ? "Ano inválido." :
                        isLast ? "O link informado deve começar com \"https://www.linkedin.com/in/\"." : ""}
                    </p>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 size-8 rounded-full bg-red-600 flex justify-center items-center">
                        <X className="text-white size-6 "/>
                    </div>
                </>
            )}

            {isLast && (
                <a
                    className="absolute -bottom-5 right-0 text-sm text-DefaultOrange underline"
                    target="_blank"
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

            {isSelect && (
                id === 0 ? (
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
                )
            )}
        </div>
    );
}
