'use client'

import {Produto} from '@/models/interfaces'
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

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
            <Link href="/categorias">Ver Categorias</Link>
            {data.map(produto => (
                
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