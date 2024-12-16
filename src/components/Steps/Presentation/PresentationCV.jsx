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
    const { values, setValues } = useContext(CurriculumContext);

    const [objective, setObjective] = useState('texto do objetivo.');
    const [projects, setProjects] = useState([
        { title: 'Projeto 1', category: 'Selecione a Categoria', year: 'ANO', description: 'descreva seu projeto aqui'},
        { title: 'Projeto 2', category: 'Selecione a Categoria', year: 'ANO', description: 'descreva seu projeto aqui'},
    ]);
    const [selectedProject, setSelectedProject] = useState(0);

    // Atualiza os valores no contexto sempre que os projetos ou objetivo mudarem
    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            objective,
            projects,
        }));
    }, [objective, projects, setValues]);

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
        setValues(prevValues => ({
            ...prevValues,
            objective,
            projects,
        }));
    };

    return (
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={'2'} />
            <div className="px-32 py-14 h-[calc(100vh-7rem)] flex justify-between gap-x-32">
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
                                    value={projects[selectedProject].title === `Projeto ${selectedProject+1}` ? '' : projects[selectedProject].title}
                                />
                                <Input
                                    id={`category-${selectedProject}`}
                                    width="w-5/12"
                                    label="Categoria"
                                    onChange={(e) => handleProjectChange(selectedProject, 'category', e.target.value)}
                                    value={projects[selectedProject].category === 'Selecione a Categoria' ? '' : projects[selectedProject].category}
                                />
                                <Input
                                    id={`year-${selectedProject}`}
                                    width="w-2/12"
                                    label="Ano"
                                    onChange={(e) => handleProjectChange(selectedProject, 'year', e.target.value)}
                                    value={projects[selectedProject].year === 'ANO' ? '' : projects[selectedProject].year}
                                />
                            </div>
                            <TextArea
                                id={`description-${selectedProject}`}
                                isLast={true}
                                label="Descrição"
                                onChange={(e) => handleProjectChange(selectedProject, 'description', e.target.value)}
                                value={projects[selectedProject].description === 'descreva seu projeto aqui' ? '' : projects[selectedProject].description}
                            />
                        </div>
                    </div>
                    <div className="-mt-5">
                        <ButtonNext onClick={handleSubmit} link={'/steps/formationCV'} />
                    </div>
                </div>
                <Curriculum valuesCurriculum={values} />
            </div>
        </div>
    );
}
