import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { expectText, findEl } from '../../spec-helpers/element.spec-helper';
import { photo1, photo1Link } from '../../spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from './full-photo.component';

describe('FullPhotoComponent', () => {
  let component: FullPhotoComponent;
  let fixture: ComponentFixture<FullPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullPhotoComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FullPhotoComponent);
    component = fixture.componentInstance;
    component.photo = photo1;
    fixture.detectChanges();
  });

  it('renders the photo information', () => {
    expectText(fixture, 'title', photo1.title);

    const img = findEl(fixture, 'image');
    expect(img.properties.src).toBe(photo1.url_m);
    expect(img.properties.alt).toBe(photo1.title);

    expectText(fixture, 'ownername', photo1.ownername);
    expectText(fixture, 'datetaken', photo1.datetaken);
    expectText(fixture, 'tags', photo1.tags);

    const link = findEl(fixture, 'link');
    expect(link.properties.href).toBe(photo1Link);
    expect(link.nativeElement.textContent.trim()).toBe(photo1Link);
  });
});
