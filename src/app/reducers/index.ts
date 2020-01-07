import { ActionReducerMap } from '@ngrx/store';

import { PhotosStateSlice } from './photos-state-slice';
import { photosReducer } from './photos.reducer';

export interface AppState {
  photos: PhotosStateSlice;
}

export const reducers: ActionReducerMap<AppState> = {
  photos: photosReducer
};
