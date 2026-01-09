'use client'
import React from 'react'
import { Produto } from '@/models/interfaces'
import Image from 'next/image'
import Link from 'next/link'

export default function ProdutoCard(props: Produto) {

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
            <Link href={`/produtos/${props.id}`} className='bg-blue-500 p-2 rounded-2xl'>+Info</Link>

        </article>
    )
}