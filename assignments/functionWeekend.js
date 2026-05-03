export default function isWeekend(day) {
  return day === 'Saturday' || day === 'Sunday'
    ? day
    : 'not a weekend';
}