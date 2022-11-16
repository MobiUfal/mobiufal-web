export const LocomotionStatus = {
  PENDING: "Pendente",
  ACCEPTED: "Aceito",
  COMPLETED: "Completo",
  CANCELED: "Cancelado",
};

export const getLocomotionStatusKeyByValue = (value: string) => {
  return Object.keys(LocomotionStatus)[Object.values(LocomotionStatus).indexOf(value)];
}

export const getLocomotionStatusValueByKey = (key: string) => {
  return LocomotionStatus[key as keyof typeof LocomotionStatus];
}