import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Character } from "../../utils/types";

export const getEpisodes = createAsyncThunk('episodes/fetchEpisodes', async (args, { rejectWithValue }) => {
    try {
        const response = await axios(`https://rickandmortyapi.com/api/episode`);

        return {
            count: response.data?.info?.count
        };
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

export const getEpisode = createAsyncThunk('episodes/fetchEpisode', async (args: { episode: number }, { rejectWithValue }) => {
    const { episode } = args;

    try {
        const response = await axios(`https://rickandmortyapi.com/api/episode/${episode || ''}`);
        const characterPromises = await response.data.characters.map((character: string) => axios.get(character))
        const characters = await Promise.all(characterPromises);

        return {
            air_date: response.data.air_date,
            created: response.data.created,
            episode: response.data.episode,
            name: response.data.name,
            charactersURL: response.data.characters,
            characters: characters?.map(character => character.data)
        };
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

export interface InitialState {
    episodes: {
        air_date: string,
        created: string,
        episode: string,
        name: string,
        charactersURL: string[],
        characters: Character[],
    },
    status: string,
    error: string | null,
    episodeCount: number | null,
}

const initialState: InitialState = {
    episodes: {
        air_date: '',
        created: '',
        episode: '',
        name: '',
        charactersURL: [],
        characters: [],
    },
    status: 'idle',
    error: null,
    episodeCount: null,
}

export const episodesSlice = createSlice({
    name: 'episodesSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getEpisodes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getEpisodes.fulfilled, (state, action) => {
                const { count } = action.payload;

                state.status = 'idle';
                state.episodeCount = count;
            })
            .addCase(getEpisodes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getEpisode.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getEpisode.fulfilled, (state, action) => {
                state.status = 'idle';
                state.episodes = action.payload;
            })
            .addCase(getEpisode.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    }
})

export default episodesSlice.reducer;
