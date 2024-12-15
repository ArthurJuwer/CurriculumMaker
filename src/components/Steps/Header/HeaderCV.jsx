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

    const [name, setName] = useState('Nome Completo');
    const [bairro, setBairro] = useState('Bairro');
    const [cidade, setCidade] = useState('Cidade');
    const [estado, setEstado] = useState('Estado');
    const [telefone, setTelefone] = useState('Telefone');
    const [email, setEmail] = useState('Email');
    const [linkedin, setLinkedin] = useState('');

    const { setValues } = useContext(CurriculumContext);

    const inputsArray = [
        { label: 'Nome Completo', setVariable: setName },
        { label: 'Bairro', setVariable: setBairro },
        { label: 'Cidade', setVariable: setCidade },
        { label: 'Estado', setVariable: setEstado },
        { label: 'Telefone', setVariable: setTelefone },
        { label: 'Email', setVariable: setEmail },
        { label: 'Linkedin', setVariable: setLinkedin },
    ];

    const handleSubmit = () => {
        const valuesCurriculum = { model, color, name, email, bairro, cidade, estado, telefone, linkedin };
        
        setValues(valuesCurriculum);
    };

    return (
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={3} />
            <div className="px-32 py-14 h-[calc(100vh-7rem)] flex justify-between gap-x-32">
                <div className="h-full w-8/12 flex flex-col gap-y-8">
                    <Score />

                    <Title
                        title='Cabeçalho'
                        description='Eles permitem que os empregadores vejam como podem entrar em contato com você.'
                    />

                    <div className="pt-5 w-full flex flex-wrap gap-x-4 gap-y-10">
                        {inputsArray.map((item, index) => (
                            <Input
                                key={index}
                                id={index}
                                label={item.label}
                                isLast={index === inputsArray.length - 1} // Definir isLast dinamicamente
                                width={'w-[calc(50%-0.5rem)]'}
                                onChange={(e) => item.setVariable(e.target.value)}
                            />
                        ))}
                    </div>
                    <ButtonNext onClick={handleSubmit} link={'/steps/presentationCV'}/>
                </div>
                <Curriculum valuesCurriculum={{ model, color, name, email, bairro, cidade, estado, telefone, linkedin }}/>
            </div>
        </div>
    );
}
