import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FlickrSearchNgrxComponent } from './components/flickr-search-ngrx/flickr-search-ngrx.component';
// eslint-disable-next-line max-len
import { FlickrSearchComponent } from './components/flickr-search/flickr-search.component';
import { FullPhotoComponent } from './components/full-photo/full-photo.component';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { PhotosEffects } from './effects/photos.effects';
import { reducers } from './reducers';
import { FlickrService } from './services/flickr.service';

@NgModule({
  declarations: [
    AppComponent,
    FlickrSearchComponent,
    FlickrSearchNgrxComponent,
    SearchFormComponent,
    PhotoListComponent,
    PhotoItemComponent,
    FullPhotoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([PhotosEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [FlickrService],
  bootstrap: [AppComponent],
})
export class AppModule {}
