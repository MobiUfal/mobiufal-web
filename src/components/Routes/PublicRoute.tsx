import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner";

interface PublicRoutesProps {
    JWT: string | null;
    children: ReactNode;
}

export function PublicRoute({ JWT, children }: PublicRoutesProps) {
    const navigate = useNavigate()

    useEffect(() => {
        if (JWT !== null) {
            navigate('/displacements')
        }
    }, [])

    if (JWT !== null) {
        return (
            <Spinner />
        )
    }
    else {
        return ( 
            <>
                { children }
            </>
        )
    }
}