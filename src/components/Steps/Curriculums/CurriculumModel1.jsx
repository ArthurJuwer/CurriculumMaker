export default function CurriculumModel1({ valuesCurriculum }) {
    return (
        <div className="flex flex-col gap-y-5">
            {/* Informações Pessoais */}
            <div>
                <h1 className="uppercase text-StrongGray text-[28px] font-bold pb-1">
                    {valuesCurriculum?.name}
                </h1>
                <ol className="text-xs flex flex-wrap gap-y-2 gap-x-2" style={{ color: `#${valuesCurriculum?.color}` }}>
                    <div className="flex gap-x-1">
                        <li className="after:content-['_|']">{valuesCurriculum?.bairro}</li>
                        <li className="after:content-[',']">{valuesCurriculum?.cidade}</li>
                        <li className="after:content-['_|']">{valuesCurriculum?.estado}</li>
                        <li className="after:content-['_|']">{valuesCurriculum?.telefone}</li>
                    </div>
                    <li>{valuesCurriculum?.email}</li>
                    <li>{valuesCurriculum?.linkedin}</li>
                </ol>
            </div>

            
                <div className="flex flex-col gap-y-2">
                {/* Objetivo */}

                {valuesCurriculum?.objective && (
                    <div>
                        <h1 className="uppercase text-StrongGray text-xl font-bold pb-2">Objetivo</h1>
                        <p className="text-[0.8rem] text-TitleGray">{valuesCurriculum?.objective}</p>
                    </div>
                
                )}

                {/* Experiências */}
                {valuesCurriculum?.projects?.length > 0 && (
                    <div>
                        <h1 className="uppercase text-StrongGray text-xl font-bold pb-2">Experiências</h1>
                        <div className="flex flex-col gap-y-2">
                            {valuesCurriculum?.projects?.map((item, index) => (
                                <div key={`project-${index}`}>
                                    <p style={{ color: `#${valuesCurriculum?.color}` }} className="text-[0.8rem]">
                                        {item?.year}
                                    </p>
                                    <p className="text-TitleGray text-[0.8rem]">
                                        {item?.title} | {item?.category}
                                    </p>
                                    <p className="text-WeakGray text-[0.8rem]">{item?.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Formação */}
                {valuesCurriculum?.formations && (
                <div>
                    <h1 className="uppercase text-StrongGray text-xl font-bold pb-2">Formação</h1>
                    {valuesCurriculum?.formations?.map((item, index) => (
                        <ul key={`formation-${index}`} className="pb-2 list-disc pl-4">
                            <li className="text-TitleGray text-sm">{item?.school}</li>
                            <li className="text-TitleGray text-sm">{item?.title} | {item?.yearEntry} - {item?.yearLeave}</li>
                        </ul>
                    ))}
                </div>
                )}

                {/* IDIOMAS */}
                {valuesCurriculum?.languages && (
                <div>
                    <h1 className="uppercase text-StrongGray text-xl font-bold pb-2">Idiomas</h1>
                    <ul className="pb-2 list-disc pl-4">
                        {valuesCurriculum?.languages?.map((item, index)=>(
                            <li key={index} className="text-TitleGray text-sm">{item?.language} ({item?.level})</li>
                        ))}
                        
                    </ul>
                </div>
                )}
                
                {/* CERTIFICAÇÕES */}

                {valuesCurriculum?.certifications && (
                <div>
                    <h1 className="uppercase text-StrongGray text-xl font-bold pb-2">Certificações</h1>
                    <ul className="pb-2 list-disc pl-4">
                        {valuesCurriculum?.certifications?.map((item,index)=>(
                            <li key={index} className="text-TitleGray text-sm">{item?.name} <br />
                            Carga horária {item?.workload}h. (Conclusão {item?.conclusion})</li>
                        ))}
                        
                    </ul>
                </div>
                )}

                
            </div>
        </div>
    );
}
