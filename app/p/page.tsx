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
    const [precoTotal, setPrecoTotal] = useState(0);


    useEffect(() => {

        const produtosCart = localStorage.getItem('cart') || '[]';
        setCart(JSON.parse(produtosCart))

    }, [])


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


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

    }, [data, search, select])


    useEffect(() => {

        const precoFinal = cart.reduce((acc, p) => acc + Number(p.price), 0);
        setPrecoTotal(precoFinal);
    }, [cart])



    function adicionarProduto(id: number) {

        if (!data) return;

        const produto = data.find(p => p.id === id);

        if (!produto) return;

        setCart(prev => [...prev, produto]);
    }


    function removerProduto(index: number) {
        setCart(cart.filter((p, i) => i !== index));
    }



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
                <div key={p.id}>
                    <ProdutoCard
                        id={p.id}
                        title={p.title}
                        price={p.price}
                        description={p.description}
                        category={p.category}
                        image={p.image}
                        rating={p.rating}
                    />
                    <button className='flex flex-col bg-blue-500 rounded-2xl p-2 mb-5' onClick={() => adicionarProduto(p.id)}
                    >Adicionar ao carrinho</button>
                </div>

            ))}


            <h2 className='pt-5 text-xl'>{cart.length === 0 ? 'Carrinho vazio... Adiciona produtos!' : 'Carrinho'}</h2>

            {cart.map((p, index) => (
                <div key={index}>
                    <ProdutoCard
                        id={p.id}
                        title={p.title}
                        price={p.price}
                        description={p.description}
                        category={p.category}
                        image={p.image}
                        rating={p.rating}
                    />
                    <button className='flex flex-col p-2 bg-red-500 rounded-2xl'
                        onClick={() => removerProduto(index)}>Remover produto</button>
                </div>
            ))}

            <p>{cart.length === 0 ? '' : 'Preço total: ' + precoTotal.toFixed(2) + '€'}</p>

        </>

    )
}
