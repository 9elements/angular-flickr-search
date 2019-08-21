import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { PhotosStateSlice } from './photos-state-slice';
import { photosReducer } from './photos.reducer';

export interface AppState {
  photos: PhotosStateSlice;
}

export const reducers: ActionReducerMap<AppState> = {
  photos: photosReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
