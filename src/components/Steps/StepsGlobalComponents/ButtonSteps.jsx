export default function ButtonSteps({steps}){
    return(
        <button className="2xl:h-12 xl:h-11 h-10 w-auto xl:px-6 px-4 bg-TitleGray text-white flex items-center gap-x-3 justify-center rounded-3xl text-sm relative">
            <span className="xl:text-2xl text-xl font-semibold">{steps}</span> Etapas Restantes
        </button>
    )
}