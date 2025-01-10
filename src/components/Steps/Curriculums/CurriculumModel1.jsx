import { useContext, useEffect, useRef, useState } from "react";
import { CurriculumContext } from "../../../context/CurriculumContext";

export default function CurriculumModel1({ isLast, twoPages }) {
  const [isNewPage, setIsNewPage] = useState(false); 
  const curriculumRef = useRef(null); 
  const borderRef = useRef(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsMoved, setElementsMoved] = useState(0);
  const [secondPage, setSecondPage] = useState(false);
  const {values, setValues} = useContext(CurriculumContext)
  const [titles, setTitles] = useState(values?.titles || ['Objetivo', 'Experiências', 'Formação', 'Idiomas', 'Certificações', 'Carga horária', 'Conclusão'])

  


  useEffect(() => {
    if (curriculumRef.current && borderRef.current) {
        let curriculumHeight = curriculumRef.current.offsetHeight;
        let borderHeight = borderRef.current.offsetHeight;

      

      if (curriculumHeight > borderHeight) {
        setIsNewPage(true);
        setSecondPage(true)
        setElementsMoved(prevState => prevState + 1)
        
          setValues((prevValues) => ({
            ...prevValues,
            elementsMoved,
          }));
        
      } 
    }
  }, [values, elementsMoved]);

  useEffect(()=>{
    setValues((prevValues) => ({
      ...prevValues,
      currentPage,
      secondPage,
    }));
  }, [currentPage, secondPage])

  useEffect(()=>{
    setValues((prevValues) => ({
      ...prevValues,
      titles,
    }));
  }, [])
  
  useEffect(()=>{
    setTitles(values?.titles)
  }, [values?.titles])


  return (
    <>
    

      {currentPage === 1 && (
        <div
          // FOI REMOVIDO O TAMANHO H-FULL OLHAR O HEADER COMO SE FAZ
          className={`page-1 border-2 border-WeakGray h-full flex flex-col flex-wrap relative`}
          ref={borderRef}
        >

        <div
            className={`bg-TitleGray 2xl:px-12 px-6 py-1 absolute left-1/2 -translate-x-1/2 2xl:-top-12 -top-5 rounded-xl flex gap-x-12 text-xl`}
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
        
          <div className="flex flex-col flex-wrap gap-y-3 p-10 w-full overflow-x-visible" ref={curriculumRef} >
            <div>
              
              <h1
                className="uppercase text-StrongGray text-title1920 font-bold pb-1"
                style={{ fontSize: values?.textTitle || "19pt" }}
              >
                {values?.name}
              </h1>
              <ol
                className="text-p1920 flex flex-wrap gap-y-2 gap-x-2"
                style={{ color: `#${values?.color}`, fontSize: values?.textCorp }}
              >
                <div className="flex gap-x-1">
                  <li>{values?.bairro} |</li>
                  <li>{values?.cidade},</li>
                  <li>{values?.estado} |</li>
                  <li>{values?.telefone} |</li>
                </div>
                <li>{values?.email}</li>
                <li>{values?.linkedin}</li>
              </ol>
            </div>

            <div className="flex flex-col gap-y-2">
              {values?.biggestPageReached >= 2 && values?.objective && !(elementsMoved >= 5) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: values?.textSubTitle }}
                  >
                    {titles?.[0]}
                  </h1>
                  <p
                    className="text-p1920 text-TitleGray"
                    style={{ fontSize: values?.textCorp }}
                  >
                    {values?.objective}
                  </p>
                </div>
              )}

              {values?.projects?.length > 0 && !(elementsMoved >= 4) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: values?.textSubTitle }}
                  >
                    {titles?.[1]}
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    {values?.projects?.map((item, index) => (
                      <div key={`project-${index}`}>
                        <p
                          style={{ color: `#${values?.color}`, fontSize: values?.textCorp }}
                          className="text-p1920"
                        >
                          {item?.year}
                        </p>
                        <p
                          style={{ fontSize: values?.textCorp }}
                          className="text-TitleGray text-p1920"
                        >
                          {item?.title} | {item?.category}
                        </p>
                        <p
                          style={{ fontSize: values?.textCorp }}
                          className="text-WeakGray text-p1920"
                        >
                          {item?.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {values?.formations && !(elementsMoved >= 3) && (
                <div>
                  <h1
                    className={`${values?.formations.length <= 0 && values?.biggestPageReached >= 4 ? 'hidden' : ''} uppercase text-StrongGray text-subtitle1920 font-bold pb-2`}
                    style={{ fontSize: values?.textSubTitle }}
                  >
                    {titles?.[2]}
                  </h1>
                  {values?.formations?.map((item, index) => (
                    <ul key={`formation-${index}`} className="pb-2">
                      <div className="flex items-center gap-x-4">
                        <li
                          style={{ fontSize: values?.textCorp }}
                          className="text-TitleGray text-p1920 flex items-center"
                        >
                          • {item?.school}
                        </li>
                      </div>

                      <li
                        style={{ fontSize: values?.textCorp }}
                        className="text-TitleGray text-p1920"
                      >
                        • {item?.title} | {item?.yearEntry} - {item?.yearLeave}
                      </li>
                    </ul>
                  ))}
                </div>
              )}

              {values?.languages && !(elementsMoved >= 2) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: values?.textSubTitle }}
                  >
                    {titles?.[3]}
                  </h1>
                  <ul className="pb-2">
                    {values?.languages?.map((item, index) => (
                      <li
                        style={{ fontSize: values?.textCorp }}
                        key={index}
                        className="text-TitleGray text-p1920"
                      >
                        • {item?.language} ({item?.level})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {values?.certifications && !(elementsMoved >= 1) && (
                <div>
                  <h1
                    className={`${values?.certifications.length <= 0 && values?.biggestPageReached >= 4 ? 'hidden' : ''} uppercase text-StrongGray text-subtitle1920 font-bold pb-2`}
                    style={{ fontSize: values?.textSubTitle }}
                  >
                    {titles?.[4]}
                  </h1>
                  <ul className="pb-2 list-disc pl-4">
                    {values?.certifications?.map((item, index) => (
                      <li
                        style={{ fontSize: values?.textCorp }}
                        key={index}
                        className="text-TitleGray text-p1920"
                      >
                        {item?.name} <br />
                        {titles?.[5]} {item?.workload}. ({titles?.[6]} {item?.conclusion})
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
            className={`page-2 h-full "w-full border-2 border-WeakGray flex flex-col flex-wrap relative`}
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

            
              {values?.objective && elementsMoved >= 5 && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                      style={{ fontSize: values?.textSubTitle }}
                    >
                      {titles?.[0]}
                    </h1>
                    <p
                      className="text-p1920 text-TitleGray"
                      style={{ fontSize: values?.textCorp }}
                    >
                      {values?.objective}
                    </p>
                  </div>
                )}
              {values?.projects?.length > 0 && elementsMoved >= 4 && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                      style={{ fontSize: values?.textSubTitle }}
                    >
                     {titles?.[1]}
                    </h1>
                    <div className="flex flex-col gap-y-2">
                      {values?.projects?.map((item, index) => (
                        <div key={`project-${index}`}>
                          <p
                            style={{ color: `#${values?.color}`, fontSize: values?.textCorp }}
                            className="text-p1920"
                          >
                            {item?.year}
                          </p>
                          <p
                            style={{ fontSize: values?.textCorp }}
                            className="text-TitleGray text-p1920"
                          >
                            {item?.title} | {item?.category}
                          </p>
                          <p
                            style={{ fontSize: values?.textCorp }}
                            className="text-WeakGray text-p1920"
                          >
                            {item?.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {values?.formations && elementsMoved >= 3 && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                      style={{ fontSize: values?.textSubTitle }}
                    >
                      {titles?.[2]}
                    </h1>
                    {values?.formations?.map((item, index) => (
                      <ul key={`formation-${index}`} className="pb-2">
                        <div className="flex items-center gap-x-4">
                          <li
                            style={{ fontSize: values?.textCorp }}
                            className="text-TitleGray text-p1920 flex items-center"
                          >
                            • {item?.school}
                          </li>
                        </div>

                        <li
                          style={{ fontSize: values?.textCorp }}
                          className="text-TitleGray text-p1920"
                        >
                          • {item?.title} | {item?.yearEntry} - {item?.yearLeave}
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              {values?.languages && elementsMoved >= 2 && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                      style={{ fontSize: values?.textSubTitle }}
                    >
                      {titles?.[3]}
                    </h1>
                    <ul className="pb-2">
                      {values?.languages?.map((item, index) => (
                        <li
                          style={{ fontSize: values?.textCorp }}
                          key={index}
                          className="text-TitleGray text-p1920"
                        >
                          • {item?.language} ({item?.level})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {values?.certifications && elementsMoved >= 1 &&(
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                    style={{ fontSize: values?.textSubTitle }}
                  >
                    {titles?.[4]}
                  </h1>
                  <ul className="pb-2 list-disc pl-4">
                    {values?.certifications?.map((item, index) => (
                      <li
                        style={{ fontSize: values?.textCorp }}
                        key={index}
                        className="text-TitleGray text-p1920"
                      >
                        {item?.name} <br />
                        {titles?.[5]} {item?.workload}h. ({titles?.[6]} {item?.conclusion})
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