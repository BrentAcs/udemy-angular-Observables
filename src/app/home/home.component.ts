import { Component, OnDestroy, OnInit } from "@angular/core";

import { interval, Subscription, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

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
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count is greater than 3!"));
        }
        count++;
      }, 1000);
    });

    // example of pipe operator. note, data is not change for the caller.
    // we can transform it and send the result on.
    // customIntervalObservable.pipe(
    //   map((data) => {
    //     return "Round: " + data + 1;
    //   })
    // );

    this.obserableSubscription = customIntervalObservable
      .pipe(
        filter((data) => {
          // return whether or not map or subscribe get called.
          return data > 0;
        }),
        map((data) => {
          return "Round: " + (+data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
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
