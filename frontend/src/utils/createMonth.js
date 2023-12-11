import createDate from './createDate';
import getMonthNumberOfDays from './getMonthNumberOfDays';

const createMonth = (date = new Date()) => {
	const d = createDate(date);
	const { month: monthName, year, monthNumber, monthIndex } = d;
	const getDay = dayNumber => createDate(new Date(year, monthIndex, dayNumber));
	const createMonthDays = () => {
		const days = Array(getMonthNumberOfDays(monthIndex, year))
			.fill()
			.map((_, i) => getDay(i + 1));
		return days;
	};
	return {
		getDay,
		monthName,
		monthIndex,
		monthNumber,
		year,
		createMonthDays,
	};
};

export default createMonth;
