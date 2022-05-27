import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner";

interface PrivateRoutesProps {
    JWT: string | null;
    children: ReactNode;
}

export function PrivateRoute({ JWT, children }: PrivateRoutesProps) {
    const navigate = useNavigate()

    useEffect(() => {
        if (JWT === null) {
            navigate('/')
        }
    }, [])
    
    if (JWT === null) {
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