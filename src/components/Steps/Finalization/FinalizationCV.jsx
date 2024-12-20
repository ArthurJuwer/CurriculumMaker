import { useContext, useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ModelsColors from "../../Models/ModelsColors";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import FinalizationInput from "./FinalizationInput";
import { CurriculumContext } from "../../../context/CurriculumContext";
import FinalizationSelect from "./FinalizationSelect";
import Score from "../StepsGlobalComponents/Score";
import html2canvas from 'html2canvas'; // Importar html2canvas
import { jsPDF } from 'jspdf'; // Importar jsPDF

export default function FinalizationCV() {
    const { values, setValues } = useContext(CurriculumContext);
    const [score, setScore] = useState(values?.score);
    const [color, setColor] = useState(values?.color);
    const [model, setModel] = useState(values?.model);
    const [language, setLanguages] = useState("BR");
    const [textTitle, setTextTitle] = useState("28px");
    const [textSubTitle, setTextSubTitle] = useState("20px");
    const [textCorp, setTextCorp] = useState("12px");
    const [sizeFile, setSizeFile] = useState("PDF");
    const [nameCurriculum, setNameCurriculum] = useState("");

    const curriculumRef = useRef(); // Ref para o componente Curriculum

    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            model,
            color,
            textTitle,
            textSubTitle,
            textCorp,
            sizeFile,
            nameCurriculum,
            score,
        }));
    }, [model, color, textTitle, textSubTitle, textCorp, sizeFile, nameCurriculum, score, setValues]);

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
        { label: "Idioma do Currículo", options: ["Português (BR)", "Inglês", "Italiano"], defaultValue: "Português (BR)", setVariable: setLanguages },
        { label: "Fonte Títulos", options: ["22px", "24px", "26px", "28px", "30px", "32px", "34px"], defaultValue: "28px", setVariable: setTextTitle },
        { label: "Fonte Subtítulos", options: ["14px", "16px", "18px", "20px", "22px", "24px", "26px"], defaultValue: "20px", setVariable: setTextSubTitle },
        { label: "Fonte Corpo", options: ["6px", "8px", "10px", "12px", "14px", "16px", "18px"], defaultValue: "12px", setVariable: setTextCorp },
    ];

    const gerarPDF = () => {

        html2canvas(curriculumRef.current, { scale: 3 }).then((canvas) => {

            const imgData = canvas.toDataURL('image/png');
    
            const doc = new jsPDF();
    
            const imgWidth = canvas.width / 3;
            const imgHeight = canvas.height / 3;
    
            console.log("Largura da imagem:", imgWidth);
            console.log("Altura da imagem:", imgHeight);
    
            const pdfWidth = 210;
            const pdfHeight = 297;
    
            const aspectRatio = canvas.width / canvas.height;
            let newWidth = pdfWidth / aspectRatio;
            let newHeight = newWidth / aspectRatio;
            
            if (newHeight > pdfHeight) {
                newHeight = pdfHeight;
                newWidth = newHeight * aspectRatio;
            }
    
            doc.addImage(imgData, 'PNG', 0, 0, newWidth, newHeight);

            doc.save(`${nameCurriculum || "curriculum"}.pdf`);
        });
    };

    return (
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={0} />
            <div className="px-32 py-14 h-[calc(100vh-7rem)] flex justify-between">
                <div className="flex flex-col gap-y-4">
                    <Title title={"Alterações Rápidas"} />
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

                {/* Currículo - referenciado para exportar separadamente */}
                <div className="h-full w-4/12 border-2 border-WeakGray">
                    <div ref={curriculumRef} className="flex items-center justify-center h-full w-full">
                        {values ? (
                            <Curriculum valuesCurriculum={values} isLast={true} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-y-4">
                    <Title title={"Opções Pra Baixar"} />
                    <div className="flex flex-col gap-y-4">
                        <FinalizationInput
                            key={34}
                            id={Math.random()}
                            label={"Nome do Arquivo"}
                            placeholder={"ex: meu-curriculo"}
                            onChange={(e) => setNameCurriculum(e.target.value)}
                        />

                        {/* Botão para gerar PDF */}
                        <button
                            className="w-full p-4 rounded-xl bg-DefaultOrange text-white uppercase text-sm tracking-wider font-medium"
                            onClick={gerarPDF} // Usa a função de gerar PDF
                        >
                            Gerar PDF
                        </button>

                        <div className="">
                            <Score values={values} page={4} backValue={(newScore) => setScore(newScore)} isLast={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
