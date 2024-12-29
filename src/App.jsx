import { Link } from "react-router-dom";
import AppStepNavigator from "./components/App/AppStepNavigator";
import { useEffect, useState } from "react";

export default function App() {
  const [linkToGo, setLinkToGo] = useState('/steps/models') 

  useEffect(()=>{
    if(localStorage.getItem('curriculumValues') !== null){
      setLinkToGo('/steps/selectMethod')
    }
  },[])

  const steps = [
    { numberStep: '1', textStep: 'Clique no botão' },
    { numberStep: '2', textStep: 'Insira seus dados' },
    { numberStep: '3', textStep: 'Baixe o currículo' }
  ];

  return (
    <div className="w-full h-screen bg-DefaultGray flex flex-col justify-center items-center gap-y-40">
      <div className="flex flex-col justify-center items-center text-center gap-y-8">
        <h1 className="font-black text-6xl text-StrongGray w-8/12">Monte seu Currículo Vencedor Gratuito e Rápido</h1>
        <p className="text-WeakGray w-1/2">O aplicativo foi elaborado para atender às “regras de currículo” que os recrutadores valorizam. Diferencie-se e acelere sua contratação com um modelo comprovado na prática.</p>
        <Link to={linkToGo}>
          <button className="bg-DefaultOrange p-4 w-96 rounded-xl text-white shadow-2xl font-bold">Criar meu currículo</button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
      {steps.map((step, index) => (
        <AppStepNavigator
          key={index}
          numberStep={step.numberStep}
          textStep={step.textStep}
          isLastStep={index === steps.length - 1}
        />
      ))}
        </div>

      </div>
    </div>  
  )
}


