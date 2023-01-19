import { Login } from "../components/Login";

export function Home() {
  return (
    <div className="pt-10 bg-[#29AAD7] flex flex-col items-center h-screen">
      <div className="mb-20 max-w-[527px] text-center">
        <h1 className="font-black text-[64px] leading-[75px]">MobiUfal</h1>

        <h1 className="font-black text-5xl leading[56px]">Módulo de Gestão</h1>
      </div>

      <Login />
    </div>
  );
}
