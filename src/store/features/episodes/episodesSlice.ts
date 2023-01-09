import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Character } from "../../../utils/types";
import { API_URL } from "../../../env";

export const getEpisodeCount = createAsyncThunk('episodes/fetchEpisodeCount', async (args, { rejectWithValue }) => {
    try {
        const response = await axios(`${API_URL}/episode`);

        return {
            count: response.data?.info?.count
        };
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

export const getEpisodeById = createAsyncThunk('episodes/fetchCharactersByEpisodeId', async (args: { selectedEpisode: number }, { rejectWithValue }) => {
    const { selectedEpisode } = args;

    try {
        const response = await axios(`${API_URL}/episode/${selectedEpisode}`);
        const characterPromises = await response.data.characters.map((character: string) => axios.get(character))
        const characters = await Promise.all(characterPromises);

        return {
            airDate: response.data.air_date,
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

interface EpisodesState {
    episode: {
        airDate: string,
        created: string,
        episode: string,
        name: string,
        charactersURL: string[],
        characters: Character[],
    },
    status: string,
    error: string,
    episodeCount: number,
}

const initialState: EpisodesState = {
    episode: {
        airDate: '',
        created: '',
        episode: '',
        name: '',
        charactersURL: [],
        characters: [],
    },
    status: 'idle',
    error: '',
    episodeCount: 0,
}

export const episodesSlice = createSlice({
    name: 'episodesSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getEpisodeCount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getEpisodeCount.fulfilled, (state, action) => {
                const { count } = action.payload;

                state.status = 'succeeded';
                state.episodeCount = count;
            })
            .addCase(getEpisodeCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getEpisodeById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getEpisodeById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.episode = action.payload;
            })
            .addCase(getEpisodeById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    }
})

export default episodesSlice.reducer;
