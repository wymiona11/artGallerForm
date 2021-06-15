import { ImageInterface } from './image.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  add(formVal: ImageInterface): Observable<ImageInterface>{
    return this.http.post<ImageInterface>('https://artgallery-9bfaf-default-rtdb.europe-west1.firebasedatabase.app/images.json',
    {
      title: formVal.title,
      category: formVal.category,
      author: formVal.author,
      dimensions: formVal.dimensions,
      mainColor: formVal.mainColor,
      tehniques: formVal.techniques,
      supportOrSurface: formVal.supportOrSurface,
      year: formVal.year,
      imgUrl: formVal.imgUrl,
      rating: formVal.rating
    }
    )
  }
}
