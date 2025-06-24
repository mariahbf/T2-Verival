export function timeStringToSeconds(timeString: string | null): number {
  if (!timeString) return 0;
  const [minutes, seconds] = timeString.split(':').map(Number);
  return (minutes * 60) + seconds;
}

export function getFormattedDateTime(): string {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${day}/${month} - ${hours}h${minutes}`;
}
