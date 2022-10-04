import { Client } from "./client";
import { Operation } from "./operation";

export interface Account{

   accountNum:number;
   creationDate:Date;
   client:Client;
   balance: number;
   operations: Operation[];

}
