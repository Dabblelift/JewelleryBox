import { Injectable } from '@angular/core';
import { sample_jewels } from 'src/data';
import { Jewel } from '../shared/models/jewel';

@Injectable({
  providedIn: 'root'
})
export class JewelsService {

  constructor() { }
  GetAll():Jewel[]{
    return sample_jewels;
  }
}
