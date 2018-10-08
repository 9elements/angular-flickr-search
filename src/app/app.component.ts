import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Photo } from '../models/photo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchTerm = '';
  photos: Photo[] = [];
  currentPhoto: Photo | null = null;

  constructor(private http: HttpClient) {}

  handleSearch(searchTerm: string) {
    // Make the JSONP request to Flickr
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const url = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;
    this.http.jsonp(url, 'jsoncallback').subscribe((data: any) => {
      this.searchTerm = searchTerm;
      this.photos = data.items;
      this.currentPhoto = null;
    });
  }

  handleFocusPhoto(photo: Photo) {
    console.log('handleFocusPhoto', photo);
    this.currentPhoto = photo;
  }

}
