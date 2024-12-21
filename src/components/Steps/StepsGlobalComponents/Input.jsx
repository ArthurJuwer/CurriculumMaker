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

    // Função para validar o input de acordo com o tipo
    const validateInput = (value, type) => {
        if (!value || value === label || value === undefined) return false;
        if (type === 'email') {
            return validDomains.some(domain => value.includes(domain));
        }
        if (type === 'number') {
            return /^[0-9]{10,15}$/.test(value);
        }
        return true;
    };

    // Função para formatar o número de telefone
    const formatPhoneNumber = (phone) => {
        return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const verificationInput = number
        ? validateInput(value, 'number')
        : email
        ? validateInput(value, 'email')
        : validateInput(value);
    
    const formattedValue = number ? formatPhoneNumber(value) : value;


    return (
        <div className={`relative ${width} ${isLast ? 'last:w-full' : ''}`}>
            <label
                htmlFor={`input-${id}`}
                className="absolute bottom-12 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0"
            >
                {label}
            </label>

            {/* Input field with dynamic border color */}
            
            <input
                type="text"
                id={`input-${id}`}
                className={`border w-full ${verificationInput ? 'border-green-600 outline-green-600' : 'border-BorderInputGray'} bg-transparent p-4 rounded-xl z-10`}
                onChange={onChange}
                value={formattedValue}
                placeholder={placeholder}
                email={email}
                number={number}
            />
            {isLast ? <a href="https://www.linkedin.com/in/" target="_blank" className="absolute -bottom-6 right-0 text-sm underline text-DefaultOrange">acessar sua conta</a> : ''}

            {/* Delete button (if provided) */}
            {onDelete && (
                <button
                    onClick={() => onDelete(id)}
                    className="absolute -top-3 -right-3 p-1 bg-red-600 text-white rounded-full z-20"
                >
                    <Trash className="w-5 h-5" />
                </button>
            )}

            {/* Select option handling */}
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
                        value={value?.level} // Ensure the `value` has a `level` property
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
