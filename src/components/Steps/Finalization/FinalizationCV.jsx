import { useContext } from "react";
import ModelsColors from "../../Models/ModelsColors";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import FinalizationInput from "./FinalizationInput";
import { CurriculumContext } from "../../../context/CurriculumContext";

export default function FinalizationCV(){

    const {values, setValues} = useContext(CurriculumContext);

    const colors = [
        {color: 'A1A1A1'},
        {color: 'AF9B94'},
        {color: '1E1E1E'},
        {color: '4F1213'},
        {color: '12384F'},
        {color: '124F2B'},
        {color: 'A8890D'},
    ]
    const labelsInputs = 
        {
            left: [
                { label: 'Modelo' },
                { label: 'Fonte Titulos' },
                { label: 'Fonte Corpo' },
                { label: 'Idioma do Currículo' },
            ],
            right: [
                { label: 'Nome do Arquivo' },
                { label: 'Formato do Arquivo' },
                { label: 'Tamanho do Arquivo' },
            ]
        }
    ;

    return(
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={0} />
            <div className="px-32 py-14 h-[calc(100vh-7rem)] flex justify-between">

                <div className="flex flex-col gap-y-4">
                    <Title title={'Alterações Rápidas'}/>
                    <div className="flex flex-col gap-y-4">

                        <div className="flex flex-col gap-y-4">
                            <h2 className="uppercase text-TitleGray font-semibold">Cor de Destaque</h2>
                            <div className="flex gap-x-5">
                                {colors.map((item, index)=>(
                                    <ModelsColors key={index} backgroundColor={item.color} isRounded={'rounded-full'} />
                                ))}
                            </div>
                        </div>
                        {labelsInputs?.left?.map((item,index)=>(
                            <FinalizationInput id={index} key={index} label={item.label}/>
                        ))}
                        <div className="flex flex-col gap-y-4">
                            <label htmlFor='' className="uppercase text-TitleGray font-semibold">Voltar Para Alguma Etapa?</label>
                            <div type="text" id='' className="border w-full border-BorderInputGray bg-transparent p-4 rounded-xl flex items-center justify-center">
                                <button className="text-TitleGray font-semibold w-1/3">1</button>
                                <button className="text-TitleGray font-semibold w-1/3 border-x border-BorderInputGray px-16">2</button>
                                <button className="text-TitleGray font-semibold w-1/3">3</button>
                            </div>
                        </div>

                    </div>
                </div>

                <Curriculum valuesCurriculum={values}/>

                <div className="flex flex-col gap-y-4">
                    <Title title={'Opções Pra Baixar'} />
                    <div className="flex flex-col gap-y-4">
                        {labelsInputs?.right?.map((item, index)=>(
                            <FinalizationInput id={index} key={index} label={item.label}/>
                        ))}
                        
                        <button className="w-full p-4 rounded-xl bg-DefaultOrange text-white uppercase text-sm tracking-wider font-medium">
                            Baixar Arquivo
                        </button>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-x-2 items-center">
                                <span className="h-9 w-20 bg-scoreColors-red text-white flex items-center justify-center rounded-3xl font-semibold">15%</span>
                                <p className="text-WeakGray text-base font-semibold">Pontuação Final</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-TitleGray text-xl text-white flex items-center justify-center">
                                !
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>



            </div>
        </div>
    )
}