"use client";

import { useContext } from "react";
import { CurriculumContext } from "@/contexts/CurriculumContext";
import CurriculumModel1 from "./CurriculumModel1";
import CurriculumModel2 from "./CurriculumModel2";

export default function Curriculum({ isLast, twoPages, withPlaceholders }) {
  const { values } = useContext(CurriculumContext);

  switch (values?.model) {
    case "2":
      return (
        <CurriculumModel2
          isLast={isLast}
          twoPages={twoPages}
          withPlaceholders={withPlaceholders}
        />
      );
    case "1":
    default:
      return (
        <CurriculumModel1
          isLast={isLast}
          twoPages={twoPages}
          withPlaceholders={withPlaceholders}
        />
      );
  }
}
