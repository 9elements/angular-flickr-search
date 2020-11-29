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

const fakeFlickrService: PartialFlickrService = {
  searchPublicPhotos(): Observable<Photo[]> {
    return of(photos);
  },
};

const apiError = new Error('API Error');

const fakeErrorFlickrService: PartialFlickrService = {
  searchPublicPhotos(): Observable<Photo[]> {
    return throwError(apiError);
  },
};

function expectActions(effect: Observable<Action>, actions: Action[]): void {
  let actualActions: Action[] | undefined;
  effect.pipe(toArray()).subscribe((actualActions2) => {
    actualActions = actualActions2;
  }, fail);
  expect(actualActions).toEqual(actions);
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
    const photosEffects = setup([searchAction], fakeFlickrService);

    expectActions(photosEffects.search$, [searchResultsLoaded({ photos })]);

    expect(fakeFlickrService.searchPublicPhotos).toHaveBeenCalledWith(searchTerm);
  });

  it('handles errors from the service', () => {
    const photosEffects = setup(
      [searchAction, searchAction, searchAction],
      fakeErrorFlickrService,
    );

    expectActions(photosEffects.search$, []);

    expect(fakeErrorFlickrService.searchPublicPhotos).toHaveBeenCalledWith(searchTerm);
    expect(fakeErrorFlickrService.searchPublicPhotos).toHaveBeenCalledTimes(3);
  });
});
