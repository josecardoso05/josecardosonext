import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import Image from 'next/image';



export default function page() {
  return (
    <div>
      <h2>Tecnologias Exploradas</h2>
      <ul>
        {tecnologias.map((tecnologias, i) => {
          return <li key={i} className='bg-black border-2 rounded-lg px-2'>{tecnologias.title} - {tecnologias.description} Rating: {tecnologias.rating}
            <Image className='pb-2'
              src={"/tecnologias/" + tecnologias.image}
              alt={tecnologias.title}
              width={50}
              height={50}
            />
          </li>
        })}
      </ul>
    </div>
  )
}
