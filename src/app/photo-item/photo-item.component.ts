import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Photo } from '../../models/photo';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent {

  @Input()
  photo: Photo | null = null;

  @Output()
  focusPhoto = new EventEmitter<Photo>();

  handleClick(event: MouseEvent) {
    event.preventDefault();
    console.log('handleClick', this.photo);
    if (this.photo) {
      this.focusPhoto.emit(this.photo);
    }
  }

}
