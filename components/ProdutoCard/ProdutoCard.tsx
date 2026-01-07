'use client'
import React, { useEffect } from 'react'
import { Produto } from '@/models/interfaces'
import Image from 'next/image'
import Link from 'next/link'

export default function ProdutoCard(props: Produto) {

    function comprar() {
        let produtosCart = JSON.parse(localStorage.getItem('cart') || '[]');

        produtosCart.push(props)
        localStorage.setItem('cart', JSON.stringify(produtosCart))
    }

    return (
        <article className='mt-10'>
            <h2>{props.title}</h2>
            <p>{props.price}€</p>
            <Image className='my-3'
                src={"https://deisishop.pythonanywhere.com" + props.image}
                alt={props.title}
                width={250}
                height={250}
            />
            <Link href={`/p/${props.id}`} className='bg-blue-500 p-2 rounded-2xl'>+Info</Link>

            <button onClick={comprar} className='flex bg-blue-500 p-2 mt-3 rounded-2xl'>Comprar</button>

        </article>
    )
}