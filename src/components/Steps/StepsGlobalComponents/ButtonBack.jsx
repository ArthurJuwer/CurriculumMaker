import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurriculumContext } from "../../../context/CurriculumContext";
import { useContext, useState } from "react";
import ErrorMessage from "./ErrorMessage";

export default function ButtonBack() {
    const location = useLocation();
    const navigate = useNavigate();
    const { values, setValues } = useContext(CurriculumContext);
    const [generalError, setGeneralError] = useState(values?.generalError)

    const biggestPageReached = values?.biggestPageReached || 1;

    const navigationMap = {
        '/steps/selectMethod': '/',
        '/steps/models': '/',
        '/steps/headerCV': '/steps/models',
        '/steps/presentationCV': '/steps/headerCV',
        '/steps/FormationCV': '/steps/presentationCV',
        '/steps/finalizationCV': '/steps/FormationCV'
    };

    const validateFields = () => {

        // step 1

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
        // Verificação do tamanho das listas

        
        // step 3
        let consultOnNavStep3
        if(values?.formations){
            const allFieldsFilled = values?.formations.every(formation =>
                formation.school !== 'escola' && formation.school.trim() !== '' &&
                formation.title !== 'titulo' && formation.title.trim() !== '' &&
                formation.yearEntry !== 'ano entrada' && formation.yearEntry.trim() !== '' &&
                formation.yearLeave !== 'ano saida' && formation.yearLeave.trim() !== ''
            ) && values?.languages.every(language =>
                language.language !== 'Língua' && language.language.trim() !== ''
            );
            consultOnNavStep3 = !allFieldsFilled;
        }
        
        

        if ((consultOnNavStep1 || consultOnNavStep2 || consultOnNavStep3) && biggestPageReached >= 4) {
            setGeneralError('Preencha Todos os campos');
            return false;
        }
        return true;
    };

    const handleBackClick = () => {
        if(!validateFields()){
            return
        }
        const currentUrl = location.pathname;
        setValues((prev)=>({
            ...prev,
            generalError: ''
        }))
        navigate(navigationMap[currentUrl] || -1);
        
        
    };

    return (
        <>
            <button
                className="lg:h-12 py-2 lg:w-24 pl-4 h-10 w-[5.5rem] bg-TitleGray text-white flex items-center justify-center rounded-3xl relative"
                onClick={handleBackClick}
            >
                <ChevronLeft className="absolute left-1" />
                <h1>Voltar</h1>
            </button>
            <ErrorMessage message={generalError} onClose={() => setGeneralError('')} />
            
        </>
    );
}
