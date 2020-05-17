import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { from, Observable, of, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { search, searchResultsLoaded } from '../actions/photos.actions';
import { Photo } from '../models/photo';
import { FlickrService } from '../services/flickr.service';
import { photos, searchTerm } from '../spec-helpers/photo.spec-helper';
import { PhotosEffects } from './photos.effects';

const searchAction = search({ searchTerm });

type PartialFlickrService = Pick<FlickrService, 'searchPublicPhotos'>;

const mockFlickrService: PartialFlickrService = {
  searchPublicPhotos(): Observable<Photo[]> {
    return of(photos);
  },
};

const apiError = new Error('API Error');

const mockErrorFlickrService: PartialFlickrService = {
  searchPublicPhotos(): Observable<Photo[]> {
    return throwError(apiError);
  },
};

function expectActions(effect: Observable<Action>, actions: Action[]): void {
  effect.pipe(toArray()).subscribe((actualActions) => {
    expect(actualActions).toEqual(actions);
  }, fail);
}

function setup(actions: Action[], flickrService: PartialFlickrService): PhotosEffects {
  spyOn(flickrService, 'searchPublicPhotos').and.callThrough();

  TestBed.configureTestingModule({
    providers: [
      provideMockActions(from(actions)),
      { provide: FlickrService, useValue: flickrService },
      PhotosEffects,
    ],
  });

  return TestBed.inject(PhotosEffects);
}

describe('PhotosEffects', () => {
  it('gets the photos from flickr on search', () => {
    const photosEffects = setup([searchAction], mockFlickrService);

    expectActions(photosEffects.search$, [searchResultsLoaded({ photos })]);

    expect(mockFlickrService.searchPublicPhotos).toHaveBeenCalledWith(searchTerm);
  });

  it('handles errors from the service', () => {
    const photosEffects = setup(
      [searchAction, searchAction, searchAction],
      mockErrorFlickrService,
    );

    expectActions(photosEffects.search$, []);

    expect(mockErrorFlickrService.searchPublicPhotos).toHaveBeenCalledWith(searchTerm);
    expect(mockErrorFlickrService.searchPublicPhotos).toHaveBeenCalledTimes(3);
  });
});
