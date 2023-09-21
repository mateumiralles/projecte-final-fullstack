import { useRouter } from "next/navigation";
export default function UserProfile(props: {setProfile: React.Dispatch<React.SetStateAction<any>>}){

    const {push, refresh} = useRouter();

    const user = JSON.parse(localStorage.getItem('user')!);

    const Logout = () => {
        localStorage.removeItem('user');
        props.setProfile(false);
        push("/mainPage");
        refresh();

    }

    return(
        <div className="absolute right-0 top-full w-96 bg-white flex flex-col rounded border border-black cursor-default">
            <h1 className="mt-5 text-lg font-bold">
                Hola, {user.name}
            </h1>
            <div onClick={() => console.log("HOLAAAAAAAA")} className="p-5 flex flex-row justify-between cursor-pointer">
                <p>Tus pedidos</p>
                <p>Icon</p>
            </div>
            <div className="p-5 flex flex-row justify-between cursor-pointer">
                <p>Tu lista de deseos</p>
                <p>Icon</p>
            </div>
            <div className="p-5 flex flex-row justify-between cursor-pointer">
                <p>Métodos de pago</p>
                <p>Icon</p>
            </div>
            <div className="p-5 flex flex-row justify-between cursor-pointer">
                <p>Direcciones</p>
                <p>Icon</p>
            </div>
            
            <button className="mt-auto p-5 hover:text-red-500 border-t border-black cursor-pointer" onClick={Logout}>CERRAR SESIÓN</button>
        </div>
    )
}