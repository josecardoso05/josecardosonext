import { title } from "process";
import ContadorPersonalizado from "../contadorPersonalizado/contadorPersonalizado";

interface TecnologiaDetailsCardProps {
    description: string;
}

export default function TecnologiaDetailsCard({description}: TecnologiaDetailsCardProps) {
    return (
        <>
            {description}
        </>
    )
}