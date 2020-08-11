import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { createHttpFactory, HttpMethod } from '@ngneat/spectator';

import { Photo } from '../models/photo';
import { photos, searchTerm } from '../spec-helpers/photo.spec-helper';
import { FlickrService } from './flickr.service';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=c3050d39a5bb308d9921bef0e15c437d&tags=${encodedSearchTerm}&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m`;

describe('FlickrService', () => {
  const createHttp = createHttpFactory({
    service: FlickrService,
  });

  it('searches for public photos', () => {
    const { service, controller } = createHttp();

    let actualPhotos: Photo[] | undefined;
    service.searchPublicPhotos(searchTerm).subscribe((_actualPhotos) => {
      actualPhotos = _actualPhotos;
    });

    controller.expectOne(expectedUrl).flush({ photos: { photo: photos } });
    expect(actualPhotos).toEqual(photos);

    // Spectator verifies the HTTP testing controller automatically
  });

  it('passes through search errors', () => {
    const { service, expectOne } = createHttp();

    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    service.searchPublicPhotos(searchTerm).subscribe(
      fail,
      (error) => {
        actualError = error;
      },
      fail,
    );

    expectOne(expectedUrl, HttpMethod.GET).error(errorEvent, { status, statusText });

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);

    // Spectator verifies the HTTP testing controller automatically
  });
});
