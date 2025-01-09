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
import { ArrowLeft, ReceiptText } from "lucide-react";

export default function HeaderCV() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [mobileOpenCurriculum, setMobileOpenCurriculum] = useState(false)

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
                color: params.get('color') || contextValues?.color,
                model: params.get('model') || contextValues?.model,

            }));
        }
    }, []); 
    
    useEffect(() => {

        setValues((prev) => ({
            ...prev,
            ...formState, 
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
        <div className="min-h-dvh w-full bg-DefaultGray">
            <TopMarker stepsAtual={3} />
            <div className={`${mobileOpenCurriculum ? 'flex flex-col' : ''} 2xl:px-32 2xl:py-14 xl:px-16 px-4 py-6 2xl:h-[calc(100dvh-7rem)] xl:h-[calc(100dvh-4.5rem)] flex justify-between 2xl:gap-x-32 xl:gap-x-5`}>
                <div className="flex flex-col 2xl:gap-y-8 gap-y-3 xl:w-8/12 w-full h-full overflow-y-auto">
                    <Score />
                    <div className={`${mobileOpenCurriculum ? 'hidden' : 'block'} h-full flex flex-col 2xl:gap-y-8 gap-y-4`}>
                        <Title
                            title='Cabeçalho'
                            description='Eles permitem que os empregadores vejam como podem entrar em contato com você.'
                        />
                        <div className="2xl:pt-5 pt-4 w-full flex flex-wrap 2xl:gap-x-4 gap-x-3 2xl:gap-y-10 gap-y-7 relative">
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
                        <div className="flex justify-center">
                            <button 
                                className="xl:hidden rounded-3xl  w-36 h-12 bg-TitleGray text-white text-sm flex items-center justify-center gap-x-2"
                                onClick={ ()=> setMobileOpenCurriculum(true)}
                            >
                                    <ReceiptText strokeWidth={1.5} />
                                    Ver Currículo
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className={`${mobileOpenCurriculum ? 'block mt-6' : 'hidden'} 2xl:w-4/12 xl:w-5/12 xl:block min-h-[70dvh] h-[70dvh] w-full `}>   
                    <Curriculum key={1} />
                </div>
                <div className={`${mobileOpenCurriculum ? 'block mt-6' : 'hidden'} flex justify-center`}>
                    <button 
                        className="xl:hidden rounded-3xl w-36 h-12 bg-TitleGray text-white text-sm flex items-center justify-center gap-x-2"
                        onClick={ ()=> setMobileOpenCurriculum(false)}
                    >
                            <ArrowLeft />
                            Voltar
                    </button>
                </div>                 
            </div>
            <ErrorMessage message={formState.generalError} onClose={() => handleChange('generalError', '')} />
        </div>
    );
}
