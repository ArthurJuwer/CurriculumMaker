import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurriculumContext } from "../../../context/CurriculumContext";
import ErrorMessage from "./ErrorMessage";

export default function ButtonNav() {
    const [visibleLabel, setVisibleLabel] = useState(null); // Estado para controlar o rótulo visível no hover
    
    const location = useLocation();
    const navigate = useNavigate();
    const { values } = useContext(CurriculumContext);
    const [generalError, setGeneralError] = useState(values?.generalError)

    const steps = [
        { step: 1, label: "Cabeçalho", link: "/steps/headerCV" },
        { step: 2, label: "Apresentação", link: "/steps/presentationCV" },
        { step: 3, label: "Competências", link: "/steps/FormationCV" },
        { step: 4, label: "Finalização", link: "/steps/finalizationCV" },
    ];

    const biggestPageReached = values?.biggestPageReached || 1;

    const handleMouseEnter = (step) => {
        setVisibleLabel(step); 
    };

    const handleMouseLeave = () => {
        setVisibleLabel(null); 
    };

    const validateFields = () => {

        const validateContactInfo = (type, value) => {
            let error = false;
          
            if (type === 'email') {
        
              const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com']; // Domínios válidos
              const isValidEmail =
                validDomains.some(domain => value?.includes(domain)) &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value); 
              error = !isValidEmail;
            } else if (type === 'telefone') {
              const isValidNumber = /^[0-9]{10,15}$/?.test(value);
              error = !isValidNumber;
            }
          
            return !error; 
          };
          
        const verificationLinkedin = values?.linkedin?.startsWith("https://www.linkedin.com/in/");
        const verificationContactEmail = validateContactInfo('email', values?.email); 
        const verificationContactPhone = validateContactInfo('telefone', values?.telefone);

        const consultOnNavStep1 = !(values?.name && values?.bairro && values?.cidade && values?.estado && verificationLinkedin && verificationContactEmail && verificationContactPhone);
        
        //   step 2

        const currentYear = new Date().getFullYear(); // Ano atual
        
        const errorObjective = values?.objective
        const errors = values?.projects?.map((project, index) => ({
            title: project?.title === 'Projeto ' + (index + 1) ? true : false,
            category: project?.category === 'Categoria' ? true : false,
            year: 
            !project?.year || 
            isNaN(project?.year) || 
            Number(project?.year) < 1900 || 
            Number(project?.year) > currentYear,
            description: project?.description === 'descreva seu projeto aqui' ? true : false,
        }));


        const consultOnNavStep2 = (!errors || !errorObjective);

        const allFieldsFilled = values?.formations.every(formation =>
                formation.school !== 'escola' && formation.school.trim() !== '' &&
                formation.title !== 'titulo' && formation.title.trim() !== '' &&
                formation.yearEntry !== 'ano entrada' && formation.yearEntry.trim() !== '' &&
                formation.yearLeave !== 'ano saida' && formation.yearLeave.trim() !== ''
            ) && values?.languages.every(language =>
                language.language !== 'Língua' && language.language.trim() !== ''
            );

        const consultOnNavStep3 = !allFieldsFilled;

        if ((consultOnNavStep1 || consultOnNavStep2 || consultOnNavStep3) && biggestPageReached >= 4) {
            setGeneralError('Preencha Todos os campos');
            return false;
        }
        return true;
    };
    
    const handleNavigation = (link) => {
        if (!validateFields()) {
            return;
        } 
        navigate(link);
    };

    return (
        <>
        <div className="xl:flex hidden items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            {steps.map((item, index) => {
                const isStepActive = item.step <= biggestPageReached;
                const isCurrentStep = location.pathname === item.link;

                return (
                    <>
                        <div key={index} className="flex items-center justify-center relative">
                            {isStepActive ? (
                                <div
                                    className="cursor-pointer"
                                    onClick={() => handleNavigation(item.link)} // Navegar apenas se os campos forem válidos
                                >
                                    <div
                                        className={`2xl:size-12 size-11 rounded-full flex items-center justify-center 2xl:text-2xl xl:text-xl text-white cursor-pointer ${
                                            isCurrentStep ? "bg-StrongGray" : "bg-TitleGray"
                                        }`}
                                        onMouseEnter={() => handleMouseEnter(item.step)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {item.step}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="2xl:size-12 size-11 bg-BorderInputGray rounded-full flex items-center justify-center 2xl:text-2xl xl:text-xl text-white cursor-not-allowed"
                                    onMouseEnter={() => handleMouseEnter(item.step)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.step}
                                </div>
                            )}
                            {(isCurrentStep || visibleLabel === item.step) && (
                                <span className="text-xs absolute top-14 bg-white text-black w-auto px-2 py-1 rounded-md shadow-lg">
                                    {isCurrentStep ? "ATUAL" : item.label}
                                </span>
                            )}
                        </div>
                        {index < steps.length - 1 && (
                            <span
                                className={`w-28 h-1 ${
                                    isStepActive ? "bg-TitleGray" : "bg-BorderInputGray"
                                }`}
                            ></span>
                        )}
                    </>
                );
            })}
        </div>
        <ErrorMessage message={generalError} onClose={() => setGeneralError('')} />
        </>
    );
}
