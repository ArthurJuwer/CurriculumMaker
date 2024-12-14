import { useState } from "react";
import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Input from "../StepsGlobalComponents/Input";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import { useLocation } from 'react-router-dom';


export default function HeaderCV(){
    const location = useLocation();
    
    const params = new URLSearchParams(location.search)
    const [name, setName] = useState('Nome Completo');
    const [email, setEmail] = useState('Email');
    const color = params.get('color');  

    
   

    const valuesCurriculum = { color, name, email };
    

    const inputsArray = [
        {label: 'Nome Completo', setVariable: setName},
        {label: 'Email' , setVariable: setEmail},
        {label: 'Bairro'},
        {label: 'Cidade'},
        {label: 'Estado'},
        {label: 'Telefone'},
        {label: 'Linkedin'},
    ]

    return(
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={3} />
            <div className="px-32 py-16  h-[calc(100vh-7rem)] flex justify-between gap-x-32">
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
                            isLast={true} 
                            width={'w-[calc(50%-0.5rem)]'}
                            onChange={(e) => item.setVariable(e.target.value)}
                        />
                    ))}
                    
                </div>
                <ButtonNext link={'/steps/presentationCV'} />
                </div>
                <Curriculum valuesCurriculum={valuesCurriculum} />
            </div>
        </div>
    )
}