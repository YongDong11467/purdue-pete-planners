import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { HttpModule }    from '@angular/http';

@Injectable()
export class ImageService {
    server_url: string = "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload";
    //server_url: string = "https://www.file.io/";
    constructor(private httpClient: HttpClient) {}
    public uploadImage(image: File): Observable<Response> {
      const formData = new FormData();
  
      formData.append('image', image);
  
      return this.httpClient.post<any>(this.server_url, formData);
    }
  }