import ModelsColors from "./ModelsColors"
import ModelsThemes from "./ModelsThemes"
import { useState } from "react"
import Curriculum from "../Steps/StepsGlobalComponents/Curriculum"


export default function Models() {

    const colors = [
        { color: 'A1A1A1' },
        { color: 'AF9B94' },
        { color: '1E1E1E' },
        { color: '4F1213' },
        { color: '12384F' },
        { color: '124F2B' },
        { color: 'A8890D' },
    ]

    const [colorPass, setColorPass] = useState(colors[0].color)
    const [selectedIndex, setSelectedIndex] = useState(null);
    const valuesModel = {
        "model": "1",
        "color": colorPass,
        "name": "Carlos Silva Souza",
        "email": "carlos.silva@email.com",
        "bairro": "Centro Histórico",
        "cidade": "Porto Alegre",
        "estado": "RS",
        "telefone": "(51) 99999-8888",
        "linkedin": "https://www.linkedin.com/in/carlossilva",
        "objective": "Busco oportunidades de liderança em áreas administrativas, onde possa aplicar minhas habilidades em gestão de equipes e processos, buscando sempre a melhoria contínua.",
        "projects": [
            {
                "title": "Automatização de Processos Administrativos",
                "category": "Gestão de Projetos",
                "year": "2023",
                "description": "Liderança de um projeto de automação de processos administrativos que resultou na redução de 30% do tempo gasto em tarefas repetitivas."
            },
            {
                "title": "Redução de Custos Operacionais",
                "category": "Gestão Financeira",
                "year": "2022",
                "description": "Implementação de estratégias que reduziram em 15% os custos operacionais anuais de uma empresa de médio porte."
            }
        ],
        "formations": [
            {
                "school": "Universidade Federal do Rio Grande do Sul (UFRGS)",
                "title": "Bacharel em Administração",
                "yearEntry": "2015",
                "yearLeave": "2019"
            }
        ],
        "languages": [
            {
                "language": "Português",
                "level": "NATIVO"
            },
            {
                "language": "Inglês",
                "level": "B1"
            }
        ],
        "certifications": [
            {
                "name": "Certificação em Gestão de Projetos",
                "workload": "30",
                "conclusion": "2021",
            },
        ]
    }

    return (
        <div className="max-h-screen w-full bg-DefaultGray flex flex-col py-16 items-center gap-y-10">
            <h1 className="text-StrongGray text-center font-bold text-4xl w-1/3">
                Escolha entre estes currículos de alta aprovação
            </h1>
            <div className="p-2 bg-WeakLightGray w-auto flex gap-x-5">
                {colors.map((handleColor, index) => (
                    <ModelsColors
                        key={index}
                        backgroundColor={handleColor.color}
                        onClick={() => {
                            setColorPass(handleColor.color)
                            setSelectedIndex(index)
                        }}
                        isSelected={selectedIndex === index}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center gap-x-12 w-full h-screen">
                <ModelsThemes 
                    valuesCurriculum={valuesModel}
                 />
            </div>
        </div>
    )
}
