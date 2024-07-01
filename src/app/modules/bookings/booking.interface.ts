import { Types } from "mongoose";

export interface IBooking {
  date: Date;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  user: Types.ObjectId;
  totalAmount: number;
  isConfirmed: "confirmed" | "unconfirmed" | "canceled";
  isDeleted: boolean;
}

export interface ICreateBooking {
  date: Date;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  user: Types.ObjectId;
}

export interface IUpdateBooking {
  isConfirmed: "confirmed" | "unconfirmed" | "canceled";
}
