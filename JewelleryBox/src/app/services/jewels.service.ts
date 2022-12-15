import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_jewels } from 'src/data';
import { JEWELS_URL, JEWEL_BY_ID_URL } from '../shared/constants/urls';
import { Jewel } from '../shared/models/Jewel';

@Injectable({
  providedIn: 'root'
})
export class JewelsService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Jewel[]>{
    return this.http.get<Jewel[]>(JEWELS_URL);
  }

  getJewelById(jewelId:string):Observable<Jewel>{
    return this.http.get<Jewel>(JEWEL_BY_ID_URL + jewelId);
  }
}
