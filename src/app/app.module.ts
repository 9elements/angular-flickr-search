import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FullPhotoComponent } from './full-photo/full-photo.component';
import { PhotoItemComponent } from './photo-item/photo-item.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    PhotoListComponent,
    PhotoItemComponent,
    FullPhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
