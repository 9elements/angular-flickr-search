import { HttpBackend, JsonpClientBackend, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { FlickrService } from './flickr.service';
import { searchTerm, photos } from '../spec-helpers/photo.spec-helper';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;

describe('FlickrService', () => {
  let flickrService: FlickrService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        // See https://github.com/angular/angular/issues/20878 and
        // https://stackoverflow.com/questions/47703877/
        { provide: JsonpClientBackend, useExisting: HttpBackend },
        FlickrService,
      ],
    });
    flickrService = TestBed.inject(FlickrService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('searches for public photos', async(() => {
    flickrService.searchPublicPhotos(searchTerm).subscribe((foundPhotos) => {
      expect(foundPhotos).toEqual(photos);
    });

    controller
      // Normally, we could write .expectOne(expectedUrl) here.
      // But this would check against the full URL containing
      // the dynamic "jsoncallback=?" parameter.
      // In contrast, request.url lacks the "jsoncallback" parameter.
      .expectOne((request) => request.url === expectedUrl)
      .flush({ items: photos });
  }));

  it('passes through search errors', async(() => {
    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API error');

    flickrService.searchPublicPhotos(searchTerm).subscribe(
      fail,
      (error: HttpErrorResponse) => {
        expect(error.error).toBe(errorEvent);
        expect(error.status).toBe(status);
        expect(error.statusText).toBe(statusText);
      },
      fail,
    );

    controller
      .expectOne((request) => request.url === expectedUrl)
      .error(errorEvent, { status, statusText });
    controller.verify();
  }));
});
