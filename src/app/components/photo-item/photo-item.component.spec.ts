import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from '../../models/photo';
import { click, findEl } from '../../spec-helpers/element.spec-helper';
import { photo1, photo1Link } from '../../spec-helpers/photo.spec-helper';
import { PhotoItemComponent } from './photo-item.component';

describe('PhotoItemComponent', () => {
  let component: PhotoItemComponent;
  let fixture: ComponentFixture<PhotoItemComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [PhotoItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoItemComponent);
    component = fixture.componentInstance;
    component.photo = photo1;
    fixture.detectChanges();
  });

  it('renders a link and a thumbnail', () => {
    const link = findEl(fixture, 'link');
    expect(link.properties.href).toBe(photo1Link);

    const img = findEl(fixture, 'image');
    expect(img.properties.src).toBe(photo1.url_q);
    expect(img.properties.alt).toBe(photo1.title);
  });

  it('focusses a photo on click', (done: DoneFn) => {
    component.focusPhoto.subscribe((otherPhoto: Photo) => {
      expect(otherPhoto).toBe(photo1);
      done();
    });

    click(fixture, 'link');
  });

  it('does nothing on click when the photo is null', () => {
    component.photo = null;
    fixture.detectChanges();

    component.focusPhoto.subscribe(fail);

    // We cannot click on the link since it does not exist.
    // As an exception, call the handler directly.
    // Normally, you should not do this.
    component.handleClick(new MouseEvent('click'));

    expect().nothing();
  });
});
