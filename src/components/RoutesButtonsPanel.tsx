import Boton from "./Boton";
import Image from "next/image";

export default function RouteButtonsPanel() {
    return (
        <div className="panel-btn flex-wrap gap-0">
            {/* <Image
                src="/images/logo.png"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain object-center mr-1"
            /> */}
            <Boton text="Home"   ></Boton>
            <Boton text="Data"   ></Boton>
            <Boton text="Users"  ></Boton>
            <Boton text="Branch" ></Boton>
            <Boton text="Exit" color="red" ></Boton>
        </div >
    );
}