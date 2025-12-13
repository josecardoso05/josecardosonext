'use client'

import { Categoria, Produto } from '@/models/interfaces'
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

const fetcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
    }
    return res.json()
}

export default function page() {

    const url = 'https://deisishop.pythonanywhere.com/categories/'
    const { data, error, isLoading } = useSWR<Categoria[]>(url, fetcher)

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
            <h1>Categorias</h1>
            <ul className='pb-6'>
                {data.map(categoria => (

                    <Link href={"/categorias/" + categoria.name} className='hover:text-blue-600'>
                        <li>{categoria.name}</li>
                    </Link>

                ))}
            </ul>
            <Link href="/produtos" className='bg-blue-500 rounded-2xl p-2'>Voltar atrás</Link>
        </>
    )
}