'use client'

import Image from "next/image"
import Link from "next/link";

interface CarroCardProps {
    name: string;
    image: string;
    slug: string;
}

export default function CarroCard({ name, image, slug }: CarroCardProps) {
  return (
    <Link href={`/carros/${slug}`}>
      <div className="group">
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-xl"
          />

          <div className="absolute inset-0 flex items-end p-3">
            <span
              className="
                bg-black/60
                text-white
                text-sm md:text-base
                px-3 py-1
                rounded-lg
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              {name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
