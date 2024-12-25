import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CurriculumContext } from "../../../context/CurriculumContext";

export default function ButtonNav() {
    const [hoveredStep, setHoveredStep] = useState(null);

    const handleMouseEnter = (step) => {
        setHoveredStep(step);
    };

    const handleMouseLeave = () => {
        setHoveredStep(null);
    };

    const { values } = useContext(CurriculumContext);

    const steps = [
        { step: 1, label: "Cabeçalho", link: "../steps/headerCV" },
        { step: 2, label: "Apresentação", link: "../steps/presentationCV" },
        { step: 3, label: "Competências", link: "../steps/FormationCV" },
        { step: 4, label: "Finalização", link: "../steps/finalizationCV" },
    ];

    const biggestPageReached = values?.biggestPageReached || 1;

    return (
        <div className="flex items-center justify-center relative">
            {steps.map((item, index) => {
                const isStepActive = item.step <= biggestPageReached; // Verifica se o passo já foi alcançado
                return (
                    <div key={index} className="flex items-center relative justify-center">
                        {isStepActive ? (
                            <Link to={item.link}>
                                <div
                                    className="
                                        size-12 bg-TitleGray rounded-full flex items-center justify-center 
                                        text-2xl text-white
                                    "
                                    onMouseEnter={() => handleMouseEnter(item.step)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.step}
                                </div>
                            </Link>
                        ) : (
                            <div
                                className="
                                    size-12 bg-BorderInputGray rounded-full flex items-center justify-center 
                                    text-2xl text-white cursor-not-allowed
                                "
                                onMouseEnter={() => handleMouseEnter(item.step)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {item.step}
                            </div>
                        )}
                        {hoveredStep === item.step && (
                            <span
                                className={`absolute top-14 ${
                                    index === 0
                                        ? "-left-3"
                                        : index === steps.length - 1
                                        ? "-right-6"
                                        : "-left-5"
                                } text-xs bg-white text-black px-2 py-1 rounded-md shadow-lg`}
                            >
                                {item.label}
                            </span>
                        )}

                        {index < steps.length - 1 && (
                            <span
                                className={`
                                    w-28 h-1 ${
                                        isStepActive ? "bg-TitleGray" : "bg-BorderInputGray"
                                    }
                                `}
                            ></span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
