'use client'
import React from 'react'
import { Produto } from '@/models/interfaces'
import Image from 'next/image'
import Link from 'next/link'

export default function ProdutoDetalhe(props: Produto) {
    return (

        <article className='mt-5'>
            <h2>{props.title}</h2>
            <p>{`Preço: ${props.price}€`}</p>
            <Image className='my-3'
                src={props.image}
                alt={props.title}
                width={250}
                height={250}
            />
            <p>{`Sobre este produto: ${props.description}`}</p>
            <p>{`Rating: ${props.rating.rate}`}</p>
            <p>{`Rating count: ${props.rating.count}`}</p>

            <Link href="/produtos" className='bg-blue-500 p-2 rounded-2xl'>Volar atrás</Link>
        </article>
    )
}
