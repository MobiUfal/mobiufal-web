import { toast } from "react-toastify";
import { api } from "../../services/api";

interface UserApprovalButtonsProps {
    approved: string;
    userId: string | undefined;
    updateUser: number;
    setUpdateUser: (value: number) => void;
}

export function UserApprovalButtons({ approved, userId, updateUser, setUpdateUser }: UserApprovalButtonsProps) {
    async function handleBlockUser() {
        if (userId != undefined) {
            try {
                const aprove = false
                const response = await api.post('/user/manage/aprove', {
                  aproved: aprove,
                  userId: parseInt(userId as string),
                })

                setUpdateUser(updateUser + 1)

                toast.success("Success blocking user !", {
                    position: toast.POSITION.TOP_RIGHT
                });
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
                const aprove = true
                const response = await api.post('/user/manage/aprove', {
                  aproved: aprove,
                  userId: parseInt(userId),
                })

                setUpdateUser(updateUser + 1)

                toast.success("Success unlocking an user !", {
                    position: toast.POSITION.TOP_RIGHT
                });
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
                const aprove = true
                const response = await api.post('/user/manage/aprove', {
                  aproved: aprove,
                  userId: parseInt(userId),
                })

                setUpdateUser(updateUser + 1)

                toast.success("Success approving user !", {
                    position: toast.POSITION.TOP_RIGHT
                });
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
                <button className="w-80 bg-[#F93633] rounded-[100px] text-center py-2" onClick={handleBlockUser}>Bloquear Usuário</button>
                <button className="w-80 bg-[#29AAD7] rounded-[100px] text-center py-2" onClick={handleAcceptUser}>Aceitar Usuário</button>
            </div>
        )
    }
    else if (approved === "APROVED") { // TODO -> OLHAR AQUI
        return (
            <div className="absolute bottom-10 right-6  flex w-full justify-end mt-4">
                <button className="w-80 bg-[#F93633] rounded-[100px] text-center py-2" onClick={handleBlockUser}>Bloquear Usuário</button>
            </div>
        )
    }
    else {
        return (
            <div className="absolute bottom-10 right-6  flex w-full justify-end mt-4">
                <button className="w-80 bg-[#29AAD7] rounded-[100px] text-center py-1" onClick={handleUnlockUser}>Desbloquear Usuário</button>
            </div>
        )
    }
}