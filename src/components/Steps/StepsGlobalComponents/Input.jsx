import { useState, useEffect } from "react";
import { Trash } from "lucide-react";

export default function Input({
    id,
    label,
    width,
    value,
    isLast, // Usado para validação de LinkedIn
    isSelect,
    onChange,
    placeholder,
    number,
    email,
    year,
    onDelete,
    validateAllInputs, // Função para revalidar todos os inputs
    resetValidation, // Função para resetar a validação ao mudar de projeto
}) {
    const validDomains = [
        '@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com',
        '@icloud.com', '@aol.com', '@live.com', '@msn.com',
        '@zoho.com', '@protonmail.com',
    ];

    const [validationError, setValidationError] = useState(false);
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
            // Obter o ano atual
            const currentYear = new Date().getFullYear();
            // Verificar se o valor é um número e se está dentro do intervalo permitido
            const yearValue = parseInt(value, 10);
            error = isNaN(yearValue) || yearValue < 1900 || yearValue > currentYear;
        } else if (type === 'linkedIn') {
            const isValidLinkedIn = value.startsWith('https://www.linkedin.com/in/');
            error = !isValidLinkedIn;
        }
    
        setValidationError(error); // Aplica o erro para o campo específico
        return !error;
    };

    // Função chamada sempre que o valor de um input mudar
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
        validateInput(e.target.value, inputType); // Valida o input com base no tipo
    };

    // Função para validar todos os inputs ao mudar de projeto
    useEffect(() => {
        if (validateAllInputs) {
            validateInput(value, email ? 'email' : number ? 'number' : year ? 'year' : isLast ? 'linkedIn' : null);
        }
    }, [validateAllInputs, value]); // Revalida sempre que o projeto mudar ou o valor mudar

    // Função para resetar a validação (passada quando o projeto muda)
    useEffect(() => {
        if (resetValidation) {
            setValidationError(false); // Reseta o erro quando o projeto mudar
            setIsEmpty(true); // Reseta o estado de vazio
        }
    }, [resetValidation]);

    return (
        <div className={`relative ${width} ${isLast ? 'last:w-full' : ''}`}>
            <label
                htmlFor={`input-${id}`}
                className="absolute bottom-12 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0"
            >
                {label}
            </label>

            <input
                type="text"
                id={`input-${id}`}
                className={`border w-full ${
                    isEmpty
                        ? 'border-BorderInputGray'
                        : validationError
                        ? 'border-red-600 outline-red-600' // Apenas o campo com erro ficará vermelho
                        : 'border-green-600 outline-green-600'
                } bg-transparent p-4 rounded-xl z-10`}
                onChange={handleChange}
                value={value}
                placeholder={placeholder}
                aria-invalid={validationError ? "true" : "false"}
            />

            {validationError && (
                <p className="absolute -bottom-6 right-50 text-sm text-red-600">
                    {email ? "O e-mail informado não corresponde ao esperado." :
                    number ? "O número informado não corresponde ao esperado." :
                    year ? "Ano inválido." :
                    isLast ? "O link informado deve começar com \"https://www.linkedin.com/in/\"." : ""}
                </p>
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
                        id={`select-${id}`}
                        className="absolute right-4 bottom-3 px-5 rounded-xl py-1 bg-transparent border border-BorderInputGray text-TitleGray font-semibold"
                        onChange={(e) => onChange(e, id, 'level')}
                        value={value?.level || ''}
                    >
                        {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                )
            )}
        </div>
    );
}
