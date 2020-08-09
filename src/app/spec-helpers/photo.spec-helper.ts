import { FlickrPhoto } from '../models/flickr-photo';
import { Photo } from '../models/photo';
import { PhotosStateSlice } from '../reducers/photos-state-slice';

export const flickrPhoto1: FlickrPhoto = {
  id: '50179462511',
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (1)',
  url_q: 'https://live.staticflickr.com/65535/50179462511_0752249fba_q.jpg',
  url_m: 'https://live.staticflickr.com/65535/50179462511_0752249fba_m.jpg',
  datetaken: '2020-06-21T15:16:07-08:00',
  owner: '12639178@N07',
  ownername: 'naturgucker.de',
  tags: 'ngidn2020772215 calopteryxvirgo blauflügelprachtlibelle',
};

export const flickrPhoto2: FlickrPhoto = {
  id: '50178927498',
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (2)',
  url_q: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_q.jpg',
  url_m: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_m.jpg',
  datetaken: '2020-06-21T15:16:17-08:00',
  owner: '12639178@N07',
  ownername: 'naturgucker.de',
  tags: 'ngid657236235 calopteryxvirgo blauflügelprachtlibelle',
};

export const flickrPhotos: FlickrPhoto[] = [flickrPhoto1, flickrPhoto2];

export const photo1: Photo = {
  id: '50179462511',
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (1)',
  link: 'https://www.flickr.com/photos/12639178@N07/50179462511/',
  urlQ: 'https://live.staticflickr.com/65535/50179462511_0752249fba_q.jpg',
  urlM: 'https://live.staticflickr.com/65535/50179462511_0752249fba_m.jpg',
  dateTaken: '2020-06-21T15:16:07-08:00',
  ownerName: 'naturgucker.de',
  tags: 'ngidn2020772215 calopteryxvirgo blauflügelprachtlibelle',
};

export const photo2: Photo = {
  id: '50178927498',
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (2)',
  link: 'https://www.flickr.com/photos/12639178@N07/50178927498/',
  urlQ: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_q.jpg',
  urlM: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_m.jpg',
  dateTaken: '2020-06-21T15:16:17-08:00',
  ownerName: 'naturgucker.de',
  tags: 'ngid657236235 calopteryxvirgo blauflügelprachtlibelle',
};

export const photos: Photo[] = [photo1, photo2];

export const searchTerm = 'dragonfly';

export const initialState: PhotosStateSlice = {
  searchTerm: '',
  photos: [],
  currentPhoto: null,
};

export const stateWithSearchTerm: PhotosStateSlice = {
  searchTerm,
  photos: [],
  currentPhoto: null,
};

export const stateWithPhotos: PhotosStateSlice = {
  searchTerm,
  photos,
  currentPhoto: null,
};

export const stateWithCurrentPhoto: PhotosStateSlice = {
  searchTerm,
  photos,
  currentPhoto: photo1,
};
