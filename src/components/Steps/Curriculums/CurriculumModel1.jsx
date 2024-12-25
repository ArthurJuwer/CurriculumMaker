import { useContext, useEffect, useRef, useState } from "react";
import { CurriculumContext } from "../../../context/CurriculumContext";

export default function CurriculumModel1({ valuesCurriculum, isLast, twoPages }) {
  const [isNewPage, setIsNewPage] = useState(false); 
  const curriculumRef = useRef(null); 
  const borderRef = useRef(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsMoved, setElementsMoved] = useState(0);
  const {setValues} = useContext(CurriculumContext)
  


  useEffect(() => {
    if (curriculumRef.current && borderRef.current) {
        let curriculumHeight = curriculumRef.current.offsetHeight;
        let borderHeight = borderRef.current.offsetHeight;

      

      if (curriculumHeight > borderHeight) {
        setIsNewPage(true);
        setElementsMoved(prevState => prevState + 1)
        
      } 
    }
  }, [valuesCurriculum]);
    
  
    useEffect(()=>{
        
    if (curriculumRef.current && borderRef.current) {
        let curriculumHeight = curriculumRef.current.offsetHeight;
        let borderHeight = borderRef.current.offsetHeight;
        if (curriculumHeight > borderHeight) {
            setIsNewPage(true);
            setElementsMoved((prevState) => prevState + 1);
            
        }
    }

  }, [elementsMoved])
  useEffect(() => {
    if (elementsMoved > 0) {
      setValues((prevValues) => ({
        ...prevValues,
        elementsMoved,
      }));
    }
  }, [elementsMoved, setValues]);
  useEffect(()=>{
    setValues((prevValues) => ({
      ...prevValues,
      currentPage,
    }));
  }, [currentPage])


  return (
    <>
    

      {currentPage === 1 && (
        <div
          className={`page-1 h-full ${isLast ? "w-full" : "w-4/12 border-2 border-WeakGray"} flex flex-col flex-wrap relative`}
          ref={borderRef}
        >

        <div
            className={`bg-TitleGray px-12 py-1 absolute left-1/2 -translate-x-1/2 -top-12 rounded-xl flex gap-x-12 text-xl`}
        >
            <button
                onClick={() => setCurrentPage(1)}
                className={`text-WeakGray ${currentPage === 1 ? 'text-white' : ''}`}
            >
                1
            </button>
            {
                isNewPage == true || twoPages == true 
                ?
                    <button
                    onClick={() => setCurrentPage(2)}
                    className={`text-WeakGray ${currentPage === 2 ? 'text-white' : ''}`}
                    >
                        2
                    </button>
                :
                    ''
            }
        </div>
        
          <div className="flex flex-col flex-wrap gap-y-5 p-10" ref={curriculumRef} >
            <div>
              
              <h1
                className="uppercase text-StrongGray text-title1920 font-bold pb-1"
                style={{ fontSize: valuesCurriculum?.textTitle || "19pt" }}
              >
                {valuesCurriculum?.name}
              </h1>
              <ol
                className="text-p1920 flex flex-wrap gap-y-2 gap-x-2"
                style={{ color: `#${valuesCurriculum?.color}`, fontSize: valuesCurriculum?.textCorp }}
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
              {valuesCurriculum?.objective && !(elementsMoved >= 5) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: valuesCurriculum?.textSubTitle }}
                  >
                    Objetivo
                  </h1>
                  <p
                    className="text-p1920 text-TitleGray"
                    style={{ fontSize: valuesCurriculum?.textCorp }}
                  >
                    {valuesCurriculum?.objective}
                  </p>
                </div>
              )}

              {valuesCurriculum?.projects?.length > 0 && !(elementsMoved >= 4) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: valuesCurriculum?.textSubTitle }}
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
                          style={{ fontSize: valuesCurriculum?.textCorp }}
                          className="text-TitleGray text-p1920"
                        >
                          {item?.title} | {item?.category}
                        </p>
                        <p
                          style={{ fontSize: valuesCurriculum?.textCorp }}
                          className="text-WeakGray text-p1920"
                        >
                          {item?.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {valuesCurriculum?.formations && !(elementsMoved >= 3) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: valuesCurriculum?.textSubTitle }}
                  >
                    Formação
                  </h1>
                  {valuesCurriculum?.formations?.map((item, index) => (
                    <ul key={`formation-${index}`} className="pb-2">
                      <div className="flex items-center gap-x-4">
                        <li
                          style={{ fontSize: valuesCurriculum?.textCorp }}
                          className="text-TitleGray text-p1920 flex items-center"
                        >
                          • {item?.school}
                        </li>
                      </div>

                      <li
                        style={{ fontSize: valuesCurriculum?.textCorp }}
                        className="text-TitleGray text-p1920"
                      >
                        • {item?.title} | {item?.yearEntry} - {item?.yearLeave}
                      </li>
                    </ul>
                  ))}
                </div>
              )}

              {valuesCurriculum?.languages && !(elementsMoved >= 2) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: valuesCurriculum?.textSubTitle }}
                  >
                    Idiomas
                  </h1>
                  <ul className="pb-2">
                    {valuesCurriculum?.languages?.map((item, index) => (
                      <li
                        style={{ fontSize: valuesCurriculum?.textCorp }}
                        key={index}
                        className="text-TitleGray text-p1920"
                      >
                        • {item?.language} ({item?.level})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {valuesCurriculum?.certifications && !(elementsMoved >= 1) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: valuesCurriculum?.textSubTitle }}
                  >
                    Certificações
                  </h1>
                  <ul className="pb-2 list-disc pl-4">
                    {valuesCurriculum?.certifications?.map((item, index) => (
                      <li
                        style={{ fontSize: valuesCurriculum?.textCorp }}
                        key={index}
                        className="text-TitleGray text-p1920"
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
      )}

      {/* Renderiza a segunda página, se necessário */}
      {isNewPage && currentPage === 2 && (
          <div
            ref={borderRef}
            className={`page-2 h-full ${isLast ? "w-full" : "w-4/12 border-2 border-WeakGray"} flex flex-col flex-wrap relative`}
            // MUDANÇA p-10 para p-5 e div de baixo p-5
          >
            <div
            className={`bg-TitleGray px-12 py-1 absolute left-1/2 -translate-x-1/2 -top-12 rounded-xl flex gap-x-12 text-xl`}
            >
                <button
                    onClick={() => setCurrentPage(1)}
                    className={`text-WeakGray ${currentPage === 1 ? 'text-white' : ''}`}
                >
                    1
                </button>
                <button
                onClick={() => setCurrentPage(2)}
                className={`text-WeakGray ${currentPage === 2 ? 'text-white' : ''}`}
                >
                    2
                </button>
            </div>

            <div className="flex flex-col flex-wrap gap-y-5 p-10">

            
              {valuesCurriculum?.objective && elementsMoved >= 5 && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                      style={{ fontSize: valuesCurriculum?.textSubTitle }}
                    >
                      Objetivo
                    </h1>
                    <p
                      className="text-p1920 text-TitleGray"
                      style={{ fontSize: valuesCurriculum?.textCorp }}
                    >
                      {valuesCurriculum?.objective}
                    </p>
                  </div>
                )}
              {valuesCurriculum?.projects?.length > 0 && elementsMoved >= 4 && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                      style={{ fontSize: valuesCurriculum?.textSubTitle }}
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
                            style={{ fontSize: valuesCurriculum?.textCorp }}
                            className="text-TitleGray text-p1920"
                          >
                            {item?.title} | {item?.category}
                          </p>
                          <p
                            style={{ fontSize: valuesCurriculum?.textCorp }}
                            className="text-WeakGray text-p1920"
                          >
                            {item?.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {valuesCurriculum?.formations && elementsMoved >= 3 && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                      style={{ fontSize: valuesCurriculum?.textSubTitle }}
                    >
                      Formação
                    </h1>
                    {valuesCurriculum?.formations?.map((item, index) => (
                      <ul key={`formation-${index}`} className="pb-2">
                        <div className="flex items-center gap-x-4">
                          <li
                            style={{ fontSize: valuesCurriculum?.textCorp }}
                            className="text-TitleGray text-p1920 flex items-center"
                          >
                            • {item?.school}
                          </li>
                        </div>

                        <li
                          style={{ fontSize: valuesCurriculum?.textCorp }}
                          className="text-TitleGray text-p1920"
                        >
                          • {item?.title} | {item?.yearEntry} - {item?.yearLeave}
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              {valuesCurriculum?.languages && elementsMoved >= 2 && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                      style={{ fontSize: valuesCurriculum?.textSubTitle }}
                    >
                      Idiomas
                    </h1>
                    <ul className="pb-2">
                      {valuesCurriculum?.languages?.map((item, index) => (
                        <li
                          style={{ fontSize: valuesCurriculum?.textCorp }}
                          key={index}
                          className="text-TitleGray text-p1920"
                        >
                          • {item?.language} ({item?.level})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {valuesCurriculum?.certifications && elementsMoved >= 1 &&(
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: valuesCurriculum?.textSubTitle }}
                  >
                    Certificações
                  </h1>
                  <ul className="pb-2 list-disc pl-4">
                    {valuesCurriculum?.certifications?.map((item, index) => (
                      <li
                        style={{ fontSize: valuesCurriculum?.textCorp }}
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
      )}
    </>
  );
}