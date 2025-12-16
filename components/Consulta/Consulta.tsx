'use client'

import React from 'react'
import { Produto } from '@/models/interfaces'
import Image from 'next/image'

export default function Consulta({ title, price, image }: Produto) {
  
  
    return (
    <div>
        <article>
            <p>{title}</p>
            <Image
                src={"https://deisishop.pythonanywhere.com" + image}
                alt={image}
                width={250}
                height={250}
            />
            <p>{price}</p>
        </article>
    </div>
  )
}
