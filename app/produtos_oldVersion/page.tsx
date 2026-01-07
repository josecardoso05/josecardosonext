'use client'

import { Produto } from '@/models/interfaces'
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProdutoCard from '@/components/ProdutosCard/ProdutoCard';
import ProdutoCartCard from '@/components/ProdutoCartCard_OldVersion/ProdutoCartCard';
import Consulta from '@/components/Consulta/Consulta';

const fetcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
    }
    return res.json()
}

export default function page() {

    const url = 'https://deisishop.pythonanywhere.com/products/'
    const { data, error, isLoading } = useSWR<Produto[]>(url, fetcher)

    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState<Produto[]>([])
    const [opcao, setOpcao] = useState("")
    const [cart, setCart] = useState<Produto[]>([])
    const [precoTotal, setPrecoTotal] = useState<number>(0)
    const [checkBox, setCheckBox] = useState(false)
    const [cupao, setCupao] = useState("")
    
    const [consulta, setConsulta] = useState<number[]>([])

    useEffect(() => {
        const localCart = localStorage.getItem('cart') || '[]'
        setCart(JSON.parse(localCart))

        const lista = localStorage.getItem('consulta') || '[]'
        setConsulta(JSON.parse(lista))
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))

        localStorage.setItem('consulta', JSON.stringify(consulta))
    }, [cart, consulta])


    useEffect(() => {
        if (!data) return

        const produtoFiltrado = data.filter(produto =>
            produto.title.toLowerCase().includes(search.toLowerCase())
        )

        if (opcao === 'nome') {
            produtoFiltrado.sort((a, b) => a.title.localeCompare(b.title))
        }

        if (opcao === 'precoCrescente') {
            produtoFiltrado.sort((a, b) => a.price - b.price)
        }

        if (opcao === 'precoDrescente') {
            produtoFiltrado.sort((a, b) => b.price - a.price)
        }

        setFilteredData(produtoFiltrado)
    }, [search, data, opcao])


    useEffect(() => {
        const precoFinal = cart.reduce((add, produto) => add + Number(produto.price), 0)
        setPrecoTotal(precoFinal)
    }, [cart])




    function adicionarAoCarrinho(id: number) {
        if (!data) return

        const produto = data.find(p => p.id === id)

        if (!produto) return

        setCart(prev => [...prev, produto])
    }


    function removerDoCarrinho(index: number) {
        setCart(p => p.filter((produto, i) => i !== index))
    }


    function comprar() {
        fetch('https://deisishop.pythonanywhere.com/buy', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                products: cart.map(product => product.id),
                student: checkBox,
                coupon: cupao,
                name: ""
            })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw err
                    })
                }
                return response.json()
            })
            .then((response) => {
                console.log(response)
                setCart([])
                alert("Compra realizada com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao comprar:", err)
                alert(err.message || "Erro ao comprar")
            })
    }


    if (error) {
        return <p>{error.message}</p>
    }

    if (isLoading) {
        return <p>A descarregar dados</p>
    }

    if (!data) {
        return <p>Não há produtos</p>
    }

    return (
        <>
            <h1>Produtos</h1>
            <input className='flex flex-col py-5'
                type="text"
                placeholder='Escreve o que procuras...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select className='flex flex-col pb-5 text-black font-bold'
                value={opcao}
                onChange={(e) => setOpcao(e.target.value)}
            >
                <option value="default">Seleciona um filtro</option>
                <option value="nome">Nome</option>
                <option value="precoCrescente">Preço (Mais baixo)</option>
                <option value="precoDecrescente">Preço (Mais alto)</option>
            </select>

            <Link href="/categorias" className='flex flex-col pb-5'>Ver Categorias</Link>
            {filteredData.map(produto => (
                <div key={produto.id}>
                    <ProdutoCard
                        id={produto.id}
                        title={produto.title}
                        price={produto.price}
                        description={produto.description}
                        category={produto.category}
                        image={produto.image}
                        rating={produto.rating}
                    />
                    <button onClick={() => adicionarAoCarrinho(produto.id)} className='bg-blue-500 p-2 rounded-2xl'>Adicionar ao carrinho</button>
                </div>

            ))}

            <h2 className='flex justify-center pt-20 text-xl'>{cart.length === 0 ? 'Carrinho vazio... Adiciona produtos!' : 'Carrinho'}</h2>
            <p>{cart.length === 0 ? '' : 'Preço total: ' + precoTotal.toFixed(2) + '€'}</p>

            <button
                className='flex flex-col bg-blue-500 rounded-2xl p-2 mb-5'
                onClick={() => comprar()}>
                Comprar
            </button>

            <label>
                Estudante DEISI
                <input
                    type="checkbox"
                    checked={checkBox}
                    onChange={(e) => setCheckBox(e.target.checked)}
                />
            </label>

            <input className='flex flex-col pt-5'
                type='text'
                placeholder='Escreve um cupão...'
                value={cupao}
                onChange={(e) => setCupao(e.target.value)}
            />

            {cart.map((produto, index) => (
                <div key={index}>
                    <ProdutoCartCard
                        id={produto.id}
                        title={produto.title}
                        price={produto.price}
                        description={produto.description}
                        category={produto.category}
                        image={produto.image}
                        rating={produto.rating}
                    />
                    <button onClick={() => removerDoCarrinho(index)} className='flex flex-col p-2 bg-blue-500 rounded-2xl'>Remover do carrinho</button>
                </div>

            ))}

        </>
    )
}