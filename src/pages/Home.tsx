import { Login } from "../components/Login";

export function Home() {
    return (
        
                
            
            <div className="w-100 pt-[76px] pb-[149px] bg-[#29AAD7] flex flex-col items-center relative">
                <div className="mb-[205px] max-w-[527px] text-center">
                    <h1 className="font-black text-[64px] leading-[75px]">
                        MobiUfal
                    </h1>
        
                    <h1 className="font-black text-5xl leading[56px]">
                        Módulo de Gestão
                    </h1>
                </div>

                <Login />
            </div>
            
    )
}