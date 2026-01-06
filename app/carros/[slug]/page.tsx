'use client'

import React from 'react'
import CarroCard from '@/components/CarroCard/CarroCard'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import CarroJSON from '@/public/data/carros.json'



export default function page() {
  const params = useParams()

  const cars = CarroJSON

  const carro = cars.find(carro => carro.slug === params.slug)

  if (!carro) {
    return <div>Carro não encontrado</div>
  }

   return <>
    <div
  className="
    relative aspect-[4/2]
    w-screen sm:w-full
    left-1/2 sm:left-0
    -ml-[50vw] sm:ml-0
    -mr-[50vw] sm:mr-0
    sm:aspect-[16/9]
  "
>
  <Image
    src={carro.image}
    alt="Imagem do carro"
    fill
    className="object-cover"
    priority
  />
</div>

    <h1 className="text-center">{carro.nome}</h1>
  </>
}
