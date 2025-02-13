import { ArrowLeft, Plus, ReceiptText, Trash } from "lucide-react"; // Importar o ícone da lixeira
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
import ErrorMessage from "../StepsGlobalComponents/ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function FormationCV() {
    const { values, setValues } = useContext(CurriculumContext);
    const [generalError, setGeneralError] = useState('');
    const [biggestPageReached, SetBiggestPageReached] = useState(values?.biggestPageReached);
    const [generalErrorModal, setGeneralErrorModal] = useState(null);
    const [invalidFormationsConfer, setInvalidFormations] = useState(null);
    const [formations, setFormations] = useState(JSON.parse(localStorage.getItem('formations')) || [
        { school: 'escola', title: 'titulo', yearEntry: 'ano entrada', yearLeave: 'ano saida' },
    ]);
    const [languages, setLanguages] = useState(JSON.parse(localStorage.getItem('languages')) || [
        { language: 'Língua', level: 'NATIVO' },
    ]);
    const [certifications, setCertifications] = useState(JSON.parse(localStorage.getItem('certifications')) || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [certificationInputs, setCertificationInputs] = useState({
        name: '',
        workload: '',
        conclusion: '',
    });

    const navigate = useNavigate();

    useEffect(() => {

        if(values?.biggestPageReached < 3){
            SetBiggestPageReached(3)
        }
       

        setValues(prevValues => ({
            ...prevValues,
            formations,
            languages,
            certifications,
            biggestPageReached,
        }));
        
        localStorage.setItem('formations', JSON.stringify(formations));
        localStorage.setItem('languages', JSON.stringify(languages));
        localStorage.setItem('certifications', JSON.stringify(certifications));
    }, [formations, languages, certifications, biggestPageReached, setValues]);

    const handleSubmit = () => {
        const allFieldsFilled = formations.every(formation => 
            formation.school !== 'escola' && formation.school.trim() !== '' &&
            formation.title !== 'titulo' && formation.title.trim() !== '' &&
            formation.yearEntry !== 'ano entrada' && formation.yearEntry.trim() !== '' &&
            formation.yearLeave !== 'ano saida' && formation.yearLeave.trim() !== ''
        ) && languages.every(language => 
            language.language !== 'Língua' && language.language.trim() !== ''
        );
        
        const invalidFormations = formations.filter(formation => 
            parseInt(formation.yearEntry) > parseInt(formation.yearLeave)
        );
        
        setInvalidFormations(invalidFormations.map((_, index) => index));

        if (!allFieldsFilled) {
            setGeneralError('Preencha todos os campos');
            return;
        }
    
        if (invalidFormations.length > 0) {
            setGeneralError(`Corrija os seguintes campos: Ano de entrada maior que ano de saída em ${invalidFormations.length} formação(ões).`);
            return;
        }

        setValues(values);
        navigate('/steps/finalizationCV');
    };

    const addFormation = () => {
        setFormations([
            ...formations,
            { school: 'escola', title: 'titulo', yearEntry: 'ano entrada', yearLeave: 'ano saida' },
        ]);
    };

    const addLanguage = () => {
        setLanguages([
            ...languages,
            { language: '', level: 'A1' },
        ]);
    };

    const addCertification = () => {
        const { name, workload, conclusion } = certificationInputs;

        if (!name || !workload || !conclusion) {
            setGeneralErrorModal('Preencha todos os campos.');
            return;
        }

        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        if (!regex.test(conclusion)) {
            setGeneralErrorModal('Data inválida. Use o formato DD/MM/YYYY.');
            return;
        }

        const [day, month, year] = conclusion.split('/').map(Number);
        const isValidDate = (d, m, y) => {
            const date = new Date(y, m - 1, d);
            return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
        };

        if (!isValidDate(day, month, year)) {
            setGeneralErrorModal('Data inválida. Verifique o valor inserido.');
            return;
        }

        setCertifications([
            ...certifications,
            certificationInputs,
        ]);
        setCertificationInputs({ name: '', workload: '', conclusion: '' });
        setIsModalOpen(false);
    };

    const handleFormationChange = (e, index, field) => {
        const newFormations = [...formations];
        newFormations[index] = {
            ...newFormations[index],
            [field]: e.target.value,
        };
        setFormations(newFormations);
    };

    const handleLanguagesChange = (newLanguage, newLevel, index) => {
        const newLanguages = [...languages];
        newLanguages[index] = {
            ...newLanguages[index],
            language: newLanguage, 
            level: newLevel,  
        };
        setLanguages(newLanguages);
    };

    const handleCertificationChange = (e, field) => {
        const value = e.target.value;
        
        setCertificationInputs({
            ...certificationInputs,
            [field]: value,
        });

        if (field === 'conclusion') {
            const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
            if (value && !regex.test(value)) {
                setGeneralErrorModal('Data inválida. Use o formato DD/MM/YYYY.');
                return;
            }

            const [day, month, year] = value.split('/').map(Number);
            const isValidDate = (d, m, y) => {
                const date = new Date(y, m - 1, d);
                return (
                    date.getFullYear() === y &&
                    date.getMonth() === m - 1 &&
                    date.getDate() === d
                );
            };

            if (value && !isValidDate(day, month, year)) {
                setGeneralErrorModal('Data inválida. Verifique o valor inserido.');
                return;
            }

            setGeneralErrorModal('');
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setGeneralErrorModal('');
    };

    const deleteFormation = (index) => {
        const newFormations = formations.filter((_, i) => i !== index);
        setFormations(newFormations);
    };

    const deleteCertification = (id) => {
        const updatedCertifications = certifications.filter((_, index) => index !== id);
        setCertifications(updatedCertifications);
    };

    const deleteLanguage = (id) => {
        const newLanguages = languages.filter((_, index) => index !== id);
        setLanguages(newLanguages);
    };

    const inputsFormation = [
        { label: 'Escola', placeholder: 'ex: Universidade Unisinos Porto Alegre', category: 'school' },
        { label: 'Ano Entrada', placeholder: 'ex: 2020', category: 'yearEntry', year: true},
        { label: 'Título', placeholder: 'ex: Graduação Administração', category: 'title'},
        { label: 'Ano Saída', placeholder: 'ex: 2024', category: 'yearLeave', year: true, yearNoRange: true},
    ];

    const [mobileOpenCurriculum, setMobileOpenCurriculum] = useState(false)

    return (
        <div className="min-h-dvh 2xl:h-dvh w-full bg-DefaultGray">
            <TopMarker stepsAtual={1} />
            <div className={`${mobileOpenCurriculum ? 'flex-col' : 'flex'} 2xl:px-32 2xl:py-14 xl:px-16 px-4 py-6 2xl:h-[calc(100dvh-7rem)] xl:h-[calc(100dvh-4.5rem)] flex justify-between 2xl:gap-x-32 gap-x-5`}>
            <div className={`flex flex-col 2xl:gap-y-8 gap-y-3 xl:w-8/12 h-full`}>
            <Score />
                    <div className={`${mobileOpenCurriculum ? 'hidden' : 'flex'}  flex flex-col gap-y-8 xl:overflow-y-auto xl:overflow-x-hidden 
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-transparent
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-TitleGray
                        dark:[&::-webkit-scrollbar-track]:bg-TitleGray
                        dark:[&::-webkit-scrollbar-thumb]:bg-TitleGray 
                        pr-2
                    `}>
                        <Title
                            title="Formação e Competências"
                            description="Esta seção destaca sua formação acadêmica, idiomas e certificações similares ao cargo desejado."
                        />
                        <div className="flex flex-col 2xl:flex-row">
                            <div className="flex flex-col gap-y-4 2xl:w-8/12 -mt-6">
                                <FormationSubTitle subtitle={'Formação'} />
                                {formations?.map((formation, idx) => (
                                    <div key={idx} className="border border-BorderInputGray rounded-xl px-2 py-7 flex flex-wrap w-full gap-x-4 gap-y-6 relative">
                                        <div className="flex gap-x-4 gap-y-6 w-full flex-wrap">
                                        {inputsFormation?.map((item) => (
                                        <Input
                                            key={item?.category}
                                            id={item?.category}
                                            label={item?.label}
                                            value={formation[item?.category] === 'escola' || formation[item?.category] === 'titulo' || formation[item?.category] === 'ano entrada' || formation[item?.category] === 'ano saida' ? '' : formation[item?.category]}  // Verifica valores padrões e substitui por ''
                                            width={inputsFormation.indexOf(item) % 2 === 0 ? 'w-[calc(60%)]' : 'w-[calc(40%-1rem)]'}
                                            onChange={(e) => {
                                                handleFormationChange(e, idx, item?.category)
                                                setInvalidFormations('')
                                            }}
                                            placeholder={item?.placeholder}
                                            isSelect={false}
                                            year={item?.year}     
                                            yearNoRange={item?.yearNoRange}
                                            yearNoRangeIsBig={item?.yearNoRange ? invalidFormationsConfer?.includes(idx) : ''} // Passa true se o índice estiver na lista
                                            />
                                    ))}

                                            
                                        </div>
                                        <button
                                            onClick={() => deleteFormation(idx)}  
                                            className="absolute -top-4 xl:-right-2 right-0 p-2 bg-red-500 rounded-full text-white"
                                        >
                                            <Trash className="w-6 h-6" />
                                        </button>
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
                            <div className="2xl:w-4/12 2xl:px-4 2xl:-mb-14 mt-10">
                                <div className="h-full relative">
                                    <h1 className="text-2xl font-bold text-TitleGray absolute -top-4 2xl:left-[23%] left-4 bg-DefaultGray px-2">Certificações</h1>
                                    <div className="border border-BorderInputGray h-full w-full rounded-2xl p-4 pt-6 flex flex-col justify-between items-end gap-y-2">
                                        <div className="w-full flex 2xl:flex-col gap-y-2 gap-x-5">
                                            {certifications?.map((item, index) => (
                                                <FormationCertifications
                                                    key={index}
                                                    id={index}
                                                    title={item?.name}
                                                    onDelete={(id) => deleteCertification(id)} 
                                                />
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
                                        width="xl:w-[calc(50%-1rem)] w-[calc(100%-4.5rem)]"
                                        value={{ language: item.language != 'Língua' ? item.language : '', level: item.level }} // Passa idioma e nível
                                        isSelect={true}
                                        onChange={(newLanguage, newLevel) => handleLanguagesChange(newLanguage, newLevel, index)} // Passa ambos os valores
                                        placeholder={index === 0 ? 'ex: Português' : 'ex: Inglês'}
                                        onDelete={index !== 0 ? deleteLanguage : null}
                                    />
                                ))}
                                <button
                                    className="bg-TitleGray size-14 rounded-xl text-white flex justify-center items-center"
                                    onClick={addLanguage}
                                >
                                    <Plus className="size-8" />
                                </button>
                            </div>
                                <ButtonNext onClick={handleSubmit} />
                            <div className="flex justify-center">
                            <button 
                                className="xl:hidden rounded-3xl mt-4 w-36 h-12 bg-TitleGray text-white text-sm flex items-center justify-center gap-x-2"
                                onClick={ ()=> setMobileOpenCurriculum(true)}
                            >
                                    <ReceiptText strokeWidth={1.5} />
                                    Ver Currículo
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={`${mobileOpenCurriculum ? 'block mt-6' : 'hidden'} 2xl:w-4/12 xl:w-5/12 xl:block min-h-[70dvh] w-full `}>   
                    <Curriculum key={3} />
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
                
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl 2xl:w-4/12 xl:w-6/12 w-11/12 flex flex-col gap-y-8 relative">
                        <h2 className="text-xl font-bold">Adicionar Certificação</h2>
                        <div className="flex flex-col gap-y-8">
                            <Input
                                label="Nome da Certificação"
                                value={certificationInputs?.name}
                                onChange={(e) => handleCertificationChange(e, 'name')}
                                placeholder={'ex: Curso de Administração Empresarial'}
                            />
                            <Input
                                label="Carga Horária"
                                value={certificationInputs?.workload}
                                onChange={(e) => handleCertificationChange(e, 'workload')}
                                placeholder={'ex: 120h'}
                            />
                            <Input
                                label="Data"
                                value={certificationInputs?.conclusion}
                                onChange={(e) => {
                                    handleCertificationChange(e, 'conclusion')
                                }}
                                placeholder={'ex: 15/03/2021'}
                                conclusion={generalErrorModal ? true : false}
                            />
                        </div>
                        {generalErrorModal && (
                            <p className="absolute bottom-20 left-9 text-sm text-red-600">
                                {generalErrorModal}
                            </p>
                        )}
                        <div className="flex justify-between">
                            <button
                                onClick={hideModal}
                                className="px-4 py-2 bg-TitleGray text-white rounded-lg"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={addCertification}
                                className={`px-4 py-2  ${certificationInputs.name != '' && certificationInputs.workload != ''&& certificationInputs.conclusion != '' && !generalErrorModal ? 'bg-TitleGray' : 'bg-gray-400'}  text-white rounded-lg`}
                            >
                                Adicionar
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <ErrorMessage message={generalError} onClose={() => setGeneralError('')}/>
        </div>
    );
}
