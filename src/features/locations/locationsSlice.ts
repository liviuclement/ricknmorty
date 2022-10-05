import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Character } from "../../utils/types";

export const getLocations = createAsyncThunk('locations/fetchLocations', async (args, { rejectWithValue }) => {
    try {
        const response = await axios(`https://rickandmortyapi.com/api/location`);

        return {
            count: response.data?.info?.count
        };
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

export const getLocation = createAsyncThunk('locations/fetchLocation', async (args: { location: number }, { rejectWithValue }) => {
    const { location } = args;

    try {
        const response = await axios(`https://rickandmortyapi.com/api/location/${location || ''}`);
        const residentPromises = await response.data.residents.map((resident: string) => axios.get(resident))
        const residents = await Promise.all(residentPromises);

        return {
            type: response.data.type,
            dimension: response.data.dimension,
            name: response.data.name as string,
            residentsURL: response.data.locations as [],
            residents: residents?.map(resident => resident.data) as [],
        };
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})


export interface InitialState {
    locations: {
        type: string,
        dimension: string,
        name: string,
        residentsURL: string[],
        residents: Character[],
    },
    status: string,
    error: string | null,
    locationCount: number | null,
}

const initialState: InitialState = {
    locations: {
        type: '',
        dimension: '',
        name: '',
        residentsURL: [],
        residents: [],
    },
    status: 'idle',
    error: null,
    locationCount: null,
}

export const locationsSlice = createSlice({
    name: 'locationsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLocations.fulfilled, (state, action) => {
                const { count } = action.payload;

                state.status = 'idle';
                state.locationCount = count;
            })
            .addCase(getLocations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getLocation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLocation.fulfilled, (state, action) => {
                state.status = 'idle';
                state.locations = action.payload;
            })
            .addCase(getLocation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    }
})

export default locationsSlice.reducer;
