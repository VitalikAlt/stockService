import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {HttpService} from '../../../../services/http.service';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-manager-stock',
  templateUrl: 'stock.component.html',
  styleUrls: ['stock.component.css']
})
export class ManagerStockComponent implements OnInit {

  public reservesModal = new EventEmitter<string|MaterializeAction>();

  public sort = ['name', false];
  public currentStock: any = {};

  public search = {
    name: '',
    size: '',
    growth: '',
    count: '',
    reserves: ''
  };

  public stock = [
    {
      name: '1',
      size: '1',
      growth: '1',
      count: 1,
      reserves: 201
    },{
      name: '2',
      size: '2',
      growth: '2',
      count: 2,
      reserves: 301
    },{
      name: '3',
      size: '3',
      growth: '3',
      count: 3,
      reserves: 40
    }
  ];

  constructor(private httpService: HttpService, private userService: UserService) { }

  ngOnInit() {
    this.httpService.getStock()
      .subscribe((res) => {
        this.stock = res;
      }, (err) => {
        console.log(err)
      })
  }

  openReservesModal() {
    this.httpService.getReserves(this.userService.user, this.currentStock._id)
      .subscribe((res) => {
        this.currentStock.reserves = res;
        this.reservesModal.emit({action:"modal", params:['open']});
      }, (err) => {
        console.log(err);
      });
  }

  closeReservesModal() {
    this.reservesModal.emit({action:"modal", params:['close']});
  }

  stockByFilters() {
    const stock =  this.stock.filter((el) => {
      return String(el.name).indexOf(this.search.name) !== -1 &&
        String(el.size).indexOf(this.search.size) !== -1 &&
        String(el.growth).indexOf(this.search.growth) !== -1 &&
        String(el.count).indexOf(this.search.count) !== -1 &&
        String(el.reserves).indexOf(this.search.reserves) !== -1
    });


    return stock.sort((a, b) => {
      if (a[`${this.sort[0]}`] > b[`${this.sort[0]}`]) {
        return (this.sort[1])? -1 : 1;
      } else {
        return (this.sort[1])? 1 : -1;
      }
    })
  }

  reservesByFilter() {
    return this.currentStock.reserves;
  }

  changeSort(type) {
    this.sort[1] = (this.sort[0] === type)?
      !this.sort[1] : false;

    this.sort[0] = type;
  }

  addReserve() {
    this.currentStock.reserves.push({
      author_name: this.userService.user.name,
      author_login: this.userService.user.login,
      date: new Date()
    })
  }
}
