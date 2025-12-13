'use client'

import React from 'react'
import { Produto } from '@/models/interfaces'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function ProdutoDetalhe({id, title, price, description, category, image, rating}: Produto) {
    const router = useRouter()

    const handleNavigation = () => {
        router.push('/produtos')
    }

    return (
     <div>
            <h2>{title}</h2>
            <p>Categoria: {category}</p>
            <Image
                src={"https://deisishop.pythonanywhere.com" + image}
                alt={image}
                width={250}
                height={250}
            />
            <p>Preço: {price} €</p>
            <p>{description}</p>
            <p>Rating: {rating.rate}</p>
            <p>Rating count: {rating.count}</p>
            <button onClick={handleNavigation} className='bg-blue-500 p-2 rounded-2xl'>Voltar atrás</button>
        </div>
  )
}
