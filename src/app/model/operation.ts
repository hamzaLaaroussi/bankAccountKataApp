import { OperationType } from "./operationType";

export interface Operation {
  amount: number;
  type: OperationType;
  operationDate: Date;
  balance: number;
}
