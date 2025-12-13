'use client'

import useSWR from 'swr';
import { Produto } from '@/models/interfaces';
import ProdutoCard from '@/components/ProdutosCard/ProdutoCard';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Props { params: { id: string; } }

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro: ${res.status}`);
  return res.json();
};

export default function PaginaUmProduto({ params }: Props) {

  const url = 'https://deisishop.pythonanywhere.com/products/';
  const { data, error, isLoading } = useSWR<Produto[]>(url, fetcher);

  const { id } = useParams()

  if (isLoading) return <p>A carregar...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Não há produtos</p>;

  const produto = data.find(p => p.id === Number(id));

  if (!produto) return <p>Produto 3 não encontrado</p>;

  return (
    <>
      <ProdutoCard
        id={produto.id}
        title={produto.title}
        price={produto.price}
        description={produto.description}
        category={produto.category}
        image={produto.image}
        rating={produto.rating}
      />
      <Link href="/produtos" className='bg-blue-500 rounded-2xl p-2'>Voltar atrás</Link>
    </>
  );
}
