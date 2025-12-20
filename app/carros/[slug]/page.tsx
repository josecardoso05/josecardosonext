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
    <div className='relative w-[750px] h-[500px]'>
      <Image
        src={carro.image}
        alt='a'
        fill
        className="object-cover rounded-2xl"
      />
    </div>
    <h1 className='text-center'>{carro.nome}</h1>
  </>
}
