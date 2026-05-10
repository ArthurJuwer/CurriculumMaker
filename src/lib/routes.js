export const ROUTES = {
  home: "/",
  selectMethod: "/steps/select-method",
  models: "/steps/models",
  header: "/steps/header",
  presentation: "/steps/presentation",
  formation: "/steps/formation",
  finalization: "/steps/finalization",
};

export const STEP_NAVIGATION_BACK = {
  [ROUTES.selectMethod]: ROUTES.home,
  [ROUTES.models]: ROUTES.home,
  [ROUTES.header]: ROUTES.models,
  [ROUTES.presentation]: ROUTES.header,
  [ROUTES.formation]: ROUTES.presentation,
  [ROUTES.finalization]: ROUTES.formation,
};

export const STEPS = [
  { step: 1, label: "Cabeçalho", link: ROUTES.header },
  { step: 2, label: "Apresentação", link: ROUTES.presentation },
  { step: 3, label: "Competências", link: ROUTES.formation },
  { step: 4, label: "Finalização", link: ROUTES.finalization },
];
