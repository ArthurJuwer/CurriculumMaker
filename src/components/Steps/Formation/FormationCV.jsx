import { Plus } from "lucide-react";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Input from "../StepsGlobalComponents/Input";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import FormationSubTitle from "./FormationSubTitle";
import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import FormationCertifications from "./FormationCertifications";
import { useContext, useState, useEffect } from "react";
import { CurriculumContext } from "../../../context/CurriculumContext";

export default function FormationCV() {
    const { values, setValues } = useContext(CurriculumContext);

    const [formations, setFormations] = useState([
        { school: 'escola', title: 'titulo', yearEntry: 'ano entrada', yearLeave: 'ano saida' },
    ]);
    const [languages, setLanguages] = useState([
        { language: 'lingua', level: 'NATIVO' },
    ]);
    const [certifications, setCertifications] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [certificationInputs, setCertificationInputs] = useState({
        name: '',
        workload: '',
        conclusion: '',
    });

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            formations: formations,
            languages: languages,
            certifications: certifications, 
        }));
    }, [formations, languages, certifications, setValues]);

    const addFormation = () => {
        setFormations([
            ...formations,
            { school: '', title: '', yearEntry: '', yearLeave: '' },
        ]);
    };

    const addLanguage = () => {
        setLanguages([
            ...languages,
            { language: '', level: 'A1' },
        ]);
    };

    const addCertification = () => {
        if (certificationInputs.name && certificationInputs.workload && certificationInputs.conclusion) {
            setCertifications([
                ...certifications,
                certificationInputs,
            ]);
            setCertificationInputs({ name: '', workload: '', conclusion: '' }); 
            setIsModalOpen(false); 
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    const handleFormationChange = (e, index, field) => {
        const newFormations = [...formations];
        newFormations[index] = {
            ...newFormations[index],
            [field]: e.target.value,
        };
        setFormations(newFormations);
    };

    const handleLanguagesChange = (e, index, field) => {
        const newLanguages = [...languages];
        newLanguages[index] = {
            ...newLanguages[index],
            [field]: e.target.value,
        };
        setLanguages(newLanguages);
    };

    const handleCertificationChange = (e, field) => {
        setCertificationInputs({
            ...certificationInputs,
            [field]: e.target.value,
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    const inputsFormation = [
        { label: 'Escola', category: 'school' },
        { label: 'Ano Entrada', category: 'yearEntry' },
        { label: 'Título', category: 'title' },
        { label: 'Ano Saída', category: 'yearLeave' },
    ];

    return (
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={1} />
            <div className="px-32 py-14 h-[calc(100vh-7rem)] flex justify-between gap-x-32">
                <div className="h-full w-8/12 flex flex-col gap-y-8 overflow-y-auto max-h-full">
                    <Score />
                    <Title
                        title="Formação e Competências"
                        description="Esta seção destaca sua formação acadêmica, idiomas e certificações similares ao cargo desejado."
                    />
                    <div className="flex">
                        <div className="flex flex-col gap-y-4 w-8/12 -mt-6">
                            <FormationSubTitle subtitle={'Formação'} />
                            {formations?.map((formation, idx) => (
                                <div key={idx} className="border border-BorderInputGray rounded-xl px-2 py-7 flex flex-wrap w-full gap-x-4 gap-y-6">
                                    <div className="flex gap-x-4 gap-y-6 w-full flex-wrap">
                                        {inputsFormation?.map((item) => (
                                            <Input
                                                key={item.category}
                                                id={item.category}
                                                label={item.label}
                                                value={formation[item.category]}
                                                width={inputsFormation.indexOf(item) % 2 === 0 ? 'w-[calc(65%)]' : 'w-[calc(35%-1rem)]'}
                                                onChange={(e) => handleFormationChange(e, idx, item.category)}
                                                placeholder={item.category}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="w-full">
                                <button
                                    onClick={addFormation}
                                    className="border-b border-t border-BorderInputGray border-dashed w-full py-3 flex items-center gap-x-4"
                                >
                                    <Plus className="p-1 w-10 h-10 bg-TitleGray text-white rounded-full" />
                                    <h1 className="uppercase text-TitleGray font-semibold">Adicionar Formação</h1>
                                </button>
                            </div>
                        </div>
                        <div className="w-4/12 pl-8 -mb-14 mt-10">
                            <div className="h-full relative">
                                <h1 className="text-2xl font-bold text-TitleGray absolute -top-4 left-[23%] bg-DefaultGray px-2">Certificações</h1>
                                <div className="border border-BorderInputGray h-full w-full rounded-2xl p-4 pt-6 flex flex-col justify-between items-end gap-y-2">
                                    <div className="w-full flex flex-col gap-y-2">
                                        {certifications?.map((item,index)=>(
                                            <FormationCertifications key={index} title={item?.name}/>
                                        ))}
                                        
                                    </div>
                                    <button
                                        className="uppercase bg-TitleGray w-full py-2 text-white rounded-2xl text-sm"
                                        onClick={showModal}>
                                            Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 w-full -mt-6">
                        <FormationSubTitle subtitle={'Idiomas'} />
                        <div className="flex gap-x-4 gap-y-6 w-full flex-wrap">
                        {languages?.map((item, index) => (
                            <Input
                                key={index}
                                id={index}
                                label="Idioma"
                                width="w-[calc(33.3%-1rem)]"
                                value={item?.language}
                                isSelect={true}
                                onChange={(e) => {
                                    const field = e.target.tagName === 'INPUT' ? 'language' : 'level';
                                    handleLanguagesChange(e, index, field);
                                }}
                            />
                        ))}
                        <button
                            className="bg-TitleGray h-14 w-14 rounded-xl text-white flex justify-center items-center"
                            onClick={addLanguage}
                        >
                            <Plus className="h-8 w-8" />
                        </button>
                    </div>
                        <ButtonNext link={'/steps/finalizationCV'} />
                    </div>
                </div>
                <Curriculum valuesCurriculum={values} />
            </div>

            {/* Modal for adding certifications */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl w-96">
                        <h2 className="text-xl font-bold mb-4">Adicionar Certificação</h2>
                        <div className="flex flex-col gap-y-4">
                            <Input
                                label="Nome da Certificação"
                                value={certificationInputs.name}
                                onChange={(e) => handleCertificationChange(e, 'name')}
                            />
                            <Input
                                label="Carga Horária"
                                value={certificationInputs.workload}
                                onChange={(e) => handleCertificationChange(e, 'workload')}
                            />
                            <Input
                                label="Data"
                                value={certificationInputs.conclusion}
                                onChange={(e) => handleCertificationChange(e, 'conclusion')}
                                type="number"
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={hideModal}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={addCertification}
                                className="px-4 py-2 bg-TitleGray text-white rounded-lg"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
