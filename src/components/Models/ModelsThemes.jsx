export default function ModelsThemes({id, color}){
    const url = `../steps/headerCV?model=${id}&color=${color}`;
    return(
        <a href={url}>
            <div className="h-full w-96 border border-black"></div>
        </a>
    )
}