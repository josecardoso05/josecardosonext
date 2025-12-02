'use client'
import React, { useEffect, useState } from 'react';

export default function Relogio() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
      <p>{hora.toLocaleTimeString()}</p>
    </div>
  );
}
