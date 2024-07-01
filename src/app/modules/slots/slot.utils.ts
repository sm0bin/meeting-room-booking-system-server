import { ISlot, ISlotPayload } from "./slot.interface";

export function generateSlots(slotsPayload: ISlotPayload) {
  const { room, date, startTime, endTime, slotDuration } = slotsPayload;

  // Convert time string "HH:MM" to minutes since midnight
  function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Convert minutes since midnight to time string "HH:MM"
  function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  }

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;

  const numberOfSlots = totalDuration / slotDuration;
  const slots: ISlot[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStart = startMinutes + i * slotDuration;
    const slotEnd = slotStart + slotDuration;
    slots.push({
      room,
      date,
      startTime: minutesToTime(slotStart),
      endTime: minutesToTime(slotEnd),
      isBooked: false,
    });
  }

  return slots;
}
