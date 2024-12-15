export default function CurriculumModel2({valuesCurriculum}){
    return(
        <>
        <div className="flex justify-between flex-col gap-y-2">
            <h1 className="text-4xl border-b-2 border-black pb-2 w-full">   
                {valuesCurriculum?.name}
            </h1>
            <ol>
                <li 
                    style={{color: `#${valuesCurriculum?.color}`}}
                >
                    {valuesCurriculum?.email}</li>
            </ol>
                
        </div>
        
        </>
    )
}