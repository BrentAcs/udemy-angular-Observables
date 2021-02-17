import { Component, OnDestroy, OnInit } from "@angular/core";

import { interval, Subscription, Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private obserableSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // just a simple custom observable
    // this.obserableSubscription = interval(1000).subscribe((count) => {
    //   console.log("count: " + count);
    // });

    // just more complex custom observable
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if( count === 2){
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count is greater than 3!"));
        }
        count++;
      }, 1000);
    });

    this.obserableSubscription = customIntervalObservable.subscribe(
      (data) => {
        console.log("data: " + data);
      },
      (error) => {
        console.log("error: " + error);
        alert(error.message);
      },
      // complete function, does NOT get called if error is called.
      () => {
        console.log("Completed!");
      }
    );
  }

  ngOnDestroy() {
    this.obserableSubscription.unsubscribe();
  }
}
