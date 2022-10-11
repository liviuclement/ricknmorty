import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Character } from "../../../utils/types";
import { API_URL } from "../../../env";

export const getLocationCount = createAsyncThunk('locations/fetchLocations', async (args, { rejectWithValue }) => {
    try {
        const response = await axios(`${API_URL}/location`);

        return {
            count: response.data?.info?.count
        };
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

export const getLocationById = createAsyncThunk('locations/fetchLocation', async (args: { selectedLocation: number }, { rejectWithValue }) => {
    const { selectedLocation } = args;

    try {
        const response = await axios.get<GetLocationResponse>(`${API_URL}/location/${selectedLocation}`);
        const residentPromises = response.data.residents.map((resident: string) => axios.get<Character>(resident))
        const residents = await Promise.all(residentPromises);

        return {
            type: response.data.type,
            dimension: response.data.dimension,
            name: response.data.name,
            residents: residents?.map(resident => resident.data),
        };
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

interface GetLocationResponse {
    type: string,
    dimension: string,
    name: string,
    residents: string[],
}

interface Location {
    type: string,
    dimension: string,
    name: string,
    residents: Character[],
}

interface LocationsState {
    location: Location,
    status: string,
    error: string | null,
    locationCount: number | null,
}

const initialState: LocationsState = {
    location: {
        type: '',
        dimension: '',
        name: '',
        residents: [],
    },
    status: 'idle',
    error: '',
    locationCount: 0,
}

export const locationsSlice = createSlice({
    name: 'locationsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getLocationCount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLocationCount.fulfilled, (state, action) => {
                const { count } = action.payload;

                state.status = 'succeeded';
                state.locationCount = count;
            })
            .addCase(getLocationCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getLocationById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLocationById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.location = action.payload;
            })
            .addCase(getLocationById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    }
})

export default locationsSlice.reducer;
