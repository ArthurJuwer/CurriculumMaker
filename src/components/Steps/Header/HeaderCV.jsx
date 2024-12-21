import { useContext, useState, useEffect } from "react";
import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Input from "../StepsGlobalComponents/Input";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import { useLocation } from 'react-router-dom';
import { CurriculumContext } from "../../../context/CurriculumContext";

export default function HeaderCV() {
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const color = params.get('color');
    const model = params.get('model');
    const [score, setScore] = useState('');
    const [name, setName] = useState('Nome Completo');
    const [bairro, setBairro] = useState('Bairro');
    const [cidade, setCidade] = useState('Cidade');
    const [estado, setEstado] = useState('Estado');
    const [telefone, setTelefone] = useState('Telefone');
    const [email, setEmail] = useState('Email');
    const [linkedin, setLinkedin] = useState('');
    const [link, setLink] = useState(null);

    const { setValues } = useContext(CurriculumContext);

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

    const handleSubmit = () => {
        const isValid = inputsArray.every((item) => 
            item?.value !== item?.label && item?.value !== '' && item?.value !== undefined
        );
    
        if (!isValid) {
            alert('PREENCHA TODOS OS CAMPOS');
            return;
        }
    
        // Atualiza os valores no contexto e navega para a próxima página
        setValues(values);
        setLink('/steps/presentationCV');
    };

    return (
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={3} />
            <div className="px-32 py-14 h-[calc(100vh-7rem)] flex justify-between gap-x-32">
                <div className="flex flex-col gap-y-8 w-8/12 h-full">
                    <Score values={values} page={1} backValue={(newScore) => setScore(newScore)}/>
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
                                    onChange={(e) => item?.setVariable(e.target.value)}
                                    placeholder={item?.placeholder}
                                    value={item?.value == item?.label ? '' : item?.value}
                                    email={item?.email}
                                    number={item?.number}
                                    
                                />
                            ))}
                        </div>
                        <ButtonNext onClick={handleSubmit} link={link}/>
                    </div>
                </div>
                <Curriculum valuesCurriculum={values}/>
            </div>
        </div>
    );
}
