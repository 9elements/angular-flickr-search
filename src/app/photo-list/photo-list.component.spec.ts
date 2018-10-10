import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { photo } from '../spec-helpers/photo.spec-helper';
import { findComponents, click, findComponent, expectText } from '../spec-helpers/element.spec-helper';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Photo } from '../models/photo';

const title = 'Hello World';
const photos = [ photo, photo ];

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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

    component.focusPhoto.subscribe((photo2: Photo) => {
      expect(photo2).toBe(photo);
      done();
    });

    photoItem.triggerEventHandler('focusPhoto', photoItem.properties.photo);
  });
});
