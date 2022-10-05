import { InitialState as InitialCharactersState } from "../features/characters/charactersSlice";
import { InitialState as InitialEpisodesState } from "../features/episodes/episodesSlice";
import { InitialState as InitialLocationsState } from "../features/locations/locationsSlice";

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

export interface ReduxState {
    characters: InitialCharactersState,
    episodes: InitialEpisodesState,
    locations: InitialLocationsState,
}
