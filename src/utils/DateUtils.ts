export const hourInSeconds = (hour: number) => {
  return 60 * 60 * hour;
}

export const oneDayInMilliseconds = () => {
  return hourInSeconds(24) * 1000;
}
