import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '@/models/interfaces';

export default function ProdutoCard({id, title, price, description, category, image, rating}: Produto) {

    return (
        <div>
            <h2>{title}</h2>
            <p>Categoria: {category}</p>
            <Image
                src={"https://deisishop.pythonanywhere.com" + image}
                alt={image}
                width={250}
                height={250}
            />
            <p>Preço: {price} €</p>
            <p>{description}</p>
            <p>Rating: {rating.rate}</p>
            <p>Rating count: {rating.count}</p>
        </div>
    )
}