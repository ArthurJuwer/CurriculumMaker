import ButtonBack from "./ButtonBack";
import ButtonNav from "./ButtonNav";
import ButtonSteps from "./ButtonSteps";

export default function TopMarker({stepsAtual}){
    return(
        <div className="2xl:h-28 h-20 w-full bg-NormalGray flex items-center justify-between 2xl:px-32 xl:px-16 px-4">
            <ButtonBack/>
            <ButtonNav />
            <ButtonSteps steps={stepsAtual}/>
        </div>
    )
}