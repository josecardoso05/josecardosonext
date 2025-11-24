import tecnologias from "@/app/data/tecnologias.json"
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard/TecnologiaDetailsCard";

interface TecnologiaProps {
    indice: number;
}

export default function TecnologiaPage({indice = 1}: TecnologiaProps) {
    const tecnologia = tecnologias[indice]

    return (
        <div>
            <p>
                <TecnologiaDetailsCard
                    description={tecnologia.description}
                />
            </p>
        </div>
    )
}