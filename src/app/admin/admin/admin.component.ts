import { Component, OnInit } from '@angular/core';
import { ServeService } from 'src/app/services/serve.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  arrayTrans: Array<any> = [];
  transport: string = '';
  destination: string = '';
  point: string = '';
  price: string = '';
  time: string = '';
  editIndex: number | string = '';
  editStatus: boolean = false;
  photo: string = '';
  constructor(private service: ServeService) { }

  ngOnInit(): void {
    this.getFlats();
  }
  getFlats(): void {
    this.service.get().subscribe(
      data => {
        this.arrayTrans = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  addFlat(): void {
    const trans = {
      transport: this.transport,
      destination: this.destination,
      point: this.point,
      price: this.price,
      time: this.time,
      photo:this.photo
    }
    this.service.add(trans).subscribe(
      () => {
        this.getFlats();
      },
      error => {
        console.log(error);
      }
    )
    this.resetForm();
  }

  resetForm(): void {
    this.transport = '';
    this.destination = '';
    this.point = '';
    this.price = '';
    this.photo = '';
    this.time = '';
  }

  delete(index: number | string): void {
    this.service.delete(index).subscribe(
      () => {
        this.getFlats();
      },
      error => {
        console.log(error);
      }
    )
  }


  edit(trans: any): void {
    this.transport = trans.transport;
    this.destination = trans.destination;
    this.point = trans.point;
    this.price = trans.price;
    this.photo = trans.photo;
    this.time = trans.time;
    this.editIndex = trans.id;
    this.editStatus = true;
  }

  save(): void {
    const Trans = {
      transport: this.transport,
      destination: this.destination,
      point: this.point,
      price: this.price,
      photo: this.photo,
      id: this.editIndex,
    }
    this.service.edit(Trans).subscribe(
      () => {
        this.getFlats();
      },
      error => {
        console.log(error);

      }

    )
    this.resetForm();
    this.editStatus = false;
  }
}
