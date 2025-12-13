'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '@/models/interfaces';
import { useRouter } from 'next/navigation';

export default function ProdutoCartCard({ id, title, price, description, category, image, rating }: Produto) {

    const router = useRouter()

    const handleNavigation = () => {
        router.push('/produtos/' + id)
    }

    const handleClick = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')

        currentCart.pop({ id, title, price, description, category, image, rating })
        localStorage.setItem('cart', JSON.stringify(currentCart))
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
            <button onClick={handleNavigation} className='bg-blue-500 p-2 rounded-2xl'>+Info</button>
            <button onClick={handleClick}>Remover do carrinho</button>
        </article>
    )
}