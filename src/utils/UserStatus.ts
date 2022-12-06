export const UserStatus = {
  // update aproved word in backend (change aproved to approved in backend api route return)
  APROVED: "Aprovado",
  PENDING: "Aguardando Aprovação",
  BLOCKED: "Bloqueado",
};

export const getUserStatusKeyByValue = (value: string) => {
  return Object.keys(UserStatus)[Object.values(UserStatus).indexOf(value)];
}

export const getUserStatusValueByKey = (key: string) => {
  return UserStatus[key as keyof typeof UserStatus];
}