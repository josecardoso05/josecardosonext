'use client'
import React, { useEffect, useState } from 'react';

interface contadorPersonalizadoProps {
  title: string;
}

export default function ContadorPersonalizado({ title }: contadorPersonalizadoProps) {
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    const valorSalvo = localStorage.getItem(`likes_${title}`);
    if (valorSalvo) {
      setLikes(Number(valorSalvo));
    }
  }, [title]);

  useEffect(() => {
    localStorage.setItem(`likes_${title}`, likes.toString());
  }, [likes, title]);

  function adicionarLike() {
    setLikes(prev => prev + 1);
  }

  return (
    <div>
      <button onClick={adicionarLike}>
        Likes: {likes}
      </button>
    </div>
  );
}
