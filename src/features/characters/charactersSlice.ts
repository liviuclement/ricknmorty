import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Character } from "../../utils/types";

export const getCharacters = createAsyncThunk('characters/fetchCharacters',
    async (args: { statusFilter: string, speciesFilter: string, genderFilter: string, page: number }, {
        rejectWithValue
    }) => {
        const { statusFilter, speciesFilter, genderFilter, page } = args;
        try {
            const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${page}&status=${statusFilter || ''}&gender=${genderFilter || ''}&species=${speciesFilter || ''}`);

            return {
                data: {
                    info: data.info,
                    results: data.results.map((result: Character) => ({
                        id: result.id,
                        image: result.image,
                        status: result.status,
                        name: result.name,
                        gender: result.gender,
                        species: result.species,
                        origin: result.origin,
                        location: result.location,
                    }))
                },
                page
            };
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    });

export const getCharacter = createAsyncThunk('characters/fetchCharacter',
    async (args: any, {
        rejectWithValue
    }) => {
        const { character } = args;
        try {
            const { data } = await axios(`https://rickandmortyapi.com/api/character/${character}`);

            return {
                id: data.id,
                image: data.image,
                status: data.status,
                name: data.name,
                gender: data.gender,
                species: data.species,
                origin: data.origin,
                location: data.location,
            };
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    });

export interface InitialState {
    characters: {
        info: {
            count: number,
            pages: number,
            next: string | null,
            prev: string | null
        },
        results: Character[]
    },
    character: Character | null,
    status: string,
    error: string,
}

const initialState: InitialState = {
    characters: {
        info: {
            count: 0,
            pages: 0,
            next: '',
            prev: '',
        },
        results: [],
    },
    character: null,
    status: 'idle',
    error: '',
};

export const charactersSlice = createSlice({
    name: 'charactersSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCharacters.fulfilled, (state, action) => {
                const { data, page } = action.payload;
                state.status = 'idle';

                if (page > 1) {
                    state.characters = {
                        ...data,
                        results: [...state.characters.results, ...data.results]
                    };
                } else {
                    state.characters = data;
                }
            })
            .addCase(getCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as any;
                state.characters = initialState.characters;
            })
            .addCase(getCharacter.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCharacter.fulfilled, (state, action) => {
                state.status = 'idle';
                state.character = action.payload;
            })
            .addCase(getCharacter.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as any;
            })
    }
})

export default charactersSlice.reducer;
