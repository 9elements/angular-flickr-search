import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Photo } from '../../models/photo';

@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.css'],
})
export class FlickrSearchComponent {
  public searchTerm = '';
  public photos: Photo[] = [];
  public currentPhoto: Photo | null = null;

  constructor(private http: HttpClient) {}

  public handleSearch(searchTerm: string): void {
    // Make the JSONP request to Flickr
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const url = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;
    this.http.jsonp(url, 'jsoncallback').subscribe((data: any) => {
      this.searchTerm = searchTerm;
      this.photos = data.items;
      this.currentPhoto = null;
    });
  }

  public handleFocusPhoto(photo: Photo): void {
    this.currentPhoto = photo;
  }
}
