import { ComponentFixture, TestBed } from '@angular/core/testing';

import { findEl, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { SearchFormComponent } from './search-form.component';

const searchTerm = 'flowers';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts a search', () => {
    let actualSearchTerm: string | undefined;

    component.search.subscribe((otherSearchTerm: string) => {
      actualSearchTerm = otherSearchTerm;
    });

    setFieldValue(fixture, 'searchTermInput', searchTerm);

    findEl(fixture, 'form').triggerEventHandler('ngSubmit', {});

    expect(actualSearchTerm).toBe(searchTerm);
  });
});
