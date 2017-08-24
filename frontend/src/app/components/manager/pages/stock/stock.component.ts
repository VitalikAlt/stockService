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

  public currentStock: any = {};
  public editingReserveId: string = '';
  public editingReserve: any;

  public sort = ['name', false];
  public search = {
    name: '',
    size: '',
    growth: '',
    count: '',
    reserves: ''
  };

  public reserveSort = ['date', false];
  public reserveSearch = {
    date: '',
    author_name: '',
    count: '',
    payment: '',
    unloading_date: '',
    client: '',
    payment_id: '',
    maker: '',
    make_date: ''
  };

  public stock = [];

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
    this.currentStock.reserves = this.currentStock.reserves || [];

    const reserves =  this.currentStock.reserves.filter((el) => {
      return String(el.date).indexOf(this.reserveSearch.date) !== -1 &&
        String(el.author_name).indexOf(this.reserveSearch.author_name) !== -1 &&
        String(el.count).indexOf(this.reserveSearch.count) !== -1 &&
        String(el.payment).indexOf(this.reserveSearch.payment) !== -1 &&
        String(el.unloading_date).indexOf(this.reserveSearch.unloading_date) !== -1 &&
        String(el.client).indexOf(this.reserveSearch.client) !== -1 &&
        String(el.payment_id).indexOf(this.reserveSearch.payment_id) !== -1 &&
        String(el.maker).indexOf(this.reserveSearch.maker) !== -1 &&
        String(el.make_date).indexOf(this.reserveSearch.make_date) !== -1
    });


    return reserves.sort((a, b) => {
      if (a[`${this.reserveSort[0]}`] > b[`${this.reserveSort[0]}`]) {
        return (this.reserveSort[1])? -1 : 1;
      } else {
        return (this.reserveSort[1])? 1 : -1;
      }
    })
  }

  changeSort(type) {
    this.sort[1] = (this.sort[0] === type)?
      !this.sort[1] : false;

    this.sort[0] = type;
  }

  changeReserveSort(type) {
    console.log(this.reserveSort)

    this.reserveSort[1] = (this.reserveSort[0] === type)?
      !this.reserveSort[1] : false;

    this.reserveSort[0] = type;
  }

  saveReserves() {
    this.httpService.updateReserves(this.userService.user, {
      added: this.currentStock.added_reserves,
      updated: this.currentStock.updated_reserves,
      deleted: this.currentStock.deleted_reserves
    }).subscribe((next) => {

      this.httpService.getStock()
        .subscribe((res) => {
          this.stock = res;

          this.httpService.getReserves(this.userService.user, this.currentStock._id)
            .subscribe((res) => {
              this.editingReserve = null;
              this.currentStock.reserves = res;
            }, (err) => {
              console.log(err);
            });

        }, (err) => {
          console.log(err)
        })

    }, (err) => {
      console.log(err);
    })
  }

  addReserve() {
    if (this.editingReserve && (!this.editingReserve.count || !this.editingReserve.client))
      return console.log('неееееет');

    const id = this.editingReserveId = ((new Date()).getTime() + Math.random()*10000).toString();

    const new_reserve = {
      author_name: this.userService.user.name,
      author_login: this.userService.user.login,
      date: new Date(),
      payment: false,
      _id: id,
      stock_id: this.currentStock._id
    };

    this.editingReserve = new_reserve;
    this.currentStock.added_reserves = this.currentStock.added_reserves || [];
    this.currentStock.added_reserves.push(new_reserve);
    this.currentStock.reserves.push(new_reserve);
  }

  updateReserve(item) {
    if (this.editingReserve && (!this.editingReserve.count || !this.editingReserve.client))
      return console.log('неееееет');

    this.editingReserve = item;
    this.editingReserveId = item._id;

    if (this.currentStock.reserves.indexOf(item) !== -1)
      return;

    this.currentStock.updated_reserves = this.currentStock.updated_reserves || [];
    this.currentStock.updated_reserves.push(item._id);
  }

  deleteReserve(item) {
    if (this.currentStock.added_reserves && this.currentStock.added_reserves.indexOf(item) !== -1) {
      this.currentStock.added_reserves.splice(this.currentStock.reserves.indexOf(item), 1);
    } else {
      this.currentStock.deleted_reserves = this.currentStock.deleted_reserves || [];
      this.currentStock.deleted_reserves.push(item);
    }

    this.currentStock.reserves.splice(this.currentStock.reserves.indexOf(item), 1);
    this.editingReserveId = '';
    this.editingReserve = null;
  }
}
