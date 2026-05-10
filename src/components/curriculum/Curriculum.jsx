"use client";

import { memo, useContext } from "react";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import CurriculumModel1 from "./CurriculumModel1";
import CurriculumModel2 from "./CurriculumModel2";

function Curriculum({ isLast, twoPages, withPlaceholders }) {
  const { values, setValues } = useContext(CurriculumContext);
  const props = { values, setValues, isLast, twoPages, withPlaceholders };

  switch (values?.model) {
    case "2":
      return <CurriculumModel2 {...props} />;
    case "1":
    default:
      return <CurriculumModel1 {...props} />;
  }
}

export default memo(Curriculum);
