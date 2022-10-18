import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { CustomButton } from "../../FormComponents/CustomButton/CustomButton";

interface UserApprovalButtonsProps {
    approved: string;
    userId: string | undefined;
    updateUser: number;
    setUpdateUser: (value: number) => void;
}

export function UserApprovalButtons({ approved, userId, updateUser, setUpdateUser }: UserApprovalButtonsProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleBlockUser() {
        if (userId != undefined) {
            try {
                setIsLoading(true);
                const aprove = false;
                const response = await api.post('/user/manage/aprove', {
                  aproved: aprove,
                  userId: parseInt(userId as string),
                });

                setUpdateUser(updateUser + 1);

                toast.success("Success blocking user !", {
                    position: toast.POSITION.TOP_RIGHT
                });

                setIsLoading(false);
            } catch (err) {
                toast.error("Error while trying to block user !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        else {
            toast.error("Invalid user", {
            position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    // TODO -> CHECAR A ROTA SE ESTÁ CERTA
    async function handleUnlockUser() {
        if (userId != undefined) {
            try {
                setIsLoading(true);
                const aprove = true;
                const response = await api.post('/user/manage/aprove', {
                  aproved: aprove,
                  userId: parseInt(userId),
                });

                setUpdateUser(updateUser + 1);

                toast.success("Success unlocking an user !", {
                    position: toast.POSITION.TOP_RIGHT
                });

                setIsLoading(false);
            } catch (err) {
                toast.error("Error while trying to unlock an user !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        else {
            toast.error("Invalid user", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    async function handleAcceptUser() {
        if (userId != undefined) {
            try {
                setIsLoading(true);
                const aprove = true;
                const response = await api.post('/user/manage/aprove', {
                  aproved: aprove,
                  userId: parseInt(userId),
                });

                setUpdateUser(updateUser + 1);

                toast.success("Success approving user !", {
                    position: toast.POSITION.TOP_RIGHT
                });

                setIsLoading(false);
            } catch (err) {
                toast.error("Error while trying to approve an user !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        else {
            toast.error("Invalid user", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    if (approved === "PENDING") {
        return (
            <div className="absolute bottom-10 right-6  flex w-full justify-end mt-4 gap-6">
                <CustomButton 
                  functionOnClick={handleBlockUser}
                  aditionalStyleClasses={'bg-[#F93633]'}
                  text={'Bloquear Usuário'}
                  isLoading={isLoading}  
                />

                <CustomButton 
                  functionOnClick={handleAcceptUser}
                  aditionalStyleClasses={'bg-[#29AAD7]'}
                  text={'Aceitar Usuário'}
                  isLoading={isLoading}  
                />
            </div>
        )
    }
    else if (approved === "APROVED") { // TODO -> OLHAR AQUI
        return (
            <CustomButton 
                functionOnClick={handleBlockUser}
                aditionalStyleClasses={'bg-[#F93633]'}
                text={'Bloquear Usuário'}
                isLoading={isLoading}  
            />
          
        )
    }
    else {
        return (
            <CustomButton 
              functionOnClick={handleUnlockUser}
              aditionalStyleClasses={'bg-[#29AAD7]'}
              text={'Desbloquear Usuário'}
              isLoading={isLoading}  
            />
        )
    }
}