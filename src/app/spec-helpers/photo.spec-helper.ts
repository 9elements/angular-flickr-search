import { Photo } from '../models/photo';
import { PhotosStateSlice } from '../reducers/photos-state-slice';

export const photo1: Photo = {
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (1)',
  link: 'https://www.flickr.com/photos/12639178@N07/50179462511/',
  media: { m: 'https://live.staticflickr.com/65535/50179462511_0752249fba_m.jpg' },
  date_taken: '2020-06-21T15:16:07-08:00',
  description:
    ' <p><a href="https://www.flickr.com/people/12639178@N07/">naturgucker.de</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/12639178@N07/50179462511/" title="Blauflügel-Prachtlibelle (Calopteryx virgo) (1)"><img src="https://live.staticflickr.com/65535/50179462511_0752249fba_m.jpg" width="227" height="240" alt="Blauflügel-Prachtlibelle (Calopteryx virgo) (1)" /></a></p> <p>Blauflügel-Prachtlibelle (Calopteryx virgo)<br /> (c) Kühne Friederike</p>',
  published: '2020-08-02T09:11:38Z',
  author: 'nobody@flickr.com ("naturgucker.de")',
  author_id: '12639178@N07',
  tags: 'ngidn2020772215 calopteryxvirgo blauflügelprachtlibelle',
};

export const photo2: Photo = {
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (2)',
  link: 'https://www.flickr.com/photos/12639178@N07/50178927498/',
  media: { m: 'https://live.staticflickr.com/65535/50178927498_44162cb1a0_m.jpg' },
  date_taken: '2020-06-21T15:16:17-08:00',
  description:
    ' <p><a href="https://www.flickr.com/people/12639178@N07/">naturgucker.de</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/12639178@N07/50178927498/" title="Blauflügel-Prachtlibelle (Calopteryx virgo) (2)"><img src="https://live.staticflickr.com/65535/50178927498_44162cb1a0_m.jpg" width="239" height="240" alt="Blauflügel-Prachtlibelle (Calopteryx virgo) (2)" /></a></p> <p>Blauflügel-Prachtlibelle (Calopteryx virgo)<br /> (c) Kühne Friederike</p>',
  published: '2020-08-02T09:11:42Z',
  author: 'nobody@flickr.com ("naturgucker.de")',
  author_id: '12639178@N07',
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
