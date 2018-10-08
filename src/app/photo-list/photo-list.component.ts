import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Photo } from '../../models/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent {

  @Input()
  title = '';

  @Input()
  photos: Photo[] = [];

  @Output()
  focusPhoto = new EventEmitter<Photo>();

  handleFocusPhoto(photo: Photo) {
    console.log('photo-list handleFocusPhoto', photo);
    this.focusPhoto.emit(photo);
  }

}
