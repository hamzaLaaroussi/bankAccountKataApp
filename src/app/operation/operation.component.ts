import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { Operation } from '../model/operation';
import { OperationType } from '../model/operationType';
import { OperationService } from './operation.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit, OnDestroy {

  operationForm!: FormGroup;
  operationType!: OperationType;
  private clientId!: number;
  private sub: any;

  constructor(private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private router: Router,
     private operationService: OperationService,
     private homeService: HomeService) { }


  ngOnInit(): void {

  this.sub = this.route.params.subscribe(params => {
     let type : keyof typeof OperationType = params['type'];
     this.operationType =  OperationType[type];
     this.clientId = params['clientId'];
  })

    this.operationForm = this.formBuilder.group({
      clientId: [this.clientId, [Validators.required]],
      amount: ['', [Validators.required]],

    })
  }

  onSubmit() {

    const clientId = this.operationForm.value.clientId;
    const amount = this.operationForm.value.amount;

    let submittedOperation;

    switch (this.operationType) {
      case OperationType.DEPOSIT:
        submittedOperation = this.operationService.addDepositOperation(clientId, amount);
        break;
      case OperationType.WITHDRAWAL:
        submittedOperation = this.operationService.addWithdrawalOperation(clientId, amount);
        break;
    }

    this.sub = submittedOperation.subscribe(
      (response: Operation) => {
        console.log(response);
        this.homeService.onNewClientId(clientId);
        this.router.navigate(['/home']);
      }
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
