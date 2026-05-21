/**
 * Date formatting helpers for SQLite date/time columns.
 * The database stores timezone-naive timestamps, so we emit local
 * date/time strings instead of ISO-8601 UTC strings.
 */

function pad(value) {
  return String(value).padStart(2, '0');
}

function toDate(value) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

function formatDbDateTime(value) {
  const date = toDate(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${value}`);
  }

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-') + ' ' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join(':');
}

function formatDbDate(value) {
  const date = toDate(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${value}`);
  }

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-');
}

function parseDbDateTime(value) {
  if (value instanceof Date) return value;
  if (!value || typeof value !== 'string') return new Date(value);
  
  // Parse "YYYY-MM-DD HH:MM:SS" as local time, not UTC
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
  if (match) {
    const [, year, month, day, hours, minutes, seconds] = match;
    return new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    );
  }
  
  return new Date(value);
}

module.exports = { formatDbDateTime, formatDbDate, parseDbDateTime };
