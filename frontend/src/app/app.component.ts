import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {NgSpinningPreloader} from 'ng2-spinning-preloader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private token = '';

  constructor(private ngSpinningPreloader: NgSpinningPreloader) {}

  ngOnInit() {
    this.token = Cookie.get('token');
    this.ngSpinningPreloader.stop();
  }
}
