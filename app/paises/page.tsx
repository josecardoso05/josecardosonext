'use client'

import React from 'react'
import useSWR from 'swr';

const fetcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
    }
    return res.json()
}

export default function page() {
  const url = '/data/paises.json/'

  return (
    <div>paises</div>
  )
}
