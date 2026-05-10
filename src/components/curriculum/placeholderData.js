export const PLACEHOLDERS = {
  name: "Seu Nome Completo",
  bairro: "Centro",
  cidade: "Sua Cidade",
  estado: "UF",
  telefone: "(00) 00000-0000",
  email: "seuemail@exemplo.com",
  linkedin: "linkedin.com/in/seuperfil",
  objective:
    "Descreva aqui seu objetivo profissional, suas metas e o que busca alcançar na área desejada com sua trajetória e habilidades.",
  projects: [
    {
      year: "2024",
      title: "Projeto Exemplo",
      category: "Categoria",
      description:
        "Descreva brevemente este projeto ou experiência e o impacto que gerou.",
    },
    {
      year: "2023",
      title: "Outra Experiência",
      category: "Categoria",
      description:
        "Outra experiência relevante para o cargo, destacando suas contribuições.",
    },
  ],
  formations: [
    {
      school: "Universidade Exemplo",
      title: "Curso ou Formação",
      yearEntry: "2020",
      yearLeave: "2024",
    },
  ],
  languages: [
    { language: "Português", level: "NATIVO" },
    { language: "Inglês", level: "B2" },
  ],
  certifications: [
    { name: "Certificação Exemplo", workload: "40h", conclusion: "01/2024" },
  ],
};

const DEFAULT_LABELS = {
  name: "Nome Completo",
  bairro: "Bairro",
  cidade: "Cidade",
  estado: "Estado",
  telefone: "Telefone",
  email: "Email",
  linkedin: "",
  objective: "texto do objetivo.",
};

const isFilled = (val, key) => {
  if (val === undefined || val === null) return false;
  if (typeof val !== "string") return true;
  const trimmed = val.trim();
  if (!trimmed) return false;
  return trimmed !== DEFAULT_LABELS[key];
};

const isRealProject = (p) =>
  p?.title && !/^Projeto \d+$/.test(p.title) && p.title.trim() !== "";
const isRealFormation = (f) =>
  f?.school && f.school !== "escola" && f.school.trim() !== "";
const isRealLanguage = (l) =>
  l?.language && l.language !== "Língua" && l.language.trim() !== "";

export function getEffectiveValues(values, withPlaceholders) {
  if (!withPlaceholders) return values;

  const merged = { ...(values || {}) };

  for (const key of Object.keys(DEFAULT_LABELS)) {
    if (!isFilled(merged[key], key)) merged[key] = PLACEHOLDERS[key];
  }

  const realProjects = merged.projects?.filter(isRealProject);
  if (!realProjects || realProjects.length === 0) {
    merged.projects = PLACEHOLDERS.projects;
  }

  const realFormations = merged.formations?.filter(isRealFormation);
  if (!realFormations || realFormations.length === 0) {
    merged.formations = PLACEHOLDERS.formations;
  }

  const realLanguages = merged.languages?.filter(isRealLanguage);
  if (!realLanguages || realLanguages.length === 0) {
    merged.languages = PLACEHOLDERS.languages;
  }

  if (!merged.certifications || merged.certifications.length === 0) {
    merged.certifications = PLACEHOLDERS.certifications;
  }

  merged.biggestPageReached = Math.max(merged.biggestPageReached || 0, 4);

  return merged;
}
