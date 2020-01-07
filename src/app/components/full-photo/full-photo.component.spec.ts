import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { expectText, findEl } from '../../spec-helpers/element.spec-helper';
import { photo1 } from '../../spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from './full-photo.component';

describe('FullPhotoComponent', () => {
  let component: FullPhotoComponent;
  let fixture: ComponentFixture<FullPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullPhotoComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPhotoComponent);
    component = fixture.componentInstance;
    component.photo = photo1;
    fixture.detectChanges();
  });

  it('renders the photo information', () => {
    expectText(fixture, 'title', photo1.title);

    const img = findEl(fixture, 'image');
    expect(img.properties.src).toBe(photo1.media.m);
    expect(img.properties.alt).toBe(photo1.title);

    expectText(fixture, 'author', photo1.author);
    expectText(fixture, 'date_taken', photo1.date_taken);
    expectText(fixture, 'tags', photo1.tags);

    const link = findEl(fixture, 'link');
    expect(link.properties.href).toBe(photo1.link);
    expect(link.nativeElement.textContent).toBe(photo1.link);
  });
});
