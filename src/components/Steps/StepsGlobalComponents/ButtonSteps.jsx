export default function ButtonSteps({steps}){
    return(
        <button className="2xl:h-12 h-11 w-auto px-6 bg-TitleGray text-white flex items-center gap-x-3 justify-center rounded-3xl relative">
            <span className="text-2xl font-semibold">{steps}</span> Etapas Restantes
        </button>
    )
}