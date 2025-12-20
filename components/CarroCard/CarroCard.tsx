'use client'

import Image from "next/image"
import Link from "next/link";

interface CarroCardProps {
    name: string;
    image: string;
    slug: string;
}

export default function CarroCard({ name, image, slug }: CarroCardProps) {

    return <>
        <Link
            href={`/carros/${slug}`}
        >
            <div className="hover:text-2xl transition-all duration-200 ease-in-out">
                <div className="relative w-[450px] h-[300px]">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover rounded-2xl"
                    />

                    <div className="absolute inset-0 flex items-end p-4">
                        <span className="bg-black/60 text-white px-3 py-1 rounded-lg">
                            {name}
                        </span>
                    </div>
                </div>
            </div>
        </Link>

    </>
}