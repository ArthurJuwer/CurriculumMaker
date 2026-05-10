export const VALID_EMAIL_DOMAINS_SHORT = ["gmail.com", "yahoo.com", "outlook.com"];

export const isValidEmail = (value) => {
  if (!value) return false;
  return (
    VALID_EMAIL_DOMAINS_SHORT.some((domain) => value.includes(domain)) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
};

export const isValidPhone = (value) => /^[0-9]{10,15}$/.test(value || "");

export const isValidLinkedin = (value) =>
  Boolean(value?.startsWith("https://www.linkedin.com/in/"));

export const validateStep1 = (values) => {
  return Boolean(
    values?.name &&
      values?.bairro &&
      values?.cidade &&
      values?.estado &&
      isValidLinkedin(values?.linkedin) &&
      isValidEmail(values?.email) &&
      isValidPhone(values?.telefone)
  );
};

export const validateStep2 = (values) => {
  if (!values?.objective) return false;
  const currentYear = new Date().getFullYear();
  const projectsValid = (values?.projects || []).every((project, index) => {
    const titleOk = project?.title && project?.title !== `Projeto ${index + 1}`;
    const categoryOk = project?.category && project?.category !== "Categoria";
    const yearOk =
      project?.year &&
      !isNaN(project?.year) &&
      Number(project?.year) >= 1900 &&
      Number(project?.year) <= currentYear;
    const descriptionOk =
      project?.description && project?.description !== "descreva seu projeto aqui";
    return titleOk && categoryOk && yearOk && descriptionOk;
  });
  return projectsValid;
};

export const validateStep3 = (values) => {
  if (!values?.formations || !values?.languages) return false;
  const formationsValid = values.formations.every(
    (formation) =>
      formation.school !== "escola" &&
      formation.school.trim() !== "" &&
      formation.title !== "titulo" &&
      formation.title.trim() !== "" &&
      formation.yearEntry !== "ano entrada" &&
      formation.yearEntry.trim() !== "" &&
      formation.yearLeave !== "ano saida" &&
      formation.yearLeave.trim() !== ""
  );
  const languagesValid = values.languages.every(
    (language) => language.language !== "Língua" && language.language.trim() !== ""
  );
  return formationsValid && languagesValid;
};
