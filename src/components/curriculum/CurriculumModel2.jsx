"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { getEffectiveValues } from "./placeholderData";
import PageNumerator from "./PageNumerator";
import { useStableValue } from "./useStableValue";

const DEFAULT_TITLES = [
  "Objetivo",
  "Experiências",
  "Formação",
  "Idiomas",
  "Certificações",
  "Carga horária",
  "Conclusão",
];

function CurriculumModel2({ values, setValues, isLast, twoPages, withPlaceholders }) {
  const [isNewPage, setIsNewPage] = useState(false);
  const curriculumRef = useRef(null);
  const borderRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [secondPage, setSecondPage] = useState(false);
  const [elementsMoved, setElementsMoved] = useState(0);
  const [titles, setTitles] = useState(values?.titles || DEFAULT_TITLES);

  const effectiveValues = useStableValue(
    useMemo(
      () => getEffectiveValues(values, withPlaceholders),
      [values, withPlaceholders]
    )
  );

  useEffect(() => {
    if (curriculumRef.current && borderRef.current) {
      const curriculumHeight = curriculumRef.current.offsetHeight;
      const borderHeight = borderRef.current.offsetHeight;

      if (curriculumHeight > borderHeight) {
        setIsNewPage(true);
        setSecondPage(true);
        setElementsMoved((prev) => prev + 1);
        setValues((prev) => ({ ...prev, elementsMoved }));
      }
    }
  }, [values, elementsMoved]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, currentPage, secondPage }));
  }, [currentPage, secondPage]);

  useEffect(() => {
    setTitles(values?.titles);
  }, [values?.titles]);

  return (
    <>
      {currentPage === 1 && (
        <div
          className={`page-1 ${
            !isLast ? "border-2 border-BorderInputGray" : ""
          } h-full flex flex-col flex-wrap relative`}
          ref={borderRef}
        >
          <PageNumerator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasSecondPage={isNewPage || twoPages}
          />

          <div className="flex flex-col flex-wrap gap-y-5 p-10" ref={curriculumRef}>
            <div>
              <h1
                className="uppercase text-StrongGray text-title1920 font-bold pb-1 text-center"
                style={{ color: `#${effectiveValues?.color}`, fontSize: effectiveValues?.textTitle || "19pt" }}
              >
                {effectiveValues?.name}
              </h1>
              <ol
                className="text-p1920 flex flex-wrap gap-y-2 gap-x-2 justify-center"
                style={{ fontSize: effectiveValues?.textCorp }}
              >
                <div className="flex gap-x-1">
                  <li>{effectiveValues?.bairro} |</li>
                  <li>{effectiveValues?.cidade},</li>
                  <li>{effectiveValues?.estado} |</li>
                  <li>{effectiveValues?.telefone} |</li>
                </div>
                <li>{effectiveValues?.email}</li>
                {effectiveValues?.linkedin && <li>{effectiveValues?.linkedin}</li>}
              </ol>
            </div>

            <div className="flex flex-col gap-y-2">
              {effectiveValues?.biggestPageReached >= 2 &&
                effectiveValues?.objective &&
                !(elementsMoved >= 5) && (
                  <div>
                    <h1
                      className="uppercase text-StrongGray text-subtitle1920 font-bold mb-2 border-b-2"
                      style={{
                        borderColor: `#${effectiveValues?.color}`,
                        fontSize: effectiveValues?.textSubTitle,
                      }}
                    >
                      {titles?.[0]}
                    </h1>
                    <p
                      className="text-p1920 text-TitleGray"
                      style={{ fontSize: effectiveValues?.textCorp }}
                    >
                      {effectiveValues?.objective}
                    </p>
                  </div>
                )}

              {effectiveValues?.projects?.length > 0 && !(elementsMoved >= 4) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold mb-2 border-b-2"
                    style={{
                      borderColor: `#${effectiveValues?.color}`,
                      fontSize: effectiveValues?.textSubTitle,
                    }}
                  >
                    {titles?.[1]}
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    {effectiveValues?.projects?.map((item, index) => (
                      <div key={`project-${index}`}>
                        <div className="flex gap-x-2 items-center">
                          <p style={{ fontSize: effectiveValues?.textCorp }} className="text-p1920">
                            {item?.year} -
                          </p>
                          <p
                            style={{ fontSize: effectiveValues?.textCorp }}
                            className="text-TitleGray text-p1920"
                          >
                            {item?.title} | {item?.category}
                          </p>
                        </div>
                        <p
                          style={{ fontSize: effectiveValues?.textCorp }}
                          className="text-WeakGray text-p1920"
                        >
                          {item?.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {effectiveValues?.formations && !(elementsMoved >= 3) && (
                <div>
                  <h1
                    className={`${
                      effectiveValues?.formations.length <= 0 && effectiveValues?.biggestPageReached >= 4
                        ? "hidden"
                        : ""
                    } uppercase text-StrongGray text-subtitle1920 font-bold mb-2 border-b-2`}
                    style={{
                      borderColor: `#${effectiveValues?.color}`,
                      fontSize: effectiveValues?.textSubTitle,
                    }}
                  >
                    {titles?.[2]}
                  </h1>
                  {effectiveValues?.formations?.map((item, index) => (
                    <ul key={`formation-${index}`} className="pb-2">
                      <div className="flex items-center gap-x-4">
                        <li
                          style={{ fontSize: effectiveValues?.textCorp }}
                          className="text-TitleGray text-p1920 flex items-center"
                        >
                          • {item?.school}
                        </li>
                      </div>
                      <li
                        style={{ fontSize: effectiveValues?.textCorp }}
                        className="text-TitleGray text-p1920"
                      >
                        • {item?.title} | {item?.yearEntry} - {item?.yearLeave}
                      </li>
                    </ul>
                  ))}
                </div>
              )}

              {effectiveValues?.languages && !(elementsMoved >= 2) && (
                <div>
                  <h1
                    className="uppercase text-StrongGray text-subtitle1920 font-bold mb-2 border-b-2 border-black"
                    style={{
                      borderColor: `#${effectiveValues?.color}`,
                      fontSize: effectiveValues?.textSubTitle,
                    }}
                  >
                    {titles?.[3]}
                  </h1>
                  <ul className="pb-2 flex gap-x-2">
                    {effectiveValues?.languages?.map((item, index) => (
                      <li
                        style={{ fontSize: effectiveValues?.textCorp }}
                        key={index}
                        className="text-TitleGray text-p1920"
                      >
                        • {item?.language} ({item?.level})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {effectiveValues?.certifications && !(elementsMoved >= 1) && (
                <div>
                  <h1
                    className={`${
                      effectiveValues?.certifications.length <= 0 && effectiveValues?.biggestPageReached >= 4
                        ? "hidden"
                        : ""
                    } uppercase text-StrongGray text-subtitle1920 font-bold mb-2 border-b-2 border-black`}
                    style={{
                      borderColor: `#${effectiveValues?.color}`,
                      fontSize: effectiveValues?.textSubTitle,
                    }}
                  >
                    {titles?.[4]}
                  </h1>
                  <ul className="pb-2 list-disc pl-4">
                    {effectiveValues?.certifications?.map((item, index) => (
                      <li
                        style={{ fontSize: effectiveValues?.textCorp }}
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

      {isNewPage && currentPage === 2 && (
        <div
          ref={borderRef}
          className={`page-2 ${
            !isLast ? "border-2 border-BorderInputGray" : ""
          } h-full flex flex-col flex-wrap relative`}
        >
          <PageNumerator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasSecondPage={isNewPage || twoPages}
          />

          <div className="flex flex-col flex-wrap gap-y-5 p-10">
            {effectiveValues?.objective && elementsMoved >= 5 && (
              <div>
                <h1
                  className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                  style={{ fontSize: effectiveValues?.textSubTitle }}
                >
                  {titles?.[0]}
                </h1>
                <p
                  className="text-p1920 text-TitleGray"
                  style={{ fontSize: effectiveValues?.textCorp }}
                >
                  {effectiveValues?.objective}
                </p>
              </div>
            )}
            {effectiveValues?.projects?.length > 0 && elementsMoved >= 4 && (
              <div>
                <h1
                  className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2"
                  style={{ fontSize: effectiveValues?.textSubTitle }}
                >
                  {titles?.[1]}
                </h1>
                <div className="flex flex-col gap-y-2">
                  {effectiveValues?.projects?.map((item, index) => (
                    <div key={`project-${index}`}>
                      <p
                        style={{ color: `#${effectiveValues?.color}`, fontSize: effectiveValues?.textCorp }}
                        className="text-p1920"
                      >
                        {item?.year}
                      </p>
                      <p
                        style={{ fontSize: effectiveValues?.textCorp }}
                        className="text-TitleGray text-p1920"
                      >
                        {item?.title} | {item?.category}
                      </p>
                      <p
                        style={{ fontSize: effectiveValues?.textCorp }}
                        className="text-WeakGray text-p1920"
                      >
                        {item?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {effectiveValues?.formations && elementsMoved >= 3 && (
              <div>
                <h1
                  className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2 border-b-2 border-black mb-2"
                  style={{
                    borderColor: `#${effectiveValues?.color}`,
                    fontSize: effectiveValues?.textSubTitle,
                  }}
                >
                  {titles?.[2]}
                </h1>
                {effectiveValues?.formations?.map((item, index) => (
                  <ul key={`formation-${index}`} className="pb-2">
                    <div className="flex items-center gap-x-4">
                      <li
                        style={{ fontSize: effectiveValues?.textCorp }}
                        className="text-TitleGray text-p1920 flex items-center"
                      >
                        • {item?.school}
                      </li>
                    </div>
                    <li
                      style={{ fontSize: effectiveValues?.textCorp }}
                      className="text-TitleGray text-p1920"
                    >
                      • {item?.title} | {item?.yearEntry} - {item?.yearLeave}
                    </li>
                  </ul>
                ))}
              </div>
            )}
            {effectiveValues?.languages && elementsMoved >= 2 && (
              <div>
                <h1
                  className="uppercase text-StrongGray text-subtitle1920 font-bold pb-2 border-b-2 border-black mb-2"
                  style={{
                    borderColor: `#${effectiveValues?.color}`,
                    fontSize: effectiveValues?.textSubTitle,
                  }}
                >
                  {titles?.[3]}
                </h1>
                <ul className="pb-2">
                  {effectiveValues?.languages?.map((item, index) => (
                    <li
                      style={{ fontSize: effectiveValues?.textCorp }}
                      key={index}
                      className="text-TitleGray text-p1920"
                    >
                      • {item?.language} ({item?.level})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {effectiveValues?.certifications && elementsMoved >= 1 && (
              <div>
                <h1
                  className="uppercase text-StrongGray text-subtitle1920 font-bold mb-2 border-b-2 border-black"
                  style={{
                    borderColor: `#${effectiveValues?.color}`,
                    fontSize: effectiveValues?.textSubTitle,
                  }}
                >
                  {titles?.[4]}
                </h1>
                <ul className="pb-2 list-disc pl-4">
                  {effectiveValues?.certifications?.map((item, index) => (
                    <li
                      style={{ fontSize: effectiveValues?.textCorp }}
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

export default memo(CurriculumModel2, (prev, next) => {
  return (
    prev.isLast === next.isLast &&
    prev.twoPages === next.twoPages &&
    prev.withPlaceholders === next.withPlaceholders &&
    prev.setValues === next.setValues &&
    JSON.stringify(prev.values) === JSON.stringify(next.values)
  );
});
