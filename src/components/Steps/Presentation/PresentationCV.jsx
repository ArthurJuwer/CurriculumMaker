import { useContext, useEffect, useState } from "react";
import TextArea from "../StepsGlobalComponents/TextArea";
import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import Input from "../StepsGlobalComponents/Input";
import { CurriculumContext } from "../../../context/CurriculumContext";

export default function PresentationCV() {
    // Consumindo o contexto dentro do componente
    const { values , setValues } = useContext(CurriculumContext);

    const [objective, setObjective] = useState('Objetivo')

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            objective: objective
        }));
    }, [objective]);
    

    const handleSubmit = () => {
        const valuesCurriculum = {objective};
        
        setValues(valuesCurriculum);
    };

    return (
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={'2'} />
            <div className="px-32 py-16 h-[calc(100vh-7rem)] flex justify-between gap-x-32">
                <div className="h-full w-8/12 flex flex-col gap-y-8">
                    <Score />
                    <Title
                        title={'Apresentação Pessoal'}
                        description={'Essa seção permite mostrar suas metas profissionais e sua trajetória de experiências relevantes.'}
                    />
                    <div className="w-full flex gap-x-5">
                        <TextArea
                            key={0}
                            id={0}
                            label={'Objetivo'}
                            width={'w-7/12'}
                            onChange={(e) => setObjective(e.target.value)}
                        />
                        <div className="bg-TitleGray p-5 text-white rounded-2xl w-5/12 flex flex-col gap-y-3">
                            <h1 className="text-xl font-medium">Experimente estas dicas:</h1>
                            <ul className="list-disc pl-5 text-sm flex flex-col gap-y-3 font-normal">
                                <li>Evite detalhes excessivos e vá direto ao ponto.</li>
                                <li>Seja realista quanto às suas metas profissionais.</li>
                                <li>Seja claro sobre sua área de interesse.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-transparent border border-BorderInputGray rounded-lg w-full p-5 pb-4 -mt-4 flex gap-x-4 relative">
                        <label htmlFor="" className="absolute -top-3 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0">Projeto 1</label>
                        <div className="bg-transparent border border-BorderInputGray rounded-lg w-1/12 flex flex-col gap-y-2 p-3 text-white">
                            <button className="h-24 bg-TitleGray rounded-xl text-xl">1</button>
                            <button className="h-24 bg-NormalGray rounded-xl text-xl">2</button>
                        </div>
                        <div className="w-11/12 flex flex-col gap-y-4">
                            <div className="flex gap-x-2">
                                <Input
                                    key={1}
                                    id={1}
                                    width={'w-5/12'}
                                    label={'Titulo do Projeto'}
                                />
                                <Input
                                    key={2}
                                    id={2}
                                    width={'w-5/12'}
                                    label={'Categoria'}
                                />
                                <Input
                                    key={3}
                                    id={3}
                                    width={'w-2/12'}
                                    label={'Ano'}
                                />
                            </div>
                            <div className="">
                                <TextArea
                                    key={4}
                                    id={4}
                                    isLast={true}
                                    label={'Descrição'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="-mt-5">
                        <ButtonNext onClick={handleSubmit} link={'/steps/formationCV'} />
                    </div>
                </div>
                <Curriculum models={1} valuesCurriculum={values} />
            </div>
        </div>
    );
}
