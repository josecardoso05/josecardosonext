'use client'

import CarroCard from '@/components/CarroCard/CarroCard'
import CarroJSON from '@/public/data/carros.json'

export default function Page() {
  const cars = CarroJSON

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
      "
    >
      {cars.map((car, index) => (
        <CarroCard
          key={index}
          name={car.nome}
          image={car.image}
          slug={car.slug}
        />
      ))}
    </div>
  )
}
