import { HttpBackend, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { createHttpFactory } from '@ngneat/spectator';

import { photos, searchTerm } from '../spec-helpers/photo.spec-helper';
import { FlickrService } from './flickr.service';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;

describe('FlickrService', () => {
  const createHttp = createHttpFactory({
    service: FlickrService,
    providers: [
      // See https://github.com/angular/angular/issues/20878 and
      // https://stackoverflow.com/questions/47703877/
      { provide: JsonpClientBackend, useExisting: HttpBackend },
    ],
  });

  it('searches for public photos', async(() => {
    const { service, controller } = createHttp();

    service.searchPublicPhotos(searchTerm).subscribe((foundPhotos) => {
      expect(foundPhotos).toEqual(photos);
    });

    controller
      .expectOne((request) => request.url === expectedUrl)
      .flush({ items: photos });
  }));

  it('passes through search errors', async(() => {
    const { service, controller } = createHttp();

    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API error');

    service.searchPublicPhotos(searchTerm).subscribe(
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
