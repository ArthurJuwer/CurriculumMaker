export default function Curriculum({valuesCurriculum}){
    return(
        <div className="h-full w-4/12 border-2 border-WeakGray p-10">
            <h1 className="uppercase text-StrongGray text-[28px] font-bold ">{valuesCurriculum?.name}</h1>
            <h1 
                className='text-base' 
                style={{ color: `#${valuesCurriculum?.color}` }}
            >
                {valuesCurriculum?.email}
            </h1>
                
        </div>
    )
}