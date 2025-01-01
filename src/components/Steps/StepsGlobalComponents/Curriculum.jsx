import CurriculumModel1 from "../Curriculums/CurriculumModel1";
import CurriculumModel2 from "../Curriculums/CurriculumModel2";
import { CurriculumContext } from "../../../context/CurriculumContext";
import { useContext } from "react";

export default function Curriculum({ isLast, twoPages }) {
    const { values } = useContext(CurriculumContext);    
    let curriculumModel;
    switch (values?.model) {
        case "1":
            curriculumModel = <CurriculumModel1 isLast={isLast} twoPages={twoPages} />;
            break;
        case "2":
            curriculumModel = <CurriculumModel2 isLast={isLast} twoPages={twoPages} />;
            break;
        default:
            curriculumModel = <CurriculumModel1 isLast={isLast} />;
            break;
    }

    return curriculumModel;
}
