import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { CurriculumContext } from "../../../context/CurriculumContext";
import Input from "../StepsGlobalComponents/Input";
import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import ErrorMessage from "../StepsGlobalComponents/ErrorMessage";
import Curriculum from "../StepsGlobalComponents/Curriculum";

export default function HeaderCV() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const { setValues, values: contextValues } = useContext(CurriculumContext);

    const [formState, setFormState] = useState({
        score: contextValues?.score || '',
        generalError: '',
        color: params.get('color') || contextValues?.color || '#124f2b',
        model: params.get('model') || contextValues?.model || 1,
        name: contextValues?.name || 'Nome Completo',
        bairro: contextValues?.bairro || 'Bairro',
        cidade: contextValues?.cidade || 'Cidade',
        estado: contextValues?.estado || 'Estado',
        telefone: contextValues?.telefone || 'Telefone',
        email: contextValues?.email || 'Email',
        linkedin: contextValues?.linkedin || '',
        biggestPageReached: contextValues?.biggestPageReached || 1,
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        // Carregar valores do contexto apenas na montagem
        if (contextValues) {
            setFormState((prev) => ({
                ...prev,
                ...contextValues, // Preserva os valores anteriores e usa os do contexto
                color: params.get('color'),
                model: params.get('model'),

            }));
        }
    }, []); // [] garante que isso só execute na montagem
    
    useEffect(() => {
        // Atualize o contexto com o estado mais recente do formulário
        setValues((prev) => ({
            ...prev,
            ...formState, // Atualiza apenas os valores relevantes
        }));
        
    }, [formState]);

    const inputsArray = [
        { label: 'Nome Completo', placeholder: 'ex: João Carlos', key: 'name' },
        { label: 'Bairro', placeholder: 'ex: Farroupilha', key: 'bairro' },
        { label: 'Cidade', placeholder: 'ex: Porto Alegre', key: 'cidade' },
        { label: 'Estado', placeholder: 'ex: RS', key: 'estado' },
        { label: 'Telefone', placeholder: 'ex: (51) 00000-0000', key: 'telefone', number: true },
        { label: 'Email', placeholder: 'ex: joaocarlos@gmail.com', key: 'email', email: true },
        { label: 'Linkedin', placeholder: 'ex: https://www.linkedin.com/in/joaocarlos/', key: 'linkedin' },
    ];

    const handleChange = (key, value) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    const handleValidationError = (id, error) => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
    };

    

    // const errorConsult = () =>{
        
    // }

    const handleSubmit = () => {
        const allFieldsFilled = inputsArray.every(({ key, label }) => formState[key]?.trim() && formState[key] !== label);
        const allFieldsValid = Object.values(validationErrors).every((error) => !error);

        if (!allFieldsFilled) {
            setFormState((prev) => ({ ...prev, generalError: 'Preencha todos os campos' }));
            return;
        }

        if (!allFieldsValid) {
            setFormState((prev) => ({ ...prev, generalError: 'Corrija os erros antes de continuar' }));
            return;
        }

        navigate('/steps/presentationCV');
    };

    return (
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={3} />
            <div className="px-32 py-14 h-[calc(100vh-7rem)] flex justify-between gap-x-32">
                <div className="flex flex-col gap-y-8 w-8/12 h-full">
                    <Score />
                    <div className="h-full flex flex-col gap-y-8">
                        <Title
                            title='Cabeçalho'
                            description='Eles permitem que os empregadores vejam como podem entrar em contato com você.'
                        />
                        <div className="pt-5 w-full flex flex-wrap gap-x-4 gap-y-10 relative">
                            {inputsArray.map(({ label, placeholder, key, email, number }, index) => (
                                <Input
                                    key={index}
                                    id={index}
                                    label={label}
                                    isLast={index === inputsArray.length - 1}
                                    width='w-[calc(50%-0.5rem)]'
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    placeholder={placeholder}
                                    value={formState[key] !== undefined && formState[key] !== label ? formState[key] : ''}
                                    email={email}
                                    number={number}
                                    onValidationError={(error) => handleValidationError(key, error)}
                                />
                            ))}
                        </div>
                        <ButtonNext onClick={handleSubmit} />
                    </div>
                </div>
                <Curriculum />
            </div>
            <ErrorMessage message={formState.generalError} onClose={() => handleChange('generalError', '')} />
        </div>
    );
}
