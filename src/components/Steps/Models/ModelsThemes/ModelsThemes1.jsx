import { Link } from "react-router-dom";

export default function ModelsThemes1({ valuesCurriculum }) {
  return (
    <div className="h-full w-full border-2 border-WeakGray p-9 group relative z-0">
      <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Link to={`/steps/headerCV?model=1&color=${valuesCurriculum?.color}`}>
          <button
            className="px-4 py-2 rounded-xl text-white opacity-100"
            style={{ backgroundColor: `#${valuesCurriculum?.color}` }}
          >
            SELECIONAR
          </button>
        </Link>
      </div>
      <div className="group-hover:opacity-75 flex flex-col gap-y-3">
        <div>
          <h1 className={`uppercase text-StrongGray lg:text-title1920Model text-title1920ModelMD font-bold pb-1`}>
            {valuesCurriculum?.name}
          </h1>
          <ol
            className="lg:text-p1920Model text-p1920ModelMD flex flex-wrap gap-y-2 gap-x-2"
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
          {valuesCurriculum?.objective && (
            <div>
              <h1 className="uppercase text-StrongGray lg:text-subtitle1920Model text-subtitle1920ModelMD font-bold pb-1">Objetivo</h1>
              <p className="lg:text-p1920Model text-p1920ModelMD text-TitleGray">{valuesCurriculum?.objective}</p>
            </div>
          )}
          {valuesCurriculum?.projects?.length > 0 && (
            <div>
              <h1 className="uppercase text-StrongGray lg:text-subtitle1920Model text-subtitle1920ModelMD font-bold pb-1">Experiências</h1>
              <div className="flex flex-col gap-y-2">
                {valuesCurriculum?.projects?.map((item, index) => (
                  <div key={`project-${index}`}>
                    <p style={{ color: `#${valuesCurriculum?.color}` }} className="lg:text-p1920Model text-p1920ModelMD">
                      {item?.year}
                    </p>
                    <p className="text-TitleGray lg:text-p1920Model text-p1920ModelMD">
                      {item?.title} | {item?.category}
                    </p>
                    <p className="text-WeakGray lg:text-p1920Model text-p1920ModelMD">{item?.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {valuesCurriculum?.formations && (
            <div>
              <h1 className="uppercase text-StrongGray lg:text-subtitle1920Model text-subtitle1920ModelMD font-bold pb-1">Formação</h1>
              {valuesCurriculum?.formations?.map((item, index) => (
                <ul key={`formation-${index}`} className="pb-2 list-disc pl-4">
                  <li className="text-TitleGray lg:text-p1920Model text-p1920ModelMD ">{item?.school}</li>
                  <li className="text-TitleGray lg:text-p1920Model text-p1920ModelMD">{item?.title} | {item?.yearEntry} - {item?.yearLeave}</li>
                </ul>
              ))}
            </div>
          )}

          {valuesCurriculum?.languages && (
            <div>
              <h1 className="uppercase text-StrongGray lg:text-subtitle1920Model text-subtitle1920ModelMD font-bold pb-1">Idiomas</h1>
              <ul className="pb-2 list-disc pl-4">
                {valuesCurriculum?.languages?.map((item, index) => (
                  <li key={index} className="text-TitleGray lg:text-p1920Model text-p1920ModelMD">{item?.language} ({item?.level})</li>
                ))}
              </ul>
            </div>
          )}

          {valuesCurriculum?.certifications && (
            <div>
              <h1 className="uppercase text-StrongGray lg:text-subtitle1920Model text-subtitle1920ModelMD font-bold pb-1">Certificações</h1>
              <ul className="pb-2 list-disc pl-4">
                {valuesCurriculum?.certifications?.map((item, index) => (
                  <li key={index} className="text-TitleGray lg:text-p1920Model text-p1920ModelMD">
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
