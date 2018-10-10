import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from '../models/photo';
import { click, findEl } from '../spec-helpers/element.spec-helper';
import { photo } from '../spec-helpers/photo.spec-helper';
import { PhotoItemComponent } from './photo-item.component';

describe('PhotoItemComponent', () => {
  let component: PhotoItemComponent;
  let fixture: ComponentFixture<PhotoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoItemComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoItemComponent);
    component = fixture.componentInstance;
    component.photo = photo;
    fixture.detectChanges();
  });

  it('renders a link and a thumbnail', () => {
    const link = findEl(fixture, 'link');
    expect(link.properties.href).toBe(photo.link);

    const img = findEl(fixture, 'image');
    expect(img.properties.src).toBe(photo.media.m);
    expect(img.properties.alt).toBe(photo.title);
  });

  it('focusses a photo on click', (done: DoneFn) => {
    component.focusPhoto.subscribe((photo2: Photo) => {
      expect(photo2).toBe(photo);
      done();
    });

    click(fixture, 'link');
  });
});
