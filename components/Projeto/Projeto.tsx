import Link from "next/link"

interface ProjetoProps {
    nomeProjeto: string;
    url: string;
}

export default function Projeto({nomeProjeto, url}: ProjetoProps) {

    return (
        <>
            <p>O título deste projeto é: {nomeProjeto}. <Link href={url} target="blank" className="text-purple-500 hover:text-blue-600">Clica aqui para ver</Link></p>
        </>
    )
}