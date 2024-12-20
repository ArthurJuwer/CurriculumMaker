import CurriculumModel1 from "../Curriculums/CurriculumModel1";
import CurriculumModel2 from "../Curriculums/CurriculumModel2";
import CurriculumModel3 from "../Curriculums/CurriculumModel3";
import { CurriculumContext } from "../../../context/CurriculumContext";
import { useContext } from "react";

export default function Curriculum({ valuesCurriculum, isLast }) {
    const { values } = useContext(CurriculumContext);

    // Com base no valor de `values.model`, renderiza o modelo correspondente
    console.log(values)
    let curriculumModel;
    switch (values?.model) {
        case "1":
            curriculumModel = <CurriculumModel1 valuesCurriculum={valuesCurriculum} isLast={isLast} />;
            break;
        case "2":
            curriculumModel = <CurriculumModel2 valuesCurriculum={valuesCurriculum} isLast={isLast} />;
            break;
        case "3":
            curriculumModel = <CurriculumModel3 valuesCurriculum={valuesCurriculum} isLast={isLast} />;
            break;
        default:
            curriculumModel = <CurriculumModel1 valuesCurriculum={valuesCurriculum} isLast={isLast} />;
            break;
    }

    return curriculumModel;
}
