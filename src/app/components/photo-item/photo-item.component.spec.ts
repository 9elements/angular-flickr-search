import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from '../../models/photo';
import { click, findEl } from '../../spec-helpers/element.spec-helper';
import { photo1 } from '../../spec-helpers/photo.spec-helper';
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
    component.photo = photo1;
    fixture.detectChanges();
  });

  it('renders a link and a thumbnail', () => {
    const link = findEl(fixture, 'link');
    expect(link.properties.href).toBe(photo1.link);

    const img = findEl(fixture, 'image');
    expect(img.properties.src).toBe(photo1.media.m);
    expect(img.properties.alt).toBe(photo1.title);
  });

  it('focusses a photo on click', (done: DoneFn) => {
    component.focusPhoto.subscribe((otherPhoto: Photo) => {
      expect(otherPhoto).toBe(photo1);
      done();
    });

    click(fixture, 'link');
  });
});
