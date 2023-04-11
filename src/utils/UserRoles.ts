export const UserRoles = {
  VOLUNTARY: "Voluntário/a",
  REQUESTER: "Solicitante",
  ADMIN: "Administrador",
};

export const getUserRolesKeyByValue = (value: string) => {
  return Object.keys(UserRoles)[Object.values(UserRoles).indexOf(value)];
}

export const getUserRolesValueByKey = (key: string) => {
  return UserRoles[key as keyof typeof UserRoles];
}