import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { Photo } from '../../models/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent {
  @Input()
  public title = '';

  @Input()
  public photos: Photo[] = [];

  @Output()
  public focusPhoto = new EventEmitter<Photo>();

  public handleFocusPhoto(photo: Photo): void {
    this.focusPhoto.emit(photo);
  }
}
