import ButtonBack from "./ButtonBack";
import ButtonSteps from "./BUttonSteps";

export default function TopMarker({stepsAtual}){
    return(
        <div className="h-28 w-full bg-NormalGray flex items-center justify-between px-32">
            <ButtonBack/>
            <ButtonSteps steps={stepsAtual}/>
        </div>
    )
}