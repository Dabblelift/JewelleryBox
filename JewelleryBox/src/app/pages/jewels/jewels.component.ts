import { Component } from '@angular/core';
import { JewelsService } from 'src/app/services/jewels.service';
import { Jewel } from 'src/app/shared/models/Jewel';

@Component({
  selector: 'app-jewels',
  templateUrl: './jewels.component.html',
  styleUrls: ['./jewels.component.css']
})
export class JewelsComponent {

  jewels: Jewel[] = [];

  constructor(private jewelsService: JewelsService) {
    this.jewelsService.GetAll().subscribe((res) => {
      this.jewels = res;
    });
  }
}
