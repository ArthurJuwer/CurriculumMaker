import ButtonNext from "../StepsGlobalComponents/ButtonNext";
import Curriculum from "../StepsGlobalComponents/Curriculum";
import Score from "../StepsGlobalComponents/Score";
import Title from "../StepsGlobalComponents/Title";
import TopMarker from "../StepsGlobalComponents/TopMarker";

export default function PresentationCV(){
    return(
        <div className="h-screen w-full bg-DefaultGray">
            <TopMarker stepsAtual={'2'}/>
            <div className="px-32 py-16 h-[calc(100vh-7rem)] flex justify-between gap-x-32">
                <div className="h-full w-8/12 flex flex-col gap-y-8">
                    <Score />
                    <Title 
                        title={'Apresentação Pessoal'} 
                        description={'Essa seção permite mostrar suas metas profissionais e sua trajetória de experiências relevantes.'}
                    /> 
                    <div className=""></div> 
                    <ButtonNext link={'/steps/formationCV'}/>
                </div>
                <Curriculum />
            </div>
           

        </div>
    )
}