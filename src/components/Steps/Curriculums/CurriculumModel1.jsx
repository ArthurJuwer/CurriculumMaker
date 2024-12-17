export default function CurriculumModel1({ valuesCurriculum }) {
    return (
        <div className="flex flex-col gap-y-5">
            <div>
                <h1 className="uppercase text-StrongGray text-title1920 font-bold pb-1"
                    style={{fontSize: valuesCurriculum?.textTitle}}>
                    {valuesCurriculum?.name}
                </h1>
                <ol 
                    className="text-p1920 flex flex-wrap gap-y-2 gap-x-2" 
                    style={{ color: `#${valuesCurriculum?.color}`, fontSize: valuesCurriculum?.textCorp}}
                >
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

                {valuesCurriculum?.objective && (
                    <div>
                        <h1 
                            className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                            style={{fontSize: valuesCurriculum?.textSubTitle}}
                        >
                            Objetivo
                        </h1>
                        <p 
                            className="text-p1920  text-TitleGray"
                            style={{fontSize: valuesCurriculum?.textCorp}}
                        >
                            {valuesCurriculum?.objective}
                        </p>
                        

                    </div>
                
                )}
                {valuesCurriculum?.projects?.length > 0 && (
                    <div>
                        <h1 
                            className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                            style={{fontSize: valuesCurriculum?.textSubTitle}}
                        >
                            Experiências
                        </h1>

                        <div className="flex flex-col gap-y-2">
                            {valuesCurriculum?.projects?.map((item, index) => (
                                <div key={`project-${index}`}>
                                    <p 
                                        style={{ color: `#${valuesCurriculum?.color}`, fontSize: valuesCurriculum?.textCorp }} 
                                        className="text-p1920"
                                    >
                                        {item?.year}
                                    </p>
                                    <p 
                                        style={{fontSize: valuesCurriculum?.textCorp}}
                                        className="text-TitleGray text-p1920"
                                    >
                                        {item?.title} | {item?.category}
                                    </p>
                                    <p
                                        style={{fontSize: valuesCurriculum?.textCorp}}
                                        className="text-WeakGray text-p1920"
                                    >
                                        {item?.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {valuesCurriculum?.formations && (
                <div>
                    <h1 
                        className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                        style={{fontSize: valuesCurriculum?.textSubTitle}}
                    >
                        Formação
                    </h1>
                    
                    {valuesCurriculum?.formations?.map((item, index) => (
                        <ul 
                            key={`formation-${index}`} 
                            className="pb-2 list-disc pl-4"
                        >
                            <li 
                                style={{fontSize: valuesCurriculum?.textCorp}}
                                className="text-TitleGray text-p1920"
                            >
                                {item?.school}
                            </li>
                            <li 
                                style={{fontSize: valuesCurriculum?.textCorp}}
                                className="text-TitleGray text-p1920"
                            >
                                {item?.title} | {item?.yearEntry} - {item?.yearLeave}
                            </li>
                        </ul>
                    ))}
                </div>
                )}
                {valuesCurriculum?.languages && (
                <div>
                    <h1 
                        className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                        style={{fontSize: valuesCurriculum?.textSubTitle}}
                    >
                        Idiomas
                    </h1>

                    <ul 
                        className="pb-2 list-disc pl-4"
                    > 
                        {valuesCurriculum?.languages?.map((item, index)=>(
                            <li 
                                style={{fontSize: valuesCurriculum?.textCorp}}
                                key={index} 
                                className="text-TitleGray text-p1920"
                            >
                                {item?.language} ({item?.level})
                            </li>
                        ))}
                        
                    </ul>
                </div>
                )}
                {valuesCurriculum?.certifications && (
                <div>
                    <h1 
                        className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                        style={{fontSize: valuesCurriculum?.textSubTitle}}
                    >
                        Certificações
                    </h1>

                    <ul 
                        className="pb-2 list-disc pl-4"
                    >
                        {valuesCurriculum?.certifications?.map((item,index)=>(
                            <li 
                                style={{fontSize: valuesCurriculum?.textCorp}}
                                key={index} 
                                className="text-TitleGray text-p1920"
                            >
                                {item?.name} <br />
                                Carga horária {item?.workload}h. (Conclusão {item?.conclusion})
                            </li>
                        ))}
                    </ul>
                </div>
                )}
            </div>
        </div>
    );
}
