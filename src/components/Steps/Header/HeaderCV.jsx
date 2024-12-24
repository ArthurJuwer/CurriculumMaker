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
    const color = params.get('color');
    const model = params.get('model');

    const { setValues, values: contextValues } = useContext(CurriculumContext);

    const [score, setScore] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [name, setName] = useState('Nome Completo');
    const [bairro, setBairro] = useState('Bairro');
    const [cidade, setCidade] = useState('Cidade');
    const [estado, setEstado] = useState('Estado');
    const [telefone, setTelefone] = useState('Telefone');
    const [email, setEmail] = useState('Email');
    const [linkedin, setLinkedin] = useState('');

    const navigate = useNavigate();

    const inputsArray = [
        { label: 'Nome Completo', placeholder: 'ex: João Carlos', setVariable: setName, value: name },
        { label: 'Bairro', placeholder: 'ex: Farroupilha', setVariable: setBairro, value: bairro },
        { label: 'Cidade', placeholder: 'ex: Porto Alegre', setVariable: setCidade, value: cidade },
        { label: 'Estado', placeholder: 'ex: RS', setVariable: setEstado, value: estado },
        { label: 'Telefone', placeholder: 'ex: (51) 00000-0000', setVariable: setTelefone, value: telefone, number: true },
        { label: 'Email', placeholder: 'ex: joaocarlos@gmail.com', setVariable: setEmail, value: email, email: true },
        { label: 'Linkedin', placeholder: 'ex: https://www.linkedin.com/in/joaocarlos/', setVariable: setLinkedin, value: linkedin },
    ];

    const values = { score, model, color, name, email, bairro, cidade, estado, telefone, linkedin };

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        // Carregue os valores iniciais do contexto ou outra fonte
        if (contextValues) {
            setName(contextValues.name || 'Nome Completo');
            setBairro(contextValues.bairro || 'Bairro');
            setCidade(contextValues.cidade || 'Cidade');
            setEstado(contextValues.estado || 'Estado');
            setTelefone(contextValues.telefone || 'Telefone');
            setEmail(contextValues.email || 'Email');
            setLinkedin(contextValues.linkedin || '');
        }
    }, [contextValues]);

    const handleValidationError = (id, error) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [id]: error,
        }));
    };

    const handleSubmit = () => {
        const allFieldsFilled = inputsArray.every((item) => item?.value !== item?.label && item?.value.trim() !== "");
        const allFieldsValid = Object.values(validationErrors).every((error) => error === false);

        if (!allFieldsFilled) {
            setGeneralError('Preencha todos os campos');
            return;
        }

        if (!allFieldsValid) {
            setGeneralError('Corrija os erros antes de continuar');
            return;
        }

        setValues(values);
        navigate('/steps/presentationCV');
    };

    return (
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={3} />
            <div className="px-32 py-14 h-[calc(100vh-7rem)] flex justify-between gap-x-32">
                <div className="flex flex-col gap-y-8 w-8/12 h-full">
                    <Score values={values} page={1} backValue={(newScore) => setScore(newScore)} />
                    <div className="h-full flex flex-col gap-y-8">
                        <Title
                            title='Cabeçalho'
                            description='Eles permitem que os empregadores vejam como podem entrar em contato com você.'
                        />
                        <div className="pt-5 w-full flex flex-wrap gap-x-4 gap-y-10 relative">
                            {inputsArray.map((item, index) => (
                                <Input
                                    key={index}
                                    id={index}
                                    label={item?.label}
                                    isLast={index === inputsArray.length - 1}
                                    width={'w-[calc(50%-0.5rem)]'}
                                    onChange={(e) => {
                                        if (item?.setVariable) {
                                            item.setVariable(e.target.value);
                                        }
                                    }}
                                    placeholder={item?.placeholder}
                                    value={item?.value !== undefined && item?.value !== item?.label ? item?.value : ''}
                                    email={item?.email}
                                    number={item?.number}
                                    onValidationError={(error) => handleValidationError(index, error)}
                                />
                            ))}
                        </div>
                        <ButtonNext onClick={handleSubmit} />
                    </div>
                </div>
                <Curriculum valuesCurriculum={values} />
            </div>
            <ErrorMessage message={generalError} onClose={() => setGeneralError('')} />
        </div>
    );
}
