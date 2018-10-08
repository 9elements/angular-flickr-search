import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoItemComponent } from './photo-item/photo-item.component';
import { FullPhotoComponent } from './full-photo/full-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    PhotoListComponent,
    PhotoItemComponent,
    FullPhotoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
