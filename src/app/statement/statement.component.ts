import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  account$ = this.homeService.account$.pipe(
    tap((account) => console.log('statement: '+JSON.stringify(account))),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );


  errorMessageSubject: any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

}
