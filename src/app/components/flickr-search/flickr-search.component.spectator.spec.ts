import { HttpBackend, JsonpClientBackend } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { MockComponents } from 'ng-mocks';

import { photo1, photos } from '../../spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from '../full-photo/full-photo.component';
import { PhotoListComponent } from '../photo-list/photo-list.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FlickrSearchComponent } from './flickr-search.component';

describe('FlickrSearchComponent with spectator', () => {
  let spectator: Spectator<FlickrSearchComponent>;

  let searchForm: SearchFormComponent;
  let photoList: PhotoListComponent;
  let fullPhoto: FullPhotoComponent;

  const create = createTestComponentFactory({
    component: FlickrSearchComponent,
    shallow: true,
    imports: [HttpClientTestingModule],
    declarations: [
      MockComponents(SearchFormComponent, PhotoListComponent, FullPhotoComponent)
    ],
    providers: [
      // See https://github.com/angular/angular/issues/20878 and
      // https://stackoverflow.com/questions/47703877/
      { provide: JsonpClientBackend, useExisting: HttpBackend }
    ]
  });

  beforeEach(() => {
    spectator = create();

    searchForm = spectator.query(SearchFormComponent);
    photoList = spectator.query(PhotoListComponent);
    fullPhoto = spectator.query(FullPhotoComponent);
  });

  it('renders a search form', () => {
    expect(searchForm).toBeTruthy();
    expect(searchForm).toBeTruthy();
    expect(searchForm).toBeTruthy();
  });

  it('searches and passes the resulting photos to the photo list', () => {
    expect(photoList.title).toBe('');
    expect(photoList.photos).toEqual([]);

    const searchTerm = 'beautiful flowers';
    searchForm.search.emit(searchTerm);

    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const expectedUrl = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;
    const matchedRequest = httpMock.expectOne((request) => request.url === expectedUrl);
    matchedRequest.flush({ items: photos });
    httpMock.verify();

    spectator.detectChanges();

    expect(photoList.title).toBe(searchTerm);
    expect(photoList.photos).toBe(photos);
  });

  it('renders the full photo when a photo is focussed', () => {
    expect(() => {
      spectator.query(FullPhotoComponent);
    }).toThrow();

    photoList.focusPhoto.emit(photo1);

    spectator.detectChanges();

    expect(fullPhoto.photo).toBe(photo1);
  });
});
