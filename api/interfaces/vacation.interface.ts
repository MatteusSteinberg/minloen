import { Types } from "mongoose";

export interface IVacation {
  id?: any;
  employee: Types.ObjectId;
  type: string;
  dateFrom: Date;
  dateTo: Date;
  updatedAt?: Date;
  createdAt?: Date;
}
