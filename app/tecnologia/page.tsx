import tecnologias from "@/app/data/tecnologias.json"
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard/TecnologiaDetailsCard";
import Link from "next/link";

interface TecnologiaProps {
    indice: number;
}

export default function TecnologiaPage({ indice = 1 }: TecnologiaProps) {
    const tecnologia = tecnologias[indice]

    return (
        <div>
            <p>
                <TecnologiaDetailsCard
                    description={tecnologia.description}
                />
            </p>
            <Link href="/tecnologias">
                <button style={{ padding: "10px 20px", background: "blue", color: "white", borderRadius: "8px" }}>
                    Voltar
                </button>
            </Link>
        </div>
    )
}