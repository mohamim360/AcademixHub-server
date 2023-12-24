export const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const weekInMillisecond = 7 * 24 * 60 * 60 * 1000;

  const duration = Math.ceil(
    (end.getTime() - start.getTime()) / weekInMillisecond,
  );

  return duration;
};