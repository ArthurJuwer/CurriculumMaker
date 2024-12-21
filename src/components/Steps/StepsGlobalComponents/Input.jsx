import { useState } from "react";
import { Trash } from "lucide-react";

export default function Input({
    id,
    label,
    width,
    value,
    isLast,
    isSelect,
    onChange,
    placeholder,
    number,
    email,
    onDelete,
}) {
    const validDomains = [
        '@gmail.com',
        '@hotmail.com',
        '@yahoo.com',
        '@outlook.com',
        '@icloud.com',
        '@aol.com',
        '@live.com',
        '@msn.com',
        '@zoho.com',
        '@protonmail.com',
    ];

    const [isValid, setIsValid] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidNumber, setIsInvalidNumber] = useState(false);

    const validateInput = (value, type) => {
        if (!value || value === label) return false;

        if (type === 'email') {
            const isValidEmail =
                validDomains.some(domain => value.includes(domain)) &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            setIsInvalidEmail(!isValidEmail);
            return isValidEmail;
        }

        if (type === 'number') {
            const isValidNumber = /^[0-9]{10,15}$/.test(value);
            setIsInvalidNumber(!isValidNumber);
            return isValidNumber;
        }

        setIsInvalidEmail(false);
        setIsInvalidNumber(false);
        return true;
    };

    const formatPhoneNumber = (phone) => {
        const onlyNumbers = phone.replace(/\D/g, '');
        if (onlyNumbers.length === 11) {
            return onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        return phone; // Retorna o valor original se não for possível formatar
    };

    const handleValidation = (value) => {
        let valid = true;

        if (number) {
            valid = validateInput(value, 'number');
        } else if (email) {
            valid = validateInput(value, 'email');
        }

        setIsValid(valid);
    };

    const handleChange = (e) => {
        onChange(e);
        handleValidation(e.target.value);
    };

    const formattedValue = number ? formatPhoneNumber(value) : value;

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
                    isValid
                    ? 'border-green-600 outline-green-600' 
                    : isInvalidEmail || isInvalidNumber
                    ? 'border-red-600' 
                    : 'border-BorderInputGray'
                } bg-transparent p-4 rounded-xl z-10`}
                onChange={handleChange}
                value={formattedValue}
                placeholder={placeholder}
                email={email}
                number={number}
            />

            {isLast && (
                <a
                    href="https://www.linkedin.com/in/"
                    target="_blank"
                    className="absolute -bottom-6 right-0 text-sm underline text-DefaultOrange"
                >
                    acessar sua conta
                </a>
            )}
            {isInvalidEmail && (
                <p 
                    className="absolute -bottom-6 right-50 text-sm text-red-600"
                >
                    O e-mail informado não corresponde ao esperado.
                </p>
            )}
            {isInvalidNumber && (
                <p 
                    className="absolute -bottom-6 right-50 text-sm text-red-600"
                >
                    O número informado não corresponde ao esperado.
                </p>
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
