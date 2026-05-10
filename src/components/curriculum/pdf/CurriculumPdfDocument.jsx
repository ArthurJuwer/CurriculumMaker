import CurriculumPdfModel1 from "./CurriculumPdfModel1";
import CurriculumPdfModel2 from "./CurriculumPdfModel2";

export default function CurriculumPdfDocument({ values }) {
  switch (values?.model) {
    case "2":
      return <CurriculumPdfModel2 values={values} />;
    case "1":
    default:
      return <CurriculumPdfModel1 values={values} />;
  }
}
