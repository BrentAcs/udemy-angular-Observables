import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private obserableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.obserableSubscription = interval(1000).subscribe((count) => {
    //   console.log("count: " + count);
    // });

    const customIntervalObservable = Observable
      .create( observer => {
        let count = 0;
        setInterval( () => {
          observer.next(count);
          count++;
        }, 1000);
      });

    this.obserableSubscription = customIntervalObservable.subscribe( data => {
       console.log("data: " + data);
     })

  }

  ngOnDestroy(){
    this.obserableSubscription.unsubscribe();
  }

}
