import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import charactersSlice from "./features/characters/charactersSlice";
import episodesSlice from "./features/episodes/episodesSlice";
import locationsSlice from "./features/locations/locationsSlice";

export const store = configureStore({
  reducer: {
    characters: charactersSlice,
    episodes: episodesSlice,
    locations: locationsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
