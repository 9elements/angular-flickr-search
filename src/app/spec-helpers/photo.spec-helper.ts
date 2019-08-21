import { Photo } from '../models/photo';
import { PhotosStateSlice } from '../reducers/photos-state-slice';

export const photo1: Photo = {
  title: 'Libelle 4',
  link: 'https://www.flickr.com/photos/183701975@N04/48590887652/',
  media: {
    m: 'https://live.staticflickr.com/65535/48590887652_629e3397ff_m.jpg'
  },
  date_taken: '2019-08-18T20:27:52-08:00',
  description:
    // tslint:disable-next-line:max-line-length
    ' <p><a href="https://www.flickr.com/people/183701975@N04/">Bernhard.Grabener</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/183701975@N04/48590887652/" title="Libelle 4"><img src="https://live.staticflickr.com/65535/48590887652_629e3397ff_m.jpg" width="240" height="180" alt="Libelle 4" /></a></p> <p>OLYMPUS DIGITAL CAMERA</p>',
  published: '2019-08-21T08:59:14Z',
  author: 'nobody@flickr.com ("Bernhard.Grabener")',
  author_id: '183701975@N04',
  tags:
    'olympus em5 mk2 linz libelle dragonfly grün österreich austria bernhard grabner zoom libellen makro'
};

export const photo2: Photo = {
  title: 'Libelle 2',
  link: 'https://www.flickr.com/photos/183701975@N04/48590744551/',
  media: {
    m: 'https://live.staticflickr.com/65535/48590744551_d97e88e48c_m.jpg'
  },
  date_taken: '2019-08-18T21:50:25-08:00',
  description:
    // tslint:disable-next-line:max-line-length
    ' <p><a href="https://www.flickr.com/people/183701975@N04/">Bernhard.Grabener</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/183701975@N04/48590744551/" title="Libelle 2"><img src="https://live.staticflickr.com/65535/48590744551_d97e88e48c_m.jpg" width="240" height="186" alt="Libelle 2" /></a></p> <p>OLYMPUS DIGITAL CAMERA</p>',
  published: '2019-08-21T08:59:16Z',
  author: 'nobody@flickr.com ("Bernhard.Grabener")',
  author_id: '183701975@N04',
  tags:
    'olympus em5 mk2 linz libelle dragonfly grün österreich austria bernhard grabner zoom libellen makro'
};

export const photos: Photo[] = [photo1, photo2];

export const searchTerm = 'dragonfly';

export const initialState: PhotosStateSlice = {
  searchTerm: '',
  photos: [],
  currentPhoto: null
};

export const stateWithSearchTerm: PhotosStateSlice = {
  searchTerm,
  photos: [],
  currentPhoto: null
};

export const stateWithPhotos: PhotosStateSlice = {
  searchTerm,
  photos,
  currentPhoto: null
};

export const stateWithCurrentPhoto: PhotosStateSlice = {
  searchTerm,
  photos,
  currentPhoto: photo1
};
