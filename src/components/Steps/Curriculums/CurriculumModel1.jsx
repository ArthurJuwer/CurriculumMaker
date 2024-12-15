export default function CurriculumModel1({valuesCurriculum}) {
    return (
        <div className="flex flex-col gap-y-5">
            <div className="">
                <h1 className="uppercase text-StrongGray text-[28px] font-bold pb-1">{valuesCurriculum?.name}</h1>
                <ol className="text-xs flex flex-wrap gap-y-2 gap-x-2" style={{ color: `#${valuesCurriculum?.color}` }}>
                    <div className="flex gap-x-1">
                        <li className="after:content-['_|']">{valuesCurriculum?.bairro}</li>
                        <li className="after:content-[',']">{valuesCurriculum?.cidade}</li>
                        <li className="after:content-['_|']">{valuesCurriculum?.estado}</li>
                        <li className="after:content-['_|']">{valuesCurriculum?.telefone}</li>
                    </div>
                    <li>{valuesCurriculum?.email}</li>
                    <div className="flex">
                        <li className="">{valuesCurriculum?.linkedin}</li>
                    </div>
                </ol>
            </div>
            <div className="">
                <h1 className="uppercase text-StrongGray text-xl font-bold pb-2">Objetivo</h1>
                <p className="text-sm">{valuesCurriculum?.objective}</p>
            </div>
        </div>
    );
}
