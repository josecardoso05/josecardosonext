export interface Produto {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number
    }
}

export interface Categoria {
    name: string;
}

export interface Pais {
    name: {
        common: string;
        offical: string;
        nativeName: {
            eng: {
                official: string;
                common: string;
            }
        }
    }
    area: number;
    population: number
}