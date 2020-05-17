import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Photo } from '../models/photo';

@Injectable()
export class FlickrService {
  constructor(private http: HttpClient) {}

  public searchPublicPhotos(searchTerm: string): Observable<Photo[]> {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const url = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;
    return this.http.jsonp(url, 'jsoncallback').pipe(map((data: any) => data.items));
  }
}
