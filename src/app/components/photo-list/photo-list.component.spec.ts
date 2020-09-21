import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from '../../models/photo';
import {
  expectText,
  findComponent,
  findComponents,
} from '../../spec-helpers/element.spec-helper';
import { photo1, photo2 } from '../../spec-helpers/photo.spec-helper';
import { PhotoListComponent } from './photo-list.component';

const title = 'Hello World';
const photos = [photo1, photo2];

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [PhotoListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    component.title = title;
    component.photos = photos;
    fixture.detectChanges();
  });

  it('renders the title', () => {
    expectText(fixture, 'title', title);
  });

  it('renders photo items', () => {
    const photoItems = findComponents(fixture, 'app-photo-item');
    expect(photoItems.length).toBe(photos.length);
    photoItems.forEach((photoItem, i) => {
      expect(photoItem.properties.photo).toBe(photos[i]);
    });
  });

  it('focusses a photo', (done: DoneFn) => {
    const photoItem = findComponent(fixture, 'app-photo-item');

    component.focusPhoto.subscribe((otherPhoto: Photo) => {
      expect(otherPhoto).toBe(photo1);
      done();
    });

    photoItem.triggerEventHandler('focusPhoto', photoItem.properties.photo);
  });
});
