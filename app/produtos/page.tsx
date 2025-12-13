'use client'

import {Produto} from '@/models/interfaces'
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const fetcher = async (url: string) => {
    const res = await fetch(url)

    if(!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
    }
    return  res.json()
}

export default function page() {

    const url = 'https://deisishop.pythonanywhere.com/products/'
    const {data, error, isLoading} = useSWR<Produto[]>(url, fetcher)

    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState<Produto[]>([])

    useEffect(() => {
        if (!data) {
            return
        }
        const produtoFiltrado = data.filter(produto =>
            produto.title.toLowerCase().includes(search.toLowerCase())
        )
        setFilteredData(produtoFiltrado)
    }, [search, data])

    if (error) {
        return <p>{error.message}</p>
    }

    if (isLoading) {
        return <p>A descarregar dados</p>
    }

    if (!data) {
        return <p>Não há produtos</p>
    }
    
    return(
        <>
            <h1>Produtos</h1>
            <input className='flex flex-col' 
            type="text"
            placeholder='Escreve o que procuras...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

            <Link href="/categorias">Ver Categorias</Link>
            {filteredData.map(produto => (
                <article className='p-5' key={produto.id}>
                    <h2>{produto.title}</h2>
                    <Image
                    src={"https://deisishop.pythonanywhere.com" + produto.image}
                    alt='a'
                    width={250}
                    height={250}
                    />
                    <Link href={"/produtos/" + produto.id}>Clica para ver o produto</Link>
                </article>
            ))}
        </>
    )
}