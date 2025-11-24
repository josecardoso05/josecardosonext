import Link from "next/link"
import Projeto from "@/components/Projeto/Projeto"

export default function DescricaoProjetos() {

    return (
        <>
            <h2>Os meus projetos!</h2>
            <Link href="https://josecardoso05.github.io/" target="_blank" className="text-purple-500 hover:text-blue-600">Clica aqui para ver os meus projetos!</Link>
            <Projeto
                nomeProjeto="Loja"
                url="https://josecardoso05.github.io/lab7/index.html"
            />
            <ul>
                <li>Jogo de Tabuleiro: LP2</li>
                <li>Jogo de Memória com Arduino: AAC</li>
                <li>Site sobre a cidade Oslo: DIW</li>
                <li>Site de uma loja usando JS: DIW</li>
            </ul>
            
        </>
    )
}