import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Input from "../StepsGlobalComponents/Input";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";

export default function HeaderCV(){

    const inputsArray = [
        {label: 'Nome Completo'},
        {label: 'Email'},
        {label: 'Bairro'},
        {label: 'Cidade'},
        {label: 'Estado'},
        {label: 'Telefone'},
        {label: 'Linkedin'},
    ]

    return(
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={3} />
            {/* 7 rem == tamanho do topMarker */}
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
                        />
                    ))}
                    
                </div>
                <ButtonNext link={'/steps/presentationCV'} />
                </div>
                <Curriculum />
            </div>
        </div>
    )
}