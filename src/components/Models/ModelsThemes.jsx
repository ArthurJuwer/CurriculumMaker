import { Link } from "react-router-dom";

export default function ModelsThemes({ valuesCurriculum }) {
    return (
      <div className="h-full w-3/12 border-2 border-WeakGray p-9 group relative z-0">
        <div className="hidden group-hover:block absolute top-72 left-[10.5rem] z-10">
        <Link to={`/steps/headerCV?model=${valuesCurriculum?.model}&color=${valuesCurriculum?.color}`}>
          <button
            className="px-4 py-2 rounded-xl text-white opacity-100"
            style={{ backgroundColor: `#${valuesCurriculum?.color}` }}
          >
            SELECIONAR
          </button>
          </Link>
        </div>
        <div className="group-hover:opacity-75 flex flex-col gap-y-3">
          {/* Informações Pessoais */}
          <div>
            <h1 className={`uppercase text-StrongGray text-title1920Model font-bold pb-1`}>
              {valuesCurriculum?.name}
            </h1>
            <ol
              className="text-titleDescript1920Model flex flex-wrap gap-y-2 gap-x-2"
              style={{ color: `#${valuesCurriculum?.color}` }}
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
            {/* Objetivo */}
            {valuesCurriculum?.objective && (
              <div>
                <h1 className="uppercase text-StrongGray text-subtitle1920Model font-bold pb-1">Objetivo</h1>
                <p className="text-p1920Model text-TitleGray">{valuesCurriculum?.objective}</p>
              </div>
            )}
  
            {/* Experiências */}
            {valuesCurriculum?.projects?.length > 0 && (
              <div>
                <h1 className="uppercase text-StrongGray text-subtitle1920Model font-bold pb-1">Experiências</h1>
                <div className="flex flex-col gap-y-2">
                  {valuesCurriculum?.projects?.map((item, index) => (
                    <div key={`project-${index}`}>
                      <p style={{ color: `#${valuesCurriculum?.color}` }} className="text-p1920Model">
                        {item?.year}
                      </p>
                      <p className="text-TitleGray text-p1920Model">
                        {item?.title} | {item?.category}
                      </p>
                      <p className="text-WeakGray text-p1920Model">{item?.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            {/* Formação */}
            {valuesCurriculum?.formations && (
              <div>
                <h1 className="uppercase text-StrongGray text-subtitle1920Model font-bold pb-1">Formação</h1>
                {valuesCurriculum?.formations?.map((item, index) => (
                  <ul key={`formation-${index}`} className="pb-2 list-disc pl-4">
                    <li className="text-TitleGray text-p1920Model ">{item?.school}</li>
                    <li className="text-TitleGray text-p1920Model">{item?.title} | {item?.yearEntry} - {item?.yearLeave}</li>
                  </ul>
                ))}
              </div>
            )}
  
            {/* IDIOMAS */}
            {valuesCurriculum?.languages && (
              <div>
                <h1 className="uppercase text-StrongGray text-subtitle1920Model font-bold pb-1">Idiomas</h1>
                <ul className="pb-2 list-disc pl-4">
                  {valuesCurriculum?.languages?.map((item, index) => (
                    <li key={index} className="text-TitleGray text-p1920Model">{item?.language} ({item?.level})</li>
                  ))}
                </ul>
              </div>
            )}
  
            {/* CERTIFICAÇÕES */}
            {valuesCurriculum?.certifications && (
              <div>
                <h1 className="uppercase text-StrongGray text-subtitle1920Model font-bold pb-1">Certificações</h1>
                <ul className="pb-2 list-disc pl-4">
                  {valuesCurriculum?.certifications?.map((item, index) => (
                    <li key={index} className="text-TitleGray text-p1920Model">
                      {item?.name} <br />
                      Carga horária {item?.workload}h. (Conclusão {item?.conclusion})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  