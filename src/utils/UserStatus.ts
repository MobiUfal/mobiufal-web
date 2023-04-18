export const UserStatus = {
  // update aproved word in backend (change aproved to approved in backend api route return)
  APROVED: "Aprovado/a",
  PENDING: "Aguardando Aprovação",
  BLOCKED: "Bloqueado/a",
};

export const getUserStatusKeyByValue = (value: string) => {
  return Object.keys(UserStatus)[Object.values(UserStatus).indexOf(value)];
}

export const getUserStatusValueByKey = (key: string) => {
  return UserStatus[key as keyof typeof UserStatus];
}