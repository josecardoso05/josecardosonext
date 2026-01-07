'use client'
import React from 'react'
import useSWR from 'swr'
import { Produto } from '@/models/interfaces';
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard';
import { useState, useEffect } from 'react';


const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erro: ${res.status} ${res.statusText}`);
    }

    return res.json();
}


export default function page() {

    const url_api = 'https://deisishop.pythonanywhere.com/products';

    const { data, error, isLoading } = useSWR<Produto[]>(url_api, fetcher);

    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("");
    const [filteredData, setFilteredData] = useState<Produto[]>([]);

    const [cart, setCart] = useState<Produto[]>([]);


    useEffect(() => {

        const produtosCart = localStorage.getItem('cart') || '[]';
        setCart(JSON.parse(produtosCart))

    },[])

    useEffect(() => {
        if (!data) return;

        const produtosFiltrados = data.filter(p => 
            p.title.toLowerCase().includes(search.toLowerCase())
        );

        if (select === 'nome') {
            produtosFiltrados.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (select === 'precoCrescente') {
            produtosFiltrados.sort((a, b) => a.price - b.price);
        }

        if (select === 'precoDecrescente') {
            produtosFiltrados.sort((a, b) => b.price - a.price);
        }

        setFilteredData(produtosFiltrados);

    },[data, search, select])

    

    
    if (error) return <p>{error.message}</p>;
    if (isLoading) return <p>Carregando...</p>;
    if (!data) return <p>Utilizador inexistente</p>;

    return (
        <>
            <input type="text" placeholder='O que procuras...' className='text-black font-bold'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select className='text-black font-bold pl-5'
                value={select}
                onChange={(e) => setSelect(e.target.value)}
            >
                <option value="default">Escolhe um filtro</option>
                <option value="nome">Nome</option>
                <option value="precoCrescente">Preço Crescente</option>
                <option value="precoDecrescente">Preço Decrescente</option>
            </select>

            {filteredData.map(p => (
                <ProdutoCard key={p.id}
                    id={p.id}
                    title={p.title}
                    price={p.price}
                    description={p.description}
                    category={p.category}
                    image={p.image}
                    rating={p.rating}
                />
            ))}


            <h1 className='pt-15'>Carrinho</h1>

            {cart.map((p, index) => (
                <ProdutoCard key={index}
                    id={p.id}
                    title={p.title}
                    price={p.price}
                    description={p.description}
                    category={p.category}
                    image={p.image}
                    rating={p.rating}
                />
                
            ))}

        </>

    )
}
