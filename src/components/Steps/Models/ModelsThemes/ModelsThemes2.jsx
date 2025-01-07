import { Link } from "react-router-dom";

export default function ModelsThemes2({ valuesCurriculum }) {
  return (
    <div className="w-full border-2 border-WeakGray 2xl:p-9 p-7 group relative z-0">
      <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Link to={`/steps/headerCV?model=2&color=${valuesCurriculum?.color}`}>
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
              
              <h1
                className="uppercase text-StrongGray 2xl:text-title1920Model lg:text-title1920ModelXL text-title1920ModelMD font-bold pb-1 text-center"
                style={{ color: `#${valuesCurriculum?.color}` }}
              >
                {valuesCurriculum?.name}
              </h1>
              <ol
                className="2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD flex flex-wrap gap-y-2 gap-x-2 justify-center"
                style={{ fontSize: valuesCurriculum?.textCorp }}
              >
                <div className="flex gap-x-1">
                  <li>{valuesCurriculum?.bairro} |</li>
                  <li>{valuesCurriculum?.cidade},</li>
                  <li>{valuesCurriculum?.estado} |</li>
                  <li>{valuesCurriculum?.telefone} |</li>
                </div>
                <li>{valuesCurriculum?.email}</li>
                <li>{valuesCurriculum?.linkedin}</li>
              </ol>
            </div>

            <div className="flex flex-col gap-y-2">
              {valuesCurriculum?.objective && (
                <div>
                  <h1
                    className="uppercase text-StrongGray 2xl:text-subtitle1920Model lg:text-subtitle1920ModelXL text-subtitle1920ModelMD font-bold mb-2 border-b-2"
                    style={{ borderColor: `#${valuesCurriculum?.color}` }}
                  >
                    Objetivo
                  </h1>
                  <p
                    className="2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD text-TitleGray"
                    style={{ fontSize: valuesCurriculum?.textCorp }}
                  >
                    {valuesCurriculum?.objective}
                  </p>
                </div>
              )}

              {valuesCurriculum?.projects?.length > 0 && (
                <div>
                  <h1
                    className="uppercase text-StrongGray 2xl:text-subtitle1920Model lg:text-subtitle1920ModelXL text-subtitle1920ModelMD font-bold mb-2 border-b-2"
                    style={{ borderColor: `#${valuesCurriculum?.color}` }}
                  >
                    Experiências
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    {valuesCurriculum?.projects?.map((item, index) => (
                      <div key={`project-${index}`}>
                        <div className="flex gap-x-2 items-center">
                          <p
                            className="2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD"
                            >
                              {item?.year} - 
                            </p>
                            <p
                            className="text-TitleGray 2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD"
                            >
                            {item?.title} | {item?.category}
                            </p>
                        </div>
                        
                        <p
                          className="text-WeakGray 2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD"
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
                    className={`${valuesCurriculum?.formations.length <= 0 && valuesCurriculum?.biggestPageReached >= 4 ? 'hidden' : ''} uppercase text-StrongGray 2xl:text-subtitle1920Model lg:text-subtitle1920ModelXL text-subtitle1920ModelMD font-bold mb-2 border-b-2`}
                    style={{ borderColor: `#${valuesCurriculum?.color}`}}
                  >
                    Formação
                  </h1>
                  {valuesCurriculum?.formations?.map((item, index) => (
                    <ul key={`formation-${index}`} className="pb-2">
                      <div className="flex items-center gap-x-4">
                        <li
                          className="text-TitleGray 2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD flex items-center"
                        >
                          • {item?.school}
                        </li>
                      </div>

                      <li
                        className="text-TitleGray 2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD"
                      >
                        • {item?.title} | {item?.yearEntry} - {item?.yearLeave}
                      </li>
                    </ul>
                  ))}
                </div>
              )}

              {valuesCurriculum?.languages && (
                <div>
                  <h1
                    className="uppercase text-StrongGray 2xl:text-subtitle1920Model lg:text-subtitle1920ModelXL text-subtitle1920ModelMD font-bold mb-2 border-b-2 border-black"
                    style={{ borderColor: `#${valuesCurriculum?.color}`, fontSize: valuesCurriculum?.textSubTitle }}
                  >
                    Idiomas
                  </h1>
                  <ul className="pb-2 flex gap-x-2">
                    {valuesCurriculum?.languages?.map((item, index) => (
                      <li
                        style={{ fontSize: valuesCurriculum?.textCorp }}
                        key={index}
                        className="text-TitleGray 2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD"
                      >
                        • {item?.language} ({item?.level})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {valuesCurriculum?.certifications && (
                <div>
                  <h1
                    className={`${valuesCurriculum?.certifications.length <= 0 && valuesCurriculum?.biggestPageReached >= 4 ? 'hidden' : ''} uppercase text-StrongGray 2xl:text-subtitle1920Model lg:text-subtitle1920ModelXL text-subtitle1920ModelMD font-bold mb-2 border-b-2 border-black`}
                    style={{ borderColor: `#${valuesCurriculum?.color}`, fontSize: valuesCurriculum?.textSubTitle }}
                  >
                    Certificações
                  </h1>
                  <ul className="pb-2 list-disc pl-4">
                    {valuesCurriculum?.certifications?.map((item, index) => (
                      <li
                        style={{ fontSize: valuesCurriculum?.textCorp }}
                        key={index}
                        className="text-TitleGray 2xl:text-p1920Model lg:text-p1920ModelXL text-p1920ModelMD"
                      >
                        {item?.name} <br />
                        Carga horária {item?.workload}. (Conclusão {item?.conclusion})
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
