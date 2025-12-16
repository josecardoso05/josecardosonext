'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '@/models/interfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function ProdutoCard({ id, title, price, description, category, image, rating }: Produto) {
    const [coracao, setCoracao] = useState(false)
    const [consulta, setConsulta] = useState<number[]>([])

    const router = useRouter()


    useEffect(() => {
        const lista = localStorage.getItem('consulta') || '[]'
        setConsulta(consulta)
        const coracao = localStorage.getItem('coracao') || '[]'
        //setCoracao(coracao)
    }, [])


    useEffect(() => {
            localStorage.setItem('lista', JSON.stringify(consulta))
        }, [consulta])


    const handleNavigation = () => {
        router.push('/produtos/' + id)
    }

    function clicaCoracao() {
        if (coracao === false) {
            setCoracao(true)
        } else {
            setCoracao(false)
        }

    }

    function clicaInfo() {

        setConsulta(prev => [...prev, id])
    }

    return (
        <article className='p-5'>
            <h2>{title}</h2>
            <p>Preço: {price} €</p>
            <Image
                src={"https://deisishop.pythonanywhere.com" + image}
                alt={image}
                width={250}
                height={250}
            />
            <button onClick={() => {
                handleNavigation
                clicaInfo
            }} className='bg-blue-500 p-2 rounded-2xl'>+Info</button>

            <button onClick={() => clicaCoracao()}>{coracao ? "❤️" : "🤍"}</button>
        </article>
    )
}