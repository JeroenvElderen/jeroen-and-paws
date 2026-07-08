import type { CalendarBooking } from "./bookings";

const escapeIcsText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

const toIcsDate = (value: string) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

export function buildBookingIcs(bookings: CalendarBooking[], calendarName = "Jeroen & Paws bookings") {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jeroen and Paws//Bookings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
  ];

  for (const booking of bookings) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${escapeIcsText(booking.outlookEventId || booking.id)}@jeroenandpaws.com`,
      `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
      `DTSTART:${toIcsDate(booking.startsAt)}`,
      `DTEND:${toIcsDate(booking.endsAt)}`,
      `SUMMARY:${escapeIcsText(booking.dogName)}`,
      `LOCATION:${escapeIcsText(booking.location)}`,
      `DESCRIPTION:${escapeIcsText([`Status: ${booking.status}`, booking.notes || ""].filter(Boolean).join("\n"))}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");

  return `${lines.join("\r\n")}\r\n`;
}