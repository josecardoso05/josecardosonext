'use client'

import React, { use } from 'react'
import useSWR from 'swr';
import { Produto } from '@/models/interfaces';
import ProdutoCard from '@/components/ProdutosCard/ProdutoCard';
import Link from 'next/link';

interface Props {
  params: Promise<{ name: string }>
}

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export default function page({ params }: Props) {

  const { name } = use(params)

  const url = 'https://deisishop.pythonanywhere.com/products/'
  const { data, error, isLoading } = useSWR<Produto[]>(url, fetcher)

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p>A descarregar dados</p>
  }

  if (!data) {
    return <p>Não há produtos</p>
  }



  return (
    <>
      {data.map(produto => {
        if (produto.category === name) {
          return <ProdutoCard
            id={produto.id}
            title={produto.title}
            price={produto.price}
            description={produto.description}
            category={produto.category}
            image={produto.image}
            rating={produto.rating}
          />
        }
      })}
      <Link href="/categorias" className='bg-blue-500 rounded-2xl p-2'>Voltar atrás</Link>
    </>
  )
}
