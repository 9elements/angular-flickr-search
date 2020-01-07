import { createAction, props } from '@ngrx/store';
import { Photo } from '../models/photo';

export const search = createAction('[photos] Search', props<{ searchTerm: string }>());
export const searchResultsLoaded = createAction(
  '[photos] Search results loaded',
  props<{ photos: Photo[] }>(),
);
export const focusPhoto = createAction(
  '[photos] Focus photo',
  props<{ photo: Photo | null }>(),
);
