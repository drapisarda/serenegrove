export function formattedTime(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
  timeInSeconds %= 3600;
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  timeInSeconds %= 60;
  const seconds = timeInSeconds.toString().padStart(2, '0');
  return hours !== '00' ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}