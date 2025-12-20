'use client'

import CarroCard from '@/components/CarroCard/CarroCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CarroJSON from '@/public/data/carros.json'




export default function Page() {
    const cars = CarroJSON
    
    return (
        <div className='grid grid-cols-3 gap-4'>
            {cars.map((car, index) => (
                <CarroCard key={index}
                    name={car.nome}
                    image={car.image}
                    slug={car.slug}
                />
            ))}
        </div>
    )
}
