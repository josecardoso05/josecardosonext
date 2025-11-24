import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard';



export default function page() {
  return (
    <div>
      <h2>Tecnologias Exploradas</h2>

      <ul>
        {tecnologias.map((tecnologia, i) => {
          return <li key={i}>
            <TecnologiaCard
              title={tecnologia.title}
              image={tecnologia.image}
            />
          </li>
        })}
      </ul>

    </div> 
  )
}