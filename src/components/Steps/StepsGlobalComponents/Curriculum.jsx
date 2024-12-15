import CurriculumModel1 from "../Curriculums/CurriculumModel1";
import CurriculumModel2 from "../Curriculums/CurriculumModel2";
import CurriculumModel3 from "../Curriculums/CurriculumModel3";
import { CurriculumContext } from "../../../context/CurriculumContext";
import { useContext } from "react";

export default function Curriculum({valuesCurriculum}){

    const { values } = useContext(CurriculumContext)

    console.log(values)

    return(
        <div className="h-full w-4/12 border-2 border-WeakGray p-10">
        {
            valuesCurriculum?.model == 1 
            ? <CurriculumModel1 valuesCurriculum={valuesCurriculum} />
            : 
            valuesCurriculum?.model == 2 
            ? <CurriculumModel2 valuesCurriculum={valuesCurriculum} /> 
            : <CurriculumModel3 valuesCurriculum={valuesCurriculum} /> 
        }
        </div>
    )
}