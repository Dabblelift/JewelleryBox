import { Component } from '@angular/core';
import { JewelsService } from 'src/app/services/jewels.service';
import { Jewel } from 'src/app/shared/models/jewel';

@Component({
  selector: 'app-jewels',
  templateUrl: './jewels.component.html',
  styleUrls: ['./jewels.component.css']
})
export class JewelsComponent {

  jewels: Jewel[] = [];

  constructor(private jewelsService: JewelsService) {
    this.jewels = jewelsService.GetAll();
  }
}
