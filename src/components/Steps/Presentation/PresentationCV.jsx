import { useContext, useEffect, useState } from "react";
import TextArea from "../StepsGlobalComponents/TextArea";
import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";
import Input from "../StepsGlobalComponents/Input";
import { CurriculumContext } from "../../../context/CurriculumContext";
import ErrorMessage from "../StepsGlobalComponents/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ReceiptText } from "lucide-react";

export default function PresentationCV() {
    const { values, setValues } = useContext(CurriculumContext);
    const [generalError, setGeneralError] = useState(null);
    const [biggestPageReached, setBiggestPageReached] = useState(values?.biggestPageReached);
    const navigate = useNavigate();

    // Estado para armazenar o objetivo e os projetos
    const [objective, setObjective] = useState(values?.objective || 'texto do objetivo.');
    const [projects, setProjects] = useState(values?.projects || [
        { title: 'Projeto 1', category: 'Categoria', year: 'ANO', description: 'descreva seu projeto aqui' },
        { title: 'Projeto 2', category: 'Categoria', year: 'ANO', description: 'descreva seu projeto aqui' },
    ]);
    const [selectedProject, setSelectedProject] = useState(0);
    const [projectErrors, setProjectErrors] = useState([
        { title: false, category: false, year: false, description: false },
        { title: false, category: false, year: false, description: false },
    ]);

    useEffect(() => {
        if(values?.biggestPageReached < 2){
            setBiggestPageReached(2)
        }
    }, []);

    // Função para validar todos os inputs
    const validateAllInputs = () => {
        const currentYear = new Date().getFullYear(); // Ano atual
        
        const errors = projects.map((project, index) => ({
            title: project?.title === 'Projeto ' + (index + 1) ? true : false,
            category: project?.category === 'Categoria' ? true : false,
            year: 
            !project?.year || 
            isNaN(project?.year) || 
            Number(project?.year) < 1900 || 
            Number(project?.year) > currentYear,
            description: project?.description === 'descreva seu projeto aqui' ? true : false,
        }));

        setProjectErrors(errors); // Atualiza os erros para todos os projetos
    };

    useEffect(() => {
        validateAllInputs(); 
    }, [selectedProject, projects]);
    
    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            objective,
            projects,
            biggestPageReached,
        }));
    }, [objective, projects, biggestPageReached, setValues]);

    const handleProjectChange = (index, field, value) => {
        const updatedProjects = projects.map((project, idx) =>
            idx === index ? { ...project, [field]: value } : project
        );
        setProjects(updatedProjects);
    };

    const handleProjectSwitch = (index) => {
        setSelectedProject(index);
    };

    const handleSubmit = () => {
        validateAllInputs();

        const hasProjectErrors = projectErrors.some((error) =>
            Object.values(error).includes(true)
        );

        const isObjectiveEmpty = objective === 'texto do objetivo.' || objective === '';

        if (isObjectiveEmpty) {
            setGeneralError('Preencha todos os campos.')
            return;
        } else if (hasProjectErrors) {
            setGeneralError('Arrume os erros.')
            return;
        }

        localStorage.setItem('objective', objective);
        localStorage.setItem('projects', JSON.stringify(projects));

        setValues(prevValues => ({
            ...prevValues,
            objective,
            projects,
        }));

        navigate('/steps/FormationCV');
    };
    const [mobileOpenCurriculum, setMobileOpenCurriculum] = useState(false)

    return (
        <div className="min-h-dvh w-full bg-DefaultGray">
            <TopMarker stepsAtual={'2'} />
            <div className={`${mobileOpenCurriculum ? 'flex flex-col' : ''} 2xl:px-32 2xl:py-14 xl:px-16 px-4 py-6 2xl:h-[calc(100dvh-7rem)] xl:h-[calc(100dvh-4.5rem)] flex justify-between 2xl:gap-x-32 xl:gap-x-5`}>                
                <div className="flex flex-col 2xl:gap-y-8 gap-y-3 xl:w-8/12 h-full">
                    <Score />
                    <div className={`${mobileOpenCurriculum ? 'hidden' : 'block'} h-full flex flex-col gap-y-8 xl:overflow-y-auto`}>
                        <Title
                            title={'Apresentação Pessoal'}
                            description={'Essa seção permite mostrar suas metas profissionais e sua trajetória de experiências relevantes.'}
                        />
                        <div className="max-h-full w-full flex xl:flex-row flex-col justify-between 2xl:gap-x-5 gap-x-3">
                            <TextArea
                                key={0}
                                id={0}
                                label={'Objetivo'}
                                width={'xl:w-7/12 w-full'}
                                value={objective !== 'texto do objetivo.' ? objective : ''}
                                onChange={(e) => {
                                    setObjective(e.target.value)
                                    if(objective.length >= 120){
                                        setGeneralError('Cuidado você esta chegando perto do limite máximo de caracteres')
                                    }
                                }}
                                placeholder={'ex: Conseguir uma posição como assistente administrativo, contribuindo com minhas habilidades de gestão e atendimento para a empresa.'}
                            />
                            <div className="xl:bg-TitleGray xl:text-white text-bg-TitleGray 2xl:p-5 xl:py-2 xl:px-5 p-0  rounded-2xl h-full xl:w-5/12 w-full flex flex-col 2xl:gap-y-3 gap-y-2">
                                <h1 className="2xl:text-xl font-medium mt-2">Experimente estas dicas:</h1>
                                <ul className="xl:list-disc xl:pl-5 2xl:text-sm xl:text-xs text-[0.6rem] text-white flex xl:flex-col gap-y-3 font-normal gap-x-3">
                                    <li className="bg-TitleGray w-1/3 xl:bg-transparent xl:w-auto rounded-2xl text-center xl:text-left p-2 xl:p-0 xl:list-item flex items-center justify-center">Evite detalhes excessivos e vá direto ao ponto.</li>
                                    <li className="bg-TitleGray w-1/3 xl:bg-transparent xl:w-auto rounded-2xl text-center xl:text-left p-2 xl:p-0 xl:list-item flex items-center justify-center">Seja realista quanto às suas metas profissionais.</li>
                                    <li className="bg-TitleGray w-1/3 xl:bg-transparent xl:w-auto rounded-2xl text-center xl:text-left p-2 xl:p-0 xl:list-item flex items-center justify-center">Seja claro sobre sua área de interesse.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-transparent border border-BorderInputGray rounded-lg w-full p-5 pb-4 -mt-4 flex gap-x-4 relative xl:flex-row flex-col gap-y-5">
                            <label className="absolute -top-3 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0">Projeto {selectedProject + 1}</label>
                            <div className="xl:w-1/12 flex xl:flex-col gap-y-2">
                                {[0, 1].map(index => (
                                    <button
                                        key={index}
                                        className={`xl:h-1/2 h-12 w-full xl:rounded-xl ${index === 1 ? 'ml-4 xl:ml-0' : ''} rounded-lg text-xl text-white ${selectedProject === index ? 'bg-TitleGray' : 'bg-NormalGray'}`}
                                        onClick={() => handleProjectSwitch(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="xl:w-11/12 flex flex-col gap-y-4">
                                <div className="flex flex-wrap xl:flex-nowrap gap-x-2 gap-y-4 xl:gap-y-0 ">
                                    <Input
                                        id={`title-${selectedProject}`}
                                        width="w-xl:5/12 w-full"
                                        label="Titulo do Projeto"
                                        onChange={(e) => handleProjectChange(selectedProject, 'title', e.target.value)}
                                        value={projects[selectedProject]?.title === `Projeto ${selectedProject + 1}` ? '' : projects[selectedProject]?.title}
                                        error={projectErrors[selectedProject]?.title} 
                                        placeholder="ex: Documentação Administrativa"
                                        validateAllInputs={validateAllInputs} 
                                    />
                                    <Input
                                        id={`category-${selectedProject}`}
                                        width="xl:w-5/12 w-full"
                                        label="Categoria"
                                        onChange={(e) => handleProjectChange(selectedProject, 'category', e.target.value)}
                                        value={projects[selectedProject]?.category === 'Categoria' ? '' : projects[selectedProject]?.category}
                                        error={projectErrors[selectedProject]?.category}
                                        placeholder={'ex: Administração'}
                                        validateAllInputs={validateAllInputs} 
                                    />
                                    <Input
                                        id={`year-${selectedProject}`}
                                        width="xl:w-2/12 w-full" 
                                        label="Ano"
                                        onChange={(e) => handleProjectChange(selectedProject, 'year', e.target.value)}
                                        value={projects[selectedProject]?.year === 'ANO' ? '' : projects[selectedProject]?.year}
                                        error={projectErrors[selectedProject]?.year} 
                                        placeholder={'ex: 2022'}
                                        validateAllInputs={validateAllInputs} 
                                        year={true}
                                    />
                                </div>
                                <TextArea
                                    id={`description-${selectedProject}`}
                                    isLast={true}
                                    label="Descrição"
                                    onChange={(e) => {
                                        handleProjectChange(selectedProject, 'description', e.target.value)
                                        if(projects[selectedProject]?.description.length >= 120){
                                            setGeneralError('Cuidado você esta chegando perto do limite máximo de caracteres')
                                        }
                                    }}
                                    value={projects[selectedProject].description === 'descreva seu projeto aqui' ? '' : projects[selectedProject].description}
                                    error={projectErrors[selectedProject]?.description}
                                    placeholder={'ex: Este documento tem como objetivo, organizar e padronizar os processos administrativos, garantindo eficiência e conformidade nas operações diárias.'}
                                    validateAllInputs={validateAllInputs}
                                />
                            </div>
                        </div>
                        <div className="-mt-5">
                            <ButtonNext onClick={handleSubmit} />
                        </div>
                        <div className="flex justify-center">
                            <button 
                                className="xl:hidden rounded-3xl  w-36 h-12 bg-TitleGray text-white text-sm flex items-center justify-center gap-x-2"
                                onClick={ ()=> setMobileOpenCurriculum(true)}
                            >
                                    <ReceiptText strokeWidth={1.5} />
                                    Ver Currículo
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${mobileOpenCurriculum ? 'block mt-6' : 'hidden'} 2xl:w-4/12 xl:w-5/12 xl:block min-h-[70dvh] w-full `}>   
                    <Curriculum key={2} />
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
            <ErrorMessage message={generalError} onClose={() => setGeneralError('')}/>
        </div>
    );
}
