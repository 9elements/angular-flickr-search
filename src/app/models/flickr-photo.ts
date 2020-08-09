// Raw photo data from the Flickr API (relevant parts)
export interface FlickrPhoto {
  id: string;
  title: string;
  tags: string;
  owner: string;
  ownername: string;
  datetaken: string;
  url_q: string;
  url_m: string;
}

// Flickr API Response (relevant parts)
export interface FlickrAPIResponse {
  photos: {
    photo: FlickrPhoto[];
  };
}
