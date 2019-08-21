import { HttpBackend, JsonpClientBackend, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { FlickrService } from './flickr.service';
import { searchTerm, photos } from '../spec-helpers/photo.spec-helper';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;

const errorEvent = new ErrorEvent('API error');

describe('FlickrService', () => {
  let flickrService: FlickrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        // See https://github.com/angular/angular/issues/20878 and
        // https://stackoverflow.com/questions/47703877/
        { provide: JsonpClientBackend, useExisting: HttpBackend },
        FlickrService
      ]
    });
    flickrService = TestBed.get(FlickrService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('searches for public photos', async(() => {
    flickrService.searchPublicPhotos(searchTerm).subscribe(foundPhotos => {
      expect(foundPhotos).toEqual(photos);
    });

    httpMock
      .expectOne(request => request.url === expectedUrl)
      .flush({ items: photos });
  }));

  it('passes through search errors', async(() => {
    const status = 500;
    const statusText = 'Server error';

    flickrService.searchPublicPhotos(searchTerm).subscribe(
      fail,
      (error: HttpErrorResponse) => {
        expect(error.error).toBe(errorEvent);
        expect(error.status).toBe(status);
        expect(error.statusText).toBe(statusText);
      },
      fail
    );

    httpMock
      .expectOne(request => request.url === expectedUrl)
      .error(errorEvent, { status: 500, statusText: 'Server error' });
    httpMock.verify();
  }));
});
