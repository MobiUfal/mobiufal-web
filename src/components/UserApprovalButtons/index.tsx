interface UserApprovalButtonsProps {
    approved: string;
    userId: string | undefined;
}

// TODO -> ADD BUTTONS ONCLICK FUNCTIONS IN PROPS OR DO IT HERE
export function UserApprovalButtons({ approved, userId }: UserApprovalButtonsProps) {
    if (approved === "PENDING") {
        return (
            <div className="absolute bottom-10 right-6  flex w-full justify-end mt-4 gap-6">
                <button className="w-80 bg-[#F93633] rounded-[100px] text-center py-2">Bloquear Usuário</button>
                <button className="w-80 bg-[#29AAD7] rounded-[100px] text-center py-2">Aceitar Usuário</button>
            </div>
        )
    }
    else if (approved === "APROVED") { // TODO -> OLHAR AQUI
        return (
            <div className="absolute bottom-10 right-6  flex w-full justify-end mt-4">
                <button className="w-80 bg-[#F93633] rounded-[100px] text-center py-2">Bloquear Usuário</button>
            </div>
        )
    }
    else {
        return (
            <div className="absolute bottom-10 right-6  flex w-full justify-end mt-4">
                <button className="w-80 bg-[#29AAD7] rounded-[100px] text-center py-1">Desbloquear Usuário</button>
            </div>
        )
    }
}