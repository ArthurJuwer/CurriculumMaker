import { Plus } from "lucide-react";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Input from "../StepsGlobalComponents/Input";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import FormationSubTitle from "./FormationSubTitle";
import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import FormationCertifications from "./FormationCertifications";

export default function FormationCV(){

    const inputsFormation = [
        {label: 'Escola'},
        {label: 'Ano Entrada'},
        {label: 'Titulo'},
        {label: 'Ano Saída'},
    ]

    return(
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={1} />
            <div className="px-32 py-16  h-[calc(100vh-7rem)] flex justify-between gap-x-32 ">
                <div className="h-full w-8/12 flex flex-col gap-y-8">
                    <Score />

                    <Title 

                        title='Formação e Competências' 
                        description='Esta seção destaca sua formação acadêmica, idiomas e certificações similares ao cargo desejado.' 
                    />
                    <div className="flex ">
                        <div className="flex flex-col gap-y-4 w-8/12 -mt-6">
                            <FormationSubTitle subtitle={'Formação'}/>
                            <div className="border border-BorderInputGray rounded-xl px-2 py-7 flex flex-wrap w-full gap-x-4 gap-y-6">
                                {inputsFormation.map((item, index)=>(
                                    
                                    <Input
                                        key={index}
                                        id={index}
                                        label={item.label}
                                        width={index % 2 === 0 ? 'w-[calc(65%)]' : 'w-[calc(35%-1rem)]'}
                                    />
                                ))}
                            </div>
                            <div className="w-full">

                                <button className="border-b border-t border-BorderInputGray border-dashed w-full py-3 flex items-center gap-x-4">
                                    <Plus className="p-1 w-10 h-10 bg-TitleGray text-white rounded-full"/>
                                    <h1 className="uppercase text-TitleGray font-semibold">Adicionar Formação</h1>
                                </button>

                            </div>
                        </div>
                        <div className="w-4/12 pl-8 -mb-14 mt-10">
                            <div className="h-full relative">
                                <h1 className="text-2xl font-bold text-TitleGray absolute -top-4 left-[23%] bg-DefaultGray px-2">Certificações</h1>
                                <div className=" border border-BorderInputGray h-full w-full rounded-2xl p-4 pt-6 flex flex-col justify-between items-end">
                                    <div className="w-full">
                                        <FormationCertifications />
                                    </div>
                                    <button className="uppercase bg-TitleGray w-full py-2 text-white rounded-2xl text-sm">Adicionar</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-y-4 w-full -mt-6">
                        <FormationSubTitle subtitle={'Idiomas'}/>
                        <div className="flex gap-x-4 w-full">
                            <Input 
                            
                            key={0}
                            id={0}
                            label={'Idioma'}
                            width={'w-[calc(33.3%)]'}
                            isSelect={true}

                            />
                            <Input 
                            
                                key={1}
                                id={1}
                                label={'Idioma'}
                                width={'w-[calc(33.3%)]'}
                                isSelect={true}

                            />
                            <button className="bg-TitleGray h-auto w-14 rounded-xl text-white flex justify-center items-center">
                                <Plus className="h-8 w-8" />
                            </button>
                        </div>
                        <ButtonNext link={'/steps/'} />
                      
                    </div>
                </div>
                <Curriculum />
            </div>
            
        </div>
    )
}