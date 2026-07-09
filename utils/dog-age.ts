const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function isValidDateParts(value: string) {
  if (!isoDatePattern.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function plural(value: number, unit: string) {
  return `${value} ${unit}${value === 1 ? "" : "s"}`;
}

export function formatDogAge(value: string | null | undefined, now = new Date()) {
  const trimmed = value?.trim();
  if (!trimmed) return "Age unknown";
  if (!isValidDateParts(trimmed)) return trimmed;

  const [birthYear, birthMonth, birthDay] = trimmed.split("-").map(Number);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

  if (birthDate > today) return "Age unknown";

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return [plural(years, "year"), plural(months, "month"), plural(days, "day")].join(", ");
}