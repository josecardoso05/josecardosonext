interface CaracteristicaProps {
    caracteristica: Array<string>;
}

export default function Caracteristica({ caracteristica }: CaracteristicaProps) {

    return (
        <div>
            <ul>
                {caracteristica.map((caracteristica, i) => {
                    return <li key={i}>{caracteristica}</li>
                })}
            </ul>
        </div>
    )
}