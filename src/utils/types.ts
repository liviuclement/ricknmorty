interface CharacterLocation {
    name: string,
    url?: string,
}

interface CharacterOrigin {
    name: string,
    url?: string,
}

export interface Character {
    id: number,
    image: string,
    status: string,
    name: string,
    gender: string,
    species: string,
    origin: CharacterOrigin,
    location: CharacterLocation,
}
