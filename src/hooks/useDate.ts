export const useDate = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const currentWeekday = new Date().getDay();

  // 특정 달에 몇주까지 있는지 (ex. 2025년 3월 -> 6)
  const weeksCount = (year: number, month: number) => {
    const firstOfMonth = new Date(year, month - 1, 1);
    let day = firstOfMonth.getDay() || 6;
    day = day === 1 ? 0 : day;
    if (day) {
      day--;
    }
    let diff = 7 - day;
    const lastOfMonth = new Date(year, month, 0);
    const lastDate = lastOfMonth.getDate();
    if (lastOfMonth.getDay() === 1) {
      diff--;
    }
    const result = Math.ceil((lastDate - diff) / 7);
    return result + 1;
  };

  // 특정 날짜가 해당 달에 몇번째 주인지 (ex. 2025년 4월 17일 -> 4)
  const weekOfMonth = (year: number, month: number, day: number) => {
    let firstWeekday = new Date(year, month - 1, 1).getDay() - 1;
    if (firstWeekday < 0) firstWeekday = 6;
    const offsetDate = day + firstWeekday - 1;
    return Math.floor(offsetDate / 7) + 1;
  };

  // 특정 달이 몇 일까지 있는지 (ex. 2024년 2월 -> 29)
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getMonthWeek = (year: number, month: number, week: number) => {
    // Set date to 4th of month
    const d = new Date(year, month - 1, 4);
    // Get day number, set Sunday to 7
    const day = d.getDay() || 7;
    // Set to prior Monday
    d.setDate(d.getDate() - day + 1);
    // Set to required week
    d.setDate(d.getDate() + 7 * (week - 1));
    return d;
  };
  const getWeekDates = (year: number, month: number, week: number) => {
    const d = getMonthWeek(year, month, week);
    const arr = [];
    for (let i = 0; i < 7; i++) {
      const date = d.toLocaleDateString().split('/');
      arr.push(`${date[2]}-${date[0]}-${date[1]}`);
      d.setDate(d.getDate() + 1);
    }
    return arr;
  };

  return {
    currentYear,
    currentMonth,
    currentDay,
    currentWeekday,
    weeksCount,
    weekOfMonth,
    daysOfMonth,
    getWeekDates,
  };
};
