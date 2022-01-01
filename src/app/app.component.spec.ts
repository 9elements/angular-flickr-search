import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { findComponent } from './spec-helpers/element.spec-helper';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('renders the Flickr search', () => {
    const el = findComponent(fixture, 'app-flickr-search');
    expect(el).toBeTruthy();
  });

  it('renders the Flickr search with NgRx', () => {
    const el = findComponent(fixture, 'app-flickr-search-ngrx');
    expect(el).toBeTruthy();
  });
});
