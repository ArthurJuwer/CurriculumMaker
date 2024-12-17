import { useContext, useEffect, useState } from "react";
import ModelsColors from "../../Models/ModelsColors";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import FinalizationInput from "./FinalizationInput";
import { CurriculumContext } from "../../../context/CurriculumContext";
import FinalizationSelect from "./FinalizationSelect";

export default function FinalizationCV(){

    // CASO PASSAR O TAMANHO DO CURRICULO PRINCIPAL CRIAR UMA NOVA FOLHA COM OS OUTROS

    const {values, setValues} = useContext(CurriculumContext);


    const [color, setColor] = useState(values?.color)
    const [model, setModel] = useState(values?.model)

    const [language, setLanguages] = useState('BR')
    // API

    const [textTitle, setTextTitle] = useState('28px')
    const [textSubTitle, setTextSubTitle] = useState('20px')
    const [textCorp, setTextCorp] = useState('12px')


    const [sizeFile, setSizeFile] = useState('JPG')


    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            model: model,
            color: color,
            textTitle: textTitle,
            textSubTitle: textSubTitle,
            textCorp: textCorp,
            sizeFile: sizeFile,
        }));
    }, [color, model,textTitle, textSubTitle, textCorp, sizeFile, setValues]);

    const colors = [
        {color: 'A1A1A1'},
        {color: 'AF9B94'},
        {color: '1E1E1E'},
        {color: '4F1213'},
        {color: '12384F'},
        {color: '124F2B'},
        {color: 'A8890D'},
    ]

    const labelsLeftSelects = [
        { label: 'Modelo', options: ['1', '2'], defaultValue: `${model}`, setVariable: setModel },
        { label: 'Idioma do Currículo', options: ['Português (BR)', 'Inglês', 'Italiano'], defaultValue: 'Português (BR)', setVariable: setLanguages },
        { label: 'Fonte Titulos', options: ['22px', '24px', '26px', '28px', '30px', '32px', '34px'], defaultValue: '28px', setVariable: setTextTitle },
        { label: 'Fonte SubTitulos', options: ['14px', '16px', '18px', '20px', '22px', '24px', '26px'], defaultValue: '20px', setVariable: setTextSubTitle },
        { label: 'Fonte Corpo', options: ['6px','8px', '10px', '12px', '14px', '16px', '18px'], defaultValue: '12px', setVariable: setTextCorp },
    ];

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
                                    <ModelsColors 
                                        key={index} 
                                        backgroundColor={item.color} 
                                        isRounded={'rounded-full'}
                                        onClick={() => setColor(item.color)}
                                        isSelected={item.color === color}
                                    />
                                ))}

                            </div>
                        </div>

                        {labelsLeftSelects?.map((item, index) => (
                            <FinalizationSelect 
                                id={index} 
                                key={index} 
                                label={item?.label}
                                options={item?.options}
                                defaultValue={item?.defaultValue} 
                                onChange={(e) => item.setVariable(e.target.value)}
                            />
                        ))}


                    </div>
                </div>

                <Curriculum valuesCurriculum={values}/>

                <div className="flex flex-col gap-y-4">
                    <Title title={'Opções Pra Baixar'} />
                    <div className="flex flex-col gap-y-4">
                        <FinalizationInput 
                            key={34}
                            id={Math.random()}
                            label={'Nome do Arquivo'}
                            placeholder={'ex: meu-curriculo'}
                        />
                        
                        <FinalizationSelect 
                            id={35} 
                            key={Math.random()}
                            label={'Formato do Arquivo'}
                            options={['JPG', 'PNG', 'PDF', 'SVG', 'WEBP']}
                            defaultValue={'PDF'}
                            onChange={(e) => setSizeFile(e.target.value)}   
                        />

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