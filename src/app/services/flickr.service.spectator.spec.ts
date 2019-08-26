import {
  HttpBackend,
  HttpErrorResponse,
  JsonpClientBackend
} from '@angular/common/http';
import { async } from '@angular/core/testing';
import { createHTTPFactory } from '@netbasal/spectator';

import { photos, searchTerm } from '../spec-helpers/photo.spec-helper';
import { FlickrService } from './flickr.service';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;

describe('FlickrService', () => {
  const http = createHTTPFactory<FlickrService>(FlickrService, [
    // See https://github.com/angular/angular/issues/20878 and
    // https://stackoverflow.com/questions/47703877/
    { provide: JsonpClientBackend, useExisting: HttpBackend },
    FlickrService
  ]);

  it('searches for public photos', async(() => {
    const { dataService: flickrService, controller } = http();

    flickrService.searchPublicPhotos(searchTerm).subscribe(foundPhotos => {
      expect(foundPhotos).toEqual(photos);
    });

    controller
      .expectOne(request => request.url === expectedUrl)
      .flush({ items: photos });
  }));

  it('passes through search errors', async(() => {
    const { dataService: flickrService, controller } = http();

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
      fail
    );

    controller
      .expectOne(request => request.url === expectedUrl)
      .error(errorEvent, { status, statusText });
    controller.verify();
  }));
});
