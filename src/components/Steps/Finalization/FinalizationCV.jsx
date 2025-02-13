import { useContext, useEffect, useState, useRef } from "react";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import FinalizationInput from "./FinalizationInput";
import { CurriculumContext } from "../../../context/CurriculumContext";
import FinalizationSelect from "./FinalizationSelect";
import Score from "../StepsGlobalComponents/Score";
import html2canvas from 'html2canvas'; 
import { jsPDF } from 'jspdf'; 
import ErrorMessage from "../StepsGlobalComponents/ErrorMessage";
import ModelsColors from "../Models/ModelsColors";
import { ArrowLeft, ReceiptText } from "lucide-react";

export default function FinalizationCV() {
    const { values, setValues } = useContext(CurriculumContext);
    const [color, setColor] = useState(values?.color);
    const [model, setModel] = useState(values?.model);
    const [languageCurriculum, setLanguages] = useState('pt');
    const [languageFrom, setLanguageFrom] = useState(null);
    const [biggestPageReached, SetBiggestPageReached] = useState(values?.biggestPageReached);
    const [textTitle, setTextTitle] = useState(values?.textTitle || "28px");
    const [textSubTitle, setTextSubTitle] = useState(values?.textSubTitle || "20px");
    const [textCorp, setTextCorp] = useState(values?.textCorp || "12px");
    const [sizeFile, setSizeFile] = useState("PDF");
    const [nameCurriculum, setNameCurriculum] = useState(values?.nameCurriculum || "");
    const [imgData1, setImgData1] = useState(null); 
    const [imgData2, setImgData2] = useState(null); 
    const [mobileOpenCurriculum, setMobileOpenCurriculum] = useState(false)

    const curriculumRef = useRef(); 
    useEffect(()=>{
        setValues((prevValues) =>({
            ...prevValues,
            elementsMoved: 0,
        }))
    }, [])

    useEffect(() => {
        
        SetBiggestPageReached(4)

        setValues((prevValues) => ({
            ...prevValues,
            model,
            color,
            textTitle,
            textSubTitle,
            textCorp,
            sizeFile,
            nameCurriculum,
            biggestPageReached,
            languageCurriculum
            
        }));
    }, [model, color, textTitle, textSubTitle, textCorp, sizeFile, languageCurriculum, nameCurriculum, biggestPageReached, setValues]);

    useEffect(() => {
        if (languageCurriculum === 'Inglês') {
            setLanguageFrom('en');
        } else if (languageCurriculum === 'Português') {
            setLanguageFrom('pt');
        } else if (languageCurriculum === 'Italiano') {
            setLanguageFrom('it');
        }
    }, [languageCurriculum]); 
    
    useEffect(() => {
        if (values?.currentPage === 1) {
            html2canvas(curriculumRef.current, { scale: 3 }).then((canvas) => {
                let imgData = canvas.toDataURL('image/png');
                setImgData1(imgData);
            });
        }
        else if (values?.currentPage === 2) {
            html2canvas(curriculumRef.current, { scale: 3 }).then((canvas) => {
                let imgData = canvas.toDataURL('image/png');
                setImgData2(imgData);
            });
        }
    }, [values?.currentPage]);

    useEffect(() => {
        const translateText = async () => {
            const url = 'https://aibit-translator.p.rapidapi.com/api/v1/translator/json';
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': 'bacd4ec191msh319a7d2444f2392p134885jsn257cae2e51f5',
                    'x-rapidapi-host': 'aibit-translator.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'auto',
                    to: `${languageFrom}`,
                    protected_paths: [''],
                    common_protected_paths: [''],
                    json: {
                        objective: values?.objective,
                        languages: values?.languages,
                        certifications: values?.certifications,
                        formations: values?.formations,
                        projects: values?.projects,
                        titles: values?.titles,
                    }
                })
            };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if(result?.trans){
                setValues((prev)=>({
                    ...prev,
                    objective: result?.trans?.objective,
                    languages: result?.trans?.languages,
                    certifications: result?.trans?.certifications,
                    formations: result?.trans?.formations,
                    projects: result?.trans?.projects,
                    titles: result?.trans?.titles,
                }))
            }
           
        } catch (error) {
            console.error(error);
        }
        };
    
        // translateText();
    }, [languageFrom]);
    

    const colors = [
        { color: "A1A1A1" },
        { color: "AF9B94" },
        { color: "1E1E1E" },
        { color: "4F1213" },
        { color: "12384F" },
        { color: "124F2B" },
        { color: "A8890D" },
    ];

    const labelsLeftSelects = [
        { label: "Modelo", options: ["1", "2"], defaultValue: `${model}`, setVariable: setModel },
        { label: "Idioma do Currículo", options: ["Português", "Inglês", "Italiano"], setVariable: setLanguages },
        { label: "Fonte Títulos", options: ["22px", "24px", "26px", "28px", "30px", "32px", "34px"], defaultValue: values?.textTitle, setVariable: setTextTitle },
        { label: "Fonte Subtítulos", options: ["14px", "16px", "18px", "20px", "22px", "24px", "26px"], defaultValue: values?.textSubTitle, setVariable: setTextSubTitle },
        { label: "Fonte Corpo", options: ["6px", "8px", "10px", "12px", "14px", "16px", "18px"], defaultValue: values?.textCorp, setVariable: setTextCorp },
    ];

    const [generalError, setGeneralError] = useState(null)
    const gerarPDF = () => {
        
            if(!nameCurriculum){
                setGeneralError('O arquivo precisa ter um nome.')
                return
            }
            
            const doc = new jsPDF();
    
            const pdfWidth = 210; 
            const pdfHeight = 287; 

            doc.addImage(imgData1, 'PNG', 0, 0, pdfWidth, pdfHeight);
            if (values?.elementsMoved > 0 || values?.secondPage === true) {
                doc.addPage();
                if(imgData2 == null){
                    setGeneralError('Visualize a segunda pagina. Confira se está tudo certo.')
                } else {
                    doc.addImage(imgData2, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    doc.save(`${nameCurriculum}.pdf`);
                }
                
            } else {
                doc.save(`${nameCurriculum}.pdf`);
            } 
        
    };

    return (
        <div className="min-h-dvh w-full bg-DefaultGray">
            <TopMarker stepsAtual={'0'} />
            <div className="2xl:px-32 xl:px-16 px-4 2xl:py-14 py-6 flex xl:flex-row flex-col max-h-[100dvh] h-full gap-y-2 xl:gap-x-24 2xl:gap-x-40 justify-center overflow-x-hidden">
                <div className="xl:hidden block">
                    <Score isLast={true}/>
                </div>
                <div className={`${mobileOpenCurriculum ? 'hidden' : 'flex'} flex flex-col 2xl:gap-y-4 gap-y-2 2xl:w-[22%]`}>
                    <Title title={"Alterações Rápidas"} last={true} />
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-4">
                            <h2 className="uppercase text-TitleGray font-semibold">Cor de Destaque</h2>
                            <div className="flex gap-x-5">
                                {colors.map((item, index) => (
                                    <ModelsColors
                                        key={index}
                                        backgroundColor={item.color}
                                        isRounded={"rounded-full"}
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

                <div className="xl:mt-8 mt-10 2xl:mt-0 min-h-full 2xl:h-[80dvh] xl:w-[40%] 2xl:w-[33%] border-2 border-BorderInputGray">
                    <div ref={curriculumRef} className="flex flex-col xl:flex-row items-center justify-center h-full w-full ">
                        <div className={`${mobileOpenCurriculum ? 'block mt-6' : 'hidden'}  xl:w-full xl:block min-h-[70dvh] h-full w-full `}>   
                            <Curriculum key={3} isLast={true}  />
                        </div> 
                    </div>
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

                <div className={`${mobileOpenCurriculum ? 'hidden' : 'flex'} flex flex-col 2xl:gap-y-4 gap-y-2 2xl:w-[22%]`}>
                    <Title title={"Opções Pra Baixar"} last={true} />
                    <div className="flex flex-col gap-y-4">
                        <FinalizationInput
                            key={34}
                            id={Math.random()}
                            value={nameCurriculum}
                            label={"Nome do Arquivo"}
                            placeholder={"ex: meu-curriculo"}
                            onChange={(e) => setNameCurriculum(e.target.value)}
                        />
                        <div className="flex items-center justify-center -mt-4">
                            <button 
                                className="xl:hidden rounded-3xl mt-4 w-36 h-12 bg-TitleGray text-white text-sm flex items-center justify-center gap-x-2"
                                onClick={ ()=> setMobileOpenCurriculum(true)}
                            >
                                    <ReceiptText strokeWidth={1.5} />
                                    Ver Currículo
                            </button>
                        </div>
                        
                        <button
                            className="w-full p-4 rounded-xl bg-DefaultOrange text-white uppercase text-sm tracking-wider font-medium"
                            onClick={gerarPDF} 
                        >
                            Gerar PDF
                        </button>
                        

                        <div className="xl:block hidden">
                            <Score isLast={true}/>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorMessage message={generalError} onClose={()=> setGeneralError('')}/>
        </div>
    );
}
