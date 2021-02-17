import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private obserableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.obserableSubscription = interval(1000).subscribe((count) => {
      console.log("count: " + count);
    });
  }

  ngOnDestroy(){
    this.obserableSubscription.unsubscribe();
  }

}
