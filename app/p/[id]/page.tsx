'use client'
import React from 'react'
import { Produto } from '@/models/interfaces';
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import ProdutoDetalhe from '@/components/ProdutoDetalhe/ProdutoDetalhe';

const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erro: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export default function page() {

    const params = useParams();
    const id = Number(params.id);

    const url_api = 'https://deisishop.pythonanywhere.com/products/' + id;

    const { data, error, isLoading } = useSWR<Produto>(url_api, fetcher);




    if (error) return <p>{error.message}</p>;
    if (isLoading) return <p>Carregando...</p>;
    if (!data) return <p>Utilizador inexistente</p>;

    return (
        <ProdutoDetalhe
            id={data.id}
            title={data.title}
            price={data.price}
            description={data.description}
            category={data.category}
            image={data.image}
            rating={data.rating}
        />
    )
}
