import { Account } from '../model/account';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationType } from '../model/operationType';
import { HomeService } from './home.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  depositOperation: OperationType;
  withdrawalOperation: OperationType;
  newAccountForm!: FormGroup;
  showModel=true;
  account!:Account;

  account$ = this.homeService.account$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
  errorMessageSubject: any;


  constructor(private formBuilder: FormBuilder,
    private homeService: HomeService) {
    this.depositOperation = OperationType.DEPOSIT;
    this.withdrawalOperation = OperationType.WITHDRAWAL;
  }

  ngOnInit():void {

    this.newAccountForm = this.formBuilder.group({
      balance: [''],
      client: this.formBuilder.group({
        id: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        phone: ['', [Validators.required]],
      })
    })



  }

  onAddAccountSubmit() {
    document.getElementById('close-model')?.click();
    const account = this.newAccountForm.value as Account;
    this.homeService.createNewAccount(account).subscribe(
      (response: Account) => {
        console.log(response);
        this.account = response;
        this.homeService.onNewClientId(response.client.id);
        this.newAccountForm.reset();
        this.showModel = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.newAccountForm.reset();
      }
    );
  }

}
