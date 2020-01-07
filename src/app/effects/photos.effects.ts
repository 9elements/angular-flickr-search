import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { search, searchResultsLoaded } from '../actions/photos.actions';
import { FlickrService } from '../services/flickr.service';

@Injectable()
export class PhotosEffects {
  constructor(private actions$: Actions, private flickrService: FlickrService) {}

  public search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      mergeMap((action) =>
        this.flickrService.searchPublicPhotos(action.searchTerm).pipe(
          map((photos) => searchResultsLoaded({ photos })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
