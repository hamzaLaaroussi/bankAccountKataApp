import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiServiceUrl = environment.apiBaseUrl;

  private clientIdSubject = new BehaviorSubject<number>(0);
  clientIdSubjectAction$ = this.clientIdSubject.asObservable();

  account$ = this.clientIdSubjectAction$.pipe(
    filter(clientId => Boolean(clientId)),
    mergeMap(clientId => this.http.get<Account>(this.apiServiceUrl+clientId)),
    tap(account => console.log(JSON.stringify(account)))
  );

  constructor(private http: HttpClient) { }

  public createNewAccount(account:Account): Observable<Account> {
    return this.http.post<Account>(this.apiServiceUrl+"create", account);
  }

  onNewClientId(clientId: number): void {
    this.clientIdSubject.next(clientId);
  }
}
