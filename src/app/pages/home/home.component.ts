import { Component, OnInit } from '@angular/core';
import { ServeService } from 'src/app/services/serve.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  arrayTrans: Array<any> = [];
  constructor(private service: ServeService) { }

  ngOnInit(): void {
    this.getFlats();
  }
  getFlats(): void {
    this.service.get().subscribe(
      data => {
        for (let i = 0; i <= data.length; i++){
          if(data[i].transport == 'pot'){
            this.arrayTrans.push(data[i]);
          }
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}