import { Photo } from '../models/photo';

export interface PhotosStateSlice {
  searchTerm: string;
  photos: Photo[];
  currentPhoto: Photo | null;
}
