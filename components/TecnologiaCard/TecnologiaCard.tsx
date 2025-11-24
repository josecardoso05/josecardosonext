import Image from 'next/image';
import Link from 'next/link';

interface TecnologiaCardProps {
    title: string;
    image: string;
}

export default function TecnologiaCard({title, image}: TecnologiaCardProps) {

    return (
        <>
            <div className="bg-black m-2 border-2 rounded-lg flex-col w-100 h-30 text-center mx-auto">
                <p>{title}</p>
                <Image className='mx-auto'
                    src={"/tecnologias/" + image}
                    alt={title}
                    width={50}
                    height={50}
                />
                <Link href="/tecnologia">Clica aqui para ver detalhadamente</Link>
            </div>
        </>
    )
}