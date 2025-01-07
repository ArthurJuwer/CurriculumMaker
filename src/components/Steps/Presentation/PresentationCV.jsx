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

        // Salvar o objetivo e os projetos no localStorage
        localStorage.setItem('objective', objective);
        localStorage.setItem('projects', JSON.stringify(projects));

        setValues(prevValues => ({
            ...prevValues,
            objective,
            projects,
        }));

        navigate('/steps/FormationCV');
    };

    return (
        <div className="h-dvh w-full bg-DefaultGray">
            <TopMarker stepsAtual={'2'} />
            <div className="2xl:px-32 2xl:py-14 px-16 py-6 2xl:h-[calc(100dvh-7rem)] xl:h-[calc(100dvh-5rem)] h-[calc(100dvh-4rem)] flex justify-between 2xl:gap-x-32 gap-x-5">
                <div className="flex flex-col 2xl:gap-y-8 gap-y-3 w-8/12 h-full overflow-y-auto">
                    <Score />
                    <div className="h-full flex flex-col gap-y-8">
                        <Title
                            title={'Apresentação Pessoal'}
                            description={'Essa seção permite mostrar suas metas profissionais e sua trajetória de experiências relevantes.'}
                        />
                        <div className="max-h-full w-full flex justify-between 2xl:gap-x-5 gap-x-3">
                            <TextArea
                                key={0}
                                id={0}
                                label={'Objetivo'}
                                width={'w-7/12'}
                                value={objective !== 'texto do objetivo.' ? objective : ''}
                                onChange={(e) => {
                                    setObjective(e.target.value)
                                    if(objective.length >= 120){
                                        setGeneralError('Cuidado você esta chegando perto do limite máximo de caracteres')
                                    }
                                }}
                                placeholder={'ex: Conseguir uma posição como assistente administrativo, contribuindo com minhas habilidades de gestão e atendimento para a empresa.'}
                            />
                            <div className="bg-TitleGray 2xl:p-5 py-2 px-5 text-white rounded-2xl h-full w-5/12 flex flex-col 2xl:gap-y-3 gap-y-2">
                                <h1 className="2xl:text-xl font-medium">Experimente estas dicas:</h1>
                                <ul className="list-disc pl-5 2xl:text-sm text-xs flex flex-col gap-y-3 font-normal">
                                    <li>Evite detalhes excessivos e vá direto ao ponto.</li>
                                    <li>Seja realista quanto às suas metas profissionais.</li>
                                    <li>Seja claro sobre sua área de interesse.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-transparent border border-BorderInputGray rounded-lg w-full p-5 pb-4 -mt-4 flex gap-x-4 relative">
                            <label htmlFor="" className="absolute -top-3 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0">Projeto {selectedProject + 1}</label>
                            <div className="w-1/12 flex flex-col gap-y-2">
                                {[0, 1].map(index => (
                                    <button
                                        key={index}
                                        className={`h-1/2 rounded-xl text-xl text-white ${selectedProject === index ? 'bg-TitleGray' : 'bg-NormalGray'}`}
                                        onClick={() => handleProjectSwitch(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="w-11/12 flex flex-col gap-y-4">
                                <div className="flex gap-x-2">
                                    <Input
                                        id={`title-${selectedProject}`}
                                        width="w-5/12"
                                        label="Titulo do Projeto"
                                        onChange={(e) => handleProjectChange(selectedProject, 'title', e.target.value)}
                                        value={projects[selectedProject]?.title === `Projeto ${selectedProject + 1}` ? '' : projects[selectedProject]?.title}
                                        error={projectErrors[selectedProject]?.title} 
                                        placeholder="ex: Documentação Administrativa"
                                        validateAllInputs={validateAllInputs} 
                                    />
                                    <Input
                                        id={`category-${selectedProject}`}
                                        width="w-5/12"
                                        label="Categoria"
                                        onChange={(e) => handleProjectChange(selectedProject, 'category', e.target.value)}
                                        value={projects[selectedProject]?.category === 'Categoria' ? '' : projects[selectedProject]?.category}
                                        error={projectErrors[selectedProject]?.category}
                                        placeholder={'ex: Administração'}
                                        validateAllInputs={validateAllInputs} 
                                    />
                                    <Input
                                        id={`year-${selectedProject}`}
                                        width="w-2/12"
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
                    </div>
                </div>
                <Curriculum valuesCurriculum={values} />
            </div>
            <ErrorMessage message={generalError} onClose={() => setGeneralError('')}/>
        </div>
    );
}
