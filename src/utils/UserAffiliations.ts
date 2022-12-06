export const UserAffiliations = {
  STUDENT: "Estudante",
  GOV_WORKER: "Servidor Público",
  TP_WORKER: "Terceirizado"
};

export const getUserAffiliationsKeyByValue = (value: string) => {
  return Object.keys(UserAffiliations)[Object.values(UserAffiliations).indexOf(value)];
}

export const getUserAffiliationsValueByKey = (key: string) => {
  return UserAffiliations[key as keyof typeof UserAffiliations];
}