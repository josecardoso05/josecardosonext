'use client'
import React, { useState, useEffect } from 'react'

export default function Contador() {
    const [value, setValue] = useState(0)
    const [history, setHistory] = useState<number[]>([])

    useEffect(() => {
        const valueStored = localStorage.getItem('value')
        if (valueStored) {
            setValue(parseInt(valueStored))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('value', `${value}`)
    }, [value])

    function mudaCor() {
        if (value >= 0 && value <= 3) {
            return "text-red-500"
        }
        if (value >= 4 && value <= 7) {
            return "text-yellow-500"
        }
        if (value >= 8 && value <= 10) {
            return "text-green-500"
        }
    }

    return (
        <div>
            <p className={`m-2 ${mudaCor()}`}>{value}</p>
            <button className="bg-blue-500 rounded-lg mx-2"
                onClick={() => {
                    value < 10 ? setValue(value + 1) : value
                    setHistory([...history, value])

                }}
            >
                Aumenta
            </button>
            <button className="bg-blue-500 rounded-lg mx-2"
                onClick={() => {
                    value > 0 ? setValue(value - 1) : value
                    setHistory([...history, value])
                }}
                
            >
                Diminui</button>
            <button className="bg-blue-500 rounded-lg"
                onClick={() => setValue(0)}
            >
                Reset</button>

            <ul>
                Histórico:
                {history.map((c, i) => (<li key={i}>{c}</li>))}
            </ul>
        </div>

    )
}
