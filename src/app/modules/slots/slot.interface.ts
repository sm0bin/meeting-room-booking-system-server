import { Types } from "mongoose";

export interface ISlotPayload {
  room: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface ISlot {
  room: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

// export interface IAvailableSlotPayload {
//   date: Date;
//   roomID: Types.ObjectId;
// }
