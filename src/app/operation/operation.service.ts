import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Operation } from '../model/operation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addDepositOperation(clientId: number, amount:number): Observable<Operation> {
    const params = this.getOperationHttpParams(clientId, amount);

    return this.http.patch<Operation>(this.apiServiceUrl+"deposit", params);
  }

  public addWithdrawalOperation(clientId: number, amount:number): Observable<Operation> {
    const params = this.getOperationHttpParams(clientId, amount);
    return this.http.patch<Operation>(this.apiServiceUrl+"withdraw", params);
  }


  private getOperationHttpParams(clientId: number, amount: number) : HttpParams {
     let httpParams = new HttpParams();

     httpParams = httpParams.set('clientId', clientId);
     httpParams = httpParams.set('amount', amount)


    return httpParams;
  }

}

